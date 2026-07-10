import { postByIdController, postsController, createPostController } from "../controller/blog.controller.js";
import express from "express";
import { blogValidator } from "../middleware/blog.middleware.js";
const router = express.Router();

router.get('/getPosts', postsController);
router.post('/createPost', blogValidator, createPostController);
router.get('/posts/:id', postByIdController);


export default router;