import { RequestHandler } from "express";
import ProductModel from "../models/product";
import * as s3Api from "../aws/s3";
import * as fs from 'fs-extra';
import util from "util";
import createHttpError from "http-errors";


const unlinkFile = util.promisify(fs.unlink);

// fetch all products available in the db
export const getProducts: RequestHandler = async (req, res, next) => {
    try {
        const products = await ProductModel.find().exec();
        res.status(200).json(products);
    } catch (error) {
        next(error);
    }
}

interface CreateProduct {
    productName?: string,
    productImg?: File,
    categoryName?: string,
    available?: string
}

// getting image from s3Bucket
export const getImage: RequestHandler = async (req, res, next) => {
    const key = req.params.key;
    const readStream = await s3Api.getFileStream(key);

    readStream.pipe(res);
}

// creating a new product
export const createProduct: RequestHandler<unknown, unknown, CreateProduct, unknown> = async (req, res, next) => {
    const productName = req.body.productName;
    const categoryName = req.body.categoryName;
    const available = req.body.available;

    const productImg = req.file;

    try {
        let imageKey = '';
        if (productImg){
            const result = await s3Api.uploadFile(productImg);
            // deleting an image from the upload dir once uploaded
            await unlinkFile(productImg.path);
            imageKey = result.Key;
        }

        // uploading the other records to mongodb
        const newProduct = await ProductModel.create({
            productName: productName,
            productImgKey: imageKey,
            categoryName: categoryName,
            available: available
        });

        res.status(200).json(newProduct);

    } catch (error) {
        next(error);
    }
    
}

