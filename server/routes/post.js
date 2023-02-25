import express from "express";
import formidable from "express-formidable";
//Controllers
import { 
    createPost, 
    uploadImage, 
    postByUser,
    userPost,
    updatePost,
    deletePost 
} from "../controllers/post";
// middleware
import { requireSignIn, canEditDeletePost } from "../middlewares";

const router = express.Router();




router.post("/create-post", requireSignIn, createPost);
router.post("/upload-image", 
    requireSignIn, 
    formidable({maxFileSize: 5*1024*1024}), 
    uploadImage
);
// posts
router.get("/user-posts", requireSignIn, postByUser);
router.get("/user-post/:_id", requireSignIn, userPost);
router.put("/update-post/:_id", requireSignIn, canEditDeletePost, updatePost);
router.delete("/delete-post/:_id", requireSignIn, canEditDeletePost, deletePost);

module.exports = router;