import express from "express";
import * as ProductsController from "../controllers/products";
import multer from "multer";


const router = express.Router();
const upload = multer({ dest: "uploads/" })

// fetching all products
router.get('/', ProductsController.getProducts);

// fetching specified category
router.get('/category', ProductsController.getCategory);

// creating a new product
router.post('/', upload.single('productImg'), ProductsController.createProduct);

// fetching an image
router.get('/image/:key', ProductsController.getImage);

// updating a product
router.patch('/:productId', upload.single('productImg'), ProductsController.updateProduct);

// filtering a product
router.get('/query/:query', ProductsController.filterProducts);

// deleting a product
router.delete('/:productId', ProductsController.deleteProduct);

// fetching all categories
router.get('/categories/:id', ProductsController.getCategories);

// updating categories
router.patch('/categories/:categoryId', ProductsController.updateCategories);

// deleting a category
router.delete('/categories/:categoryId', ProductsController.deleteCategory);

export default router;