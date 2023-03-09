import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {readdirSync} from "fs";


const morgan = require('morgan');
require('dotenv').config();

const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http, {
    cors: {
        origin: process.env.CLIENT_URL,
        methods: ["GET", "POST"],
        allowedHeaders : ["Content-type"]
    }
});

//DataBase
mongoose.connect(process.env.DATABASE, {
    useNewUrlParser: true
})
.then(() => console.log("DB connected"))
.catch((err) => console.log("DB connection error: ", err));

//Middleware
app.use(express.json({limit:"5mb"}))
app.use(express.urlencoded({extended:true}));
app.use(
    cors({
        origin:[process.env.CLIENT_URL]
    })
);

// autoload routes
readdirSync("./routes").map((r)=> app.use("/api", require(`./routes/${r}`)));

// socketio
io.on("connect", (socket) => {
    //console.log("Socket.io: ", socket.id);
    socket.on("send-message", (message) => {
        //console.log("New message received => ", message);
        socket.emit("receive-message", message);
    });
});

const port = process.env.PORT || 8000;

http.listen(port, () => console.log(`Server running in port ${port}`));