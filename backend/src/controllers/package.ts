import { RequestHandler } from "express";
import PackageModel from "../models/package";
import createHttpError from "http-errors";
import mongoose from "mongoose"; 
import { assertIsDefined } from "../utils/asserIsDefined";
import * as ItemManager from "../utils/itemUpdateManger";

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

export interface newitemStructure {
    productId: string,
    quantity: number
}

// creating a new package
interface PackageBody {
    packageName: string,
    items: Array<newitemStructure>
}

export const createPackage: RequestHandler<unknown, unknown, PackageBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const packageName = req.body.packageName;
    const items = req.body.items;

    
    try {
        assertIsDefined(authenticatedUserId);

        // making sure there are no duplicates products in item
        ItemManager.itemCreateManager(items);

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
    packageId: string
}

export interface itemStructure {
    productId: string,
    quantity: number
}


interface UpdatePackageBody { 
    packageName: string,
    items: Array<itemStructure>
}


export const updatePackage: RequestHandler<UpdatePackageParams, unknown, UpdatePackageBody, unknown> = async (req, res, next) => {
    const authenticatedUserId = req.session.userId;
    const packageId = req.params.packageId;
    const packageName = req.body.packageName;
    const items = req.body.items;

    // making sure there are no duplicates products in item
    ItemManager.itemCreateManager(items);

    
    try {
        assertIsDefined(authenticatedUserId);

        if (!mongoose.isValidObjectId(packageId)) {
            throw createHttpError(400, "Invalid product id");
        }

        if (!packageName) {
            throw createHttpError(404, "Product must have a name");
        }

        const packageFromDb = await PackageModel.findById(packageId).exec();
        
        if (packageFromDb) {
            if(!packageFromDb.userId.equals(authenticatedUserId)) {
                throw createHttpError(404, "You cannot access this package");
            }

            // item management
            if(packageFromDb.items && items){
                const updatedItems = ItemManager.itemUpdateManager(items, packageFromDb.items);
                
                // updating the items in the db
                packageFromDb.items = updatedItems;
            }

            // updating the package name
            packageFromDb.packageName = packageName;
            
            // saving the updated package
            const updatedPackage = await packageFromDb.save();

            res.status(200).send({ success: true, message: "Package updated successfully", data: updatedPackage });
           
        } else {
            throw createHttpError(404, "Package not found");
        }


    } catch (err) {
        next(err);
    }
}
