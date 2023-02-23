import express from "express";
//Controllers
import { createPost } from "../controllers/post";
// middleware
import { requireSignIn } from "../middlewares";

const router = express.Router();




router.post("/create-post", requireSignIn, createPost);

module.exports = router;