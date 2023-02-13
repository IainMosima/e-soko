import createHttpError from "http-errors";

export function orderCreateManager(newPackagesIds: string[]) {
    const ids = [''];

    for (const itemId of newPackagesIds) {
        if (ids.includes(itemId)) {
            throw createHttpError(400, "Existence of duplicate packages");
        } else {
            ids.push(itemId);
        }
    }
}

export function orderUpdateManager(newItemIds: string[], itemIdsFromDbIds: string[]){
    const updatedItemIds = [...itemIdsFromDbIds];

    for (let i = 0; i < newItemIds.length; i++) {
        if (updatedItemIds.includes(newItemIds[i])){
            i += 1;
        } else {
            updatedItemIds[i] = newItemIds[i];

        }
    }
    
}