import express from "express";
//things that dynamically change within users 
//are friends
import {
  getUser,
  getUserFriends,
  addRemoveFriend,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

//auth
//if the user is sending a particular id we can call our database with tis id
//query string
router.get("/:id", verifyToken, getUser);
router.get("/:id/friends", verifyToken, getUserFriends);

//patch = update
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;