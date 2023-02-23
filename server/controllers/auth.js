import User from "../models/user";
import { hashPassword, comparePassword } from "../helpers/auth";
import jwt from "jsonwebtoken";

export const register = async (req, res) =>{
    console.log("Register endpoint: ", req.body);
    const {name, email, password, secret} = req.body
    //validation
    if(!name) {
        return res.json({
            error:"Name is required"
        });
    }
    if(!password || password.length <5 ) {
        return res.json({
            error:"Password is required and should be 6 characters long"
        });
    }

    if(!secret) {
        return res.json({
            error:"Answer is required"
        });
    }
    
    const exist = await User.findOne({email});
    if(exist){
       return res.status(400).send("Email is taken"); 
    }

    //hash password
    const hashedPassword = await hashPassword(password);

    const user = new User({name, email, password: hashedPassword, secret});
    try {
        await user.save();
        console.log("Registered user: ", user);
        return res.json({
            ok:true
        });
    } catch(err){
        console.log("Register failed: ", err);
        return res.status(400).send("Error. Try again");
    }

};

export const login = async (req, res) => {
    console.log(req.body);
    try {
        const {email, password} = req.body;
        // verify if user exist in DB
        const user = await User.findOne({email});
        console.log("USER: ", user);
        if(!user) {
            return res.json({
                error:"No user found"
            });
        }
        // check password
        const match = await comparePassword(password, user.password);
        if(!match) {
            return res.json({
                error: "Wrong password"
            });
        }
        // create signed token
        const token = jwt.sign({_id: user._id}, process.env.JWT_SECRET, {expiresIn: "7d"});
        user.password = undefined;
        user.secret = undefined;
        res.json({
            token,
            user
        });
    }catch(err){
        console.log(err);
        return res.status(400).send("Error. Try again");
    }

};

export const currentUser = async (req, res) => {
    console.log("ER: -> ", req.auth);
    try {
        const user = await User.findById(req.auth._id);
        console.log("User: ", user);
        //res.json(user);
        res.json({ok:true});
    }catch(err){
        console.log(err);
        res.sendStatus(400);
    }
};


export const forgotPassword = async(req, res) => {
    //console.log(req.body);
    const {email, newPassword, secret} = req.body;
    if(!newPassword || !newPassword>6){
        return res.json({
            error: "New password is required and should be min 6 characters long"
        });
    }
    if(!secret){
        return res.json({
            error: "Secret is required"
        });
    }

    const user = await User.findOne({email, secret});
    if(!user)
        return res.json({
            error: "We can virify you with those details"
        });

    try {
        const hashedPassword = await hashPassword(newPassword);
        await User.findByIdAndUpdate(user._id, {password:hashedPassword});
        return res.json({
            success : "Congrats. Now you can login with your new password"
        });
    }catch(err){
        console.log(err)
        return res.json({
            error: "Something wrong. Try again."
        });
    }

}