import { RequestHandler } from "express";
import UserModel from "../models/product";
import createHttpError from "http-errors";
import * as AuthSec from "../utils/authSec";

// checking if a user is logged in
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;

    try {
        const user = await UserModel.findById(authenticatedUser).select("username email phoneNumber location profileImgKey").exec();
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
    password?: string,
    profileImg?: File
}

export const signup: RequestHandler<unknown, unknown, SignupBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const email = req.body.email;
    const phoneNumber = req.body.phoneNumber;
    const location = req.body.location;
    const password = req.body.password;
    const profileImg = req.file;

    try {
        if (!username || !email || !phoneNumber || !location || !password) {
            throw createHttpError(400, "Missing necessary parameters");
        }

        const existingUser = await UserModel.findOne({ username: username }).exec();

        if (existingUser) {
            throw createHttpError(404, "Username already taken. Try a different username one");
        }

        const existingEmail = await UserModel.findOne({ email: email}).exec();

        if (existingEmail) {
            throw createHttpError(404, "Email already taken. Try a different email");
        }

        // enctypting the password before storing it to th db
        const hasedAndSaltedPassword = await AuthSec.hashAndSalt(password);

        // uploading user profile to s3 user bucket
        



    } catch (error) {
        next(error);
    }
}

