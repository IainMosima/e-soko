import { RequestHandler } from "express";
import OrderModel from "../models/order";
import mongoose from "mongoose";
import { assertIsDefined }  from "../utils/asserIsDefined";
import * as OrderManager from "../utils/orderManager";
import createHttpError from "http-errors";

// getting all orders for a specific user
export const getOrders: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);

        const orders = await OrderModel.find({ userId: authenticatedUserId});

        res.status(200).json(orders);
    } catch (err) {
        next(err);
    }
}


interface OrderBody {
    userId: string,
    packageId: string,
    price: number
}

export const createOrder: RequestHandler<unknown, unknown, OrderBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const packageIds = req.body.packageId;
    const price = req.body.price;               

    try {
        assertIsDefined(authenticatedUserId);
        
        if (!packageIds) {
            throw createHttpError(400, "No package checked out");
        }

        

        

    } catch (error) {
        next(error);
    }
}

