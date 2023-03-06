import express from "express";
import {changepassword, forgotpassword, login, register, sendPasswordLink} from "../controllers/auth.js";

const router = express.Router()

router.post("/login", login);
router.post("/sendpasswordlink", sendPasswordLink)
router.get("/forgotpassword/:id/:token", forgotpassword)
router.post("/:id/:token", changepassword)

export default router;