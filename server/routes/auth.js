import express from "express";
//Controllers
import { 
    register, 
    login, 
    currentUser, 
    forgotPassword, 
    profileUpdate, 
    findPeople,
    addFollower,
    userFollow,
    userFollowing, 
    removeFollower,
    userUnfollow,
    searchUser,
    getUser
} from "../controllers/auth";
// middleware
import { requireSignIn } from "../middlewares";

const router = express.Router();




router.post("/register", register);
router.post("/login", login);
router.get("/current-user", requireSignIn, currentUser);
router.post("/forgot-password", forgotPassword);

router.put("/profile-update", requireSignIn, profileUpdate);
router.get("/find-people", requireSignIn, findPeople); 

router.put("/user-follow", requireSignIn, addFollower, userFollow);
router.put("/user-unfollow", requireSignIn, removeFollower, userUnfollow);
router.get("/user-following", requireSignIn, addFollower, userFollowing);

router.get("/search-user/:query", searchUser);
router.get("user/:username", getUser);

module.exports = router;