import { createUser, loginUser, logoutUser} from "../controller/auth.controller.js";
import express from "express";
const router = express.Router();


router.post('/createUser', createUser);
router.post('/loginUser', loginUser);
router.post('/logoutUser', logoutUser);


export default router;