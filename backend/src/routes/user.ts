import express from "express";
import * as UsersController from "../controllers/user";
import multer from "multer";

const router = express.Router();
const upload = multer({ dest: "uploads/" });