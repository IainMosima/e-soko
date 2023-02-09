import { RequestHandler } from "express";
import UserModel from "../models/users";
import createHttpError from "http-errors";
import * as AuthSec from "../utils/authSec";
import env from "../utils/validateEnv";
import * as s3APi from "../aws/s3";
import { unlinkFile } from "../utils/unlinkFIle";


const usersBucket = env.AWS_BUCKET_USERS_NAME;


// checking if a user is logged in
export const getAuthenticatedUser: RequestHandler = async (req, res, next) => {
    const authenticatedUser = req.session.userId;

    try {
        const user = await UserModel.findById(authenticatedUser).select("+username +email +phoneNumber +location +profileImgKey").exec();
        res.status(200).send(user);
    } catch (error) {
        next (error);
    }
}

// fetching a user's profile image
export const getProfileImage: RequestHandler = async (req, res, next) => {
    const key = req.params.key;
    try {
        const profileImage = await s3APi.getImage(key, usersBucket);
        res.status(200).send(profileImage);
    } catch (error) {
        next (error);
    }
}

//  signing up a new user
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

        let profileImgKey = '';

        try{
            // uploading user profile picture to s3 user bucket
            if (profileImg) {
                const result = await s3APi.uploadFile(profileImg, usersBucket);
                await unlinkFile(profileImg.path);

                profileImgKey = result.Key;
            }

            // uploading to mongodb
            const newUser = await UserModel.create({
                username: username,
                email: email,
                phoneNumber: phoneNumber,
                location: location,
                password: hasedAndSaltedPassword,
                profileImgKey: profileImgKey
            });

            // creating a session
            req.session.userId = newUser._id;

            res.status(201).json(newUser);

        } catch (error) {
            next(error);
        }


    } catch (error) {
        next(error);
    }
}

// logging out a user
export const logout: RequestHandler = (req, res, next) => {
    req.session.destroy(error => {
        if(error) {
            next(error);
        } else {
            res.sendStatus(200);
        }
    });
}

// logging in a user
interface LoginBody {
    username?: string,
    password?: string
}
export const login: RequestHandler<unknown, unknown, LoginBody, unknown> = async (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    try {
        if (!username || !password) {
            throw createHttpError(400, "Parameters Missing");
        }

        const user = await UserModel.findOne({ username: username }).select("+_id +username +password +email +phoneNumber +location +profileImgKey").exec();

        if(!user) {
            throw createHttpError(401, "Invalid username or password");
        }

        // checking for password match
        const passwordMatch = await AuthSec.comparePassword(password, user.password);
        
        if (!passwordMatch) {
            throw createHttpError(401, "Invalid Credentials");
        }

        req.session.userId = user._id;

        res.status(201).json(user);

    } catch(error) {
        next(error);
    }
}