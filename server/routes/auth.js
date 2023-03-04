import express from "express";
import {changepassword, forgotpassword, login, register, sendpasswordlink} from "../controllers/auth.js";

const router = express.Router()

router.post("/register", register)
router.post("/login", login);
router.post("/sendpasswordlink", sendpasswordlink)
router.get("/forgotpassword/:id/:token", forgotpassword)
router.post("/:id/:token", changepassword)

export default router;