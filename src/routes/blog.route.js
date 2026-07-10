import { postsController } from "../controller/blog.controller.js";
import express from "express";
import { blogValidator } from "../middleware/blog.middleware.js";
const router = express.Router();

router.get('/posts', blogValidator, postsController);
router.get('/posts/:id', postsController);


export default router;