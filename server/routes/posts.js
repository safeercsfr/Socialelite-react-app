import express from "express";
import { getFeedPosts, getUserPosts, likePost, postComment } from "../controllers/posts.js";
import { verifyToken } from "../middlleware/auth.js";

const router = express.Router();

/* READ */
router.get("/", verifyToken, getFeedPosts);
router.get("/:userId/posts", verifyToken, getUserPosts);

/* UPDATE */
router.patch("/:id/like", verifyToken, likePost);
router.post("/:id/comment", verifyToken, postComment);

export default router;
