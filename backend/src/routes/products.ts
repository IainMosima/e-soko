import express from "express";
import * as ProductsController from "../controllers/products";
// import upload from "../middleware/upload";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: "uploads/" })

router.get('/', ProductsController.getProducts);

router.post('/', upload.single('productImg'), ProductsController.createProduct);




export default router;