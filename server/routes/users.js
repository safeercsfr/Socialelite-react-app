const router = express.Router();
import express from "express";
import {
  getUser,
  getUserFollowers,
  getUsers,
  getUserFriends,
  addRemoveFriend,
  updateUser,
  getSuggestionUsers,
} from "../controllers/users.js";
import { verifyToken } from "../middlleware/auth.js";

/* READ */
router.get("/", verifyToken, getUsers);
router.get("/:id", verifyToken, getUser);
router.get("/:id/followers", verifyToken, getUserFollowers);
router.get("/:id/friends", verifyToken, getUserFriends);
router.get("/:id/suggestions", verifyToken, getSuggestionUsers);

/*UPDATE USER */
router.put("/:id", verifyToken, updateUser);

/* UPDATE */
router.patch("/:id/:friendId", verifyToken, addRemoveFriend);

export default router;
