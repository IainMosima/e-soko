import { itemStructure } from "../controllers/package";
import mongoose from "mongoose";
import createHttpError from "http-errors";



export function itemUpdateManager(newItems:itemStructure, itemnsFromDb: itemStructure) {
    const updatedItems = [...itemnsFromDb];
    const updatedItemsId = itemnsFromDb.map((item=>item.productId));

    for (const item of newItems) {
        // updating a prior existing item
        if (item.productId && updatedItemsId.includes(item.productId)) {
            // removing the item from items from db list
            updatedItemsId

        } else {
            throw createHttpError(400, "Product does not exist in package");
        }

    }
    
}