import { RequestHandler } from "express";
import UserModel from "../models/product";
import createHttpError from "http-errors";

// checking if a user is logged in
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;

    try {
        const user = await UserModel.findById(authenticatedUser).select("username email phoneNumber location").exec();
        res.status(200).send(user);
    } catch (error) {
        next (error);
    }
}


// function to sign up a new user
interface SignupBody {
    username?: string,
    email?: string,
    phoneNumber?: string,
    location?: string,
    profile?: File
}

export const signup: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const location = req.body.location;

    
}

