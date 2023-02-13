import { RequestHandler } from "express";
import OrderModel from "../models/order";
import mongoose from "mongoose";
import { assertIsDefined }  from "../utils/asserIsDefined";
import createHttpError from "http-errors";
import { mpesaExpress } from "../daraja/mpesa-express";

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


// creating a new order
interface OrderCreateParams {
    packageId: mongoose.Types.ObjectId;
}
interface OrderBody {
    userId: string,
    price: number,
    paymentType: string
}

export const createOrder: RequestHandler<OrderCreateParams, unknown, OrderBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const authenticatedUserPhoneNumber = req.session.phoneNumber;
    const packageId = req.params.packageId;
    const price = req.body.price;
    const paymentType = req.body.paymentType

    try {
        assertIsDefined(authenticatedUserId);
        
        if (!packageId) {
            throw createHttpError(400, "No package checked out!");
        }

        let newOrder;
        const newOrderParams = {
            userId: authenticatedUserId,
            packageId: packageId,
            price: price,
            paid: false,
            delivered: false
            };

        if (paymentType && price && paymentType && authenticatedUserPhoneNumber) {
            switch (paymentType) {
                // will add other payment methods here
                case 'mpesa':
                    // eslint-disable-next-line no-case-declarations
                    const response = await mpesaExpress(price, authenticatedUserPhoneNumber);
                    if (response) {
                        newOrderParams.paid = true;
                        newOrder = await OrderModel.create(newOrderParams);
                        res.status(201).json(newOrder);

                    }
                    
                    break;
            
            }
        } else {
            newOrder = await OrderModel.create(newOrderParams);
            res.status(201).json(newOrder);

        }

        

    } catch (error) {
        next(error);
    }
}

