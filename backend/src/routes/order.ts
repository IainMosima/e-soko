import express from "express";
import * as OrderController from "../controllers/order";

const router = express.Router();

// fetching all orders
router.get('/', OrderController.getOrders);

export default router;