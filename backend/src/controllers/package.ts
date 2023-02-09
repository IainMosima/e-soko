import { RequestHandler } from "express";
import PackageModel from "../models/package";
import createHttpError from "http-errors";
import mongoose, { Schema } from "mongoose"; 
import { assertIsDefined } from "../utils/asserIsDefined";

// getting packages only if a session in progress
export const getPackages: RequestHandler = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;

    try {
        assertIsDefined(authenticatedUserId);
        
        const packages = await PackageModel.find({ userId: authenticatedUserId }).exec();

        res.status(200).json(packages);

    } catch (err) {
        next(err);
    }
}

// creating a new package
interface PackageBody {
    packageName: string,
    items: [{
        //nb _id act as the product's id
        _id: Schema.Types.ObjectId,
        quantity: number
    }]
}

export const createPackage: RequestHandler<unknown, unknown, PackageBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const packageName = req.body.packageName;
    const items = req.body.items;


    try {
        assertIsDefined(authenticatedUserId);

        if(!packageName) {
            throw createHttpError(400, "Package must have a name");
        }

        const newPackage = await PackageModel.create({
            userId: authenticatedUserId,
            packageName: packageName,
            items: items
        });

        res.status(201).json(newPackage);

    } catch (err) {
        next(err);
    }
}



// updating a package
interface UpdatePackageParams {
    packageId: string,
}

interface UpdatePackageBody {
    packageName: string,
    items: [
        {
            _id: Schema.Types.ObjectId,
            quantity: number
        }
    ]


}

export const updatePackage: RequestHandler<UpdatePackageParams, unknown, UpdatePackageBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const packageId = req.params.packageId;
    const packageName = req.body.packageName;
    const items = req.body.items;

    // console.log(items);

    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(packageId)) {
            throw createHttpError(400, "Invalid note id");
        }

        if (!packageName) {
            throw createHttpError(404, "Product must have a name");
        }

        const packageUpdate = await PackageModel.findById(packageId).exec();
        
        if (packageUpdate) {
            if(!packageUpdate.userId.equals(authenticatedUserId)) {
                throw createHttpError(404, "You cannot access this package");
            }

            packageUpdate.packageName = packageName;
            
            // item management
            const updatedItems = packageUpdate.items.filter(item => item._id !== items._id);
            
            
            


        }


    } catch (err) {
        next(err);
    }

}