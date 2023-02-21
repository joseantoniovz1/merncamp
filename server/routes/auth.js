import express from "express";
//Controllers
import { register } from "../controllers/auth";

const router = express.Router();

router.post("/register", register);

module.exports = router;