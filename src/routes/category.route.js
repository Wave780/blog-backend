import express from "express";
import { createCategory, getAllCategory, getAllCategoryById, updateCategory, deleteCategory} from "../controller/category.controller.js";

const router = express.Router();

router.post('/category', createCategory);
router.get('/category', getAllCategory);
router.get('/category/:id', getAllCategoryById);
router.put('/category/:id', updateCategory);
router.delete('/category/:id', deleteCategory);

export default router; 