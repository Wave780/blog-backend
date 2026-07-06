import { createUser } from "../controller/auth.controller.js";
import express from "express";
const router = express.Router();


router.post('/createUser', createUser);


export default router;