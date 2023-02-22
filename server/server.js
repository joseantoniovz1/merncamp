import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import {readdirSync} from "fs";


const morgan = require('morgan');
require('dotenv').config();

const app = express();

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
        origin:["http://localhost:3000"]
    })
);

// autoload routes
readdirSync("./routes").map((r)=> app.use("/api", require(`./routes/${r}`)));

const port = process.env.PORT || 8000;

app.listen(port, () => console.log(`Server running in port ${port}`));