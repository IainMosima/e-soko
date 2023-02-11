import { newitemStructure ,itemStructure } from "../controllers/package";
import createHttpError from "http-errors";

export function itemCreateManager(newItemsProducts: newitemStructure[]){
    const ids = [''];

    for (const item of newItemsProducts) {
        if (ids.includes(item.productId)){
            throw createHttpError(400, "Existence of duplicate items");
        } else {
            ids.push(item.productId);
        }
    }

}


export function itemUpdateManager(newItems:newitemStructure[], itemnsFromDb: itemStructure[]) {
    const updatedItems = [...itemnsFromDb];
    const itemsFromdbProductIds = itemnsFromDb.map(item => item.productId);

    for (const item of newItems) {
        // checking if the item exists
        if (itemsFromdbProductIds.includes(item.productId)) {
            const indexToUpdate = itemsFromdbProductIds.indexOf(item.productId);
            // updating the quantity
            updatedItems[indexToUpdate].quantity = item.quantity;
        } else {
            // appending the new item to the db
            updatedItems.push(item);
        }
    }
    
    return updatedItems;
}