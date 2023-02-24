import express from "express";
import formidable from "express-formidable";
//Controllers
import { createPost, uploadImage } from "../controllers/post";
// middleware
import { requireSignIn } from "../middlewares";

const router = express.Router();




router.post("/create-post", requireSignIn, createPost);
router.post("/upload-image", 
    requireSignIn, 
    formidable({maxFileSize: 5*1024*1024}), 
    uploadImage
);

module.exports = router;