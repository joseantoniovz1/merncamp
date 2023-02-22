import express from "express";
//Controllers
import { register, login, currentUser } from "../controllers/auth";
// middleware
import { requireSignIn } from "../middlewares";

const router = express.Router();




router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);


module.exports = router;