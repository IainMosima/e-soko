import express from "express";
import * as UsersController from "../controllers/user";
import multer from "multer";
import { requireAuth } from "../middleware/requireAuth";

const router = express.Router();
const upload = multer({ dest: "uploads/" });

// getting an authenticated user
router.get('/', requireAuth, UsersController.getAuthenticatedUser);

// creating a new user
router.post('/signup', upload.single('profileImg'), UsersController.signup);


export default router;