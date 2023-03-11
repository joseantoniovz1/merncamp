import Post from "../models/post";
import User from "../models/user";
import {expressjwt} from "express-jwt";

export const requireSignIn = expressjwt({
    secret: "QWERTY",
    algorithms: ['HS256']
});

export const canEditDeletePost = async (req, res, next) => {
    try {
        const post = await Post.findById(req.params._id);
        //console.log("Post in editdelete middleware: ", post);
        if(req.auth._id != post.postedBy){
            return res.status(400).send("Unauthorized");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
};

export const isAdmin = async(req, res, next) => {
    try {
        const user = await User.findById(req.auth._id);
        console.log("Is Admin: ", user);
        if(user.role !== "Admin") {
            return res.status(400).send("Unauthorized");
        } else {
            next();
        }
    } catch (err) {
        console.log(err);
    }
};