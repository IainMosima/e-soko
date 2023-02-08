import {InferSchemaType, Schema, model } from "mongoose";

const productsSchema = new Schema({
    productName: { type: String, required: true },
    productImgKey: { type: String, required: false },
    categoryName: { type: String, required: true},
    price: { type: Number, required: true },
    available: { type: Boolean }
});

type Package = InferSchemaType<typeof productsSchema>;

export default model<Package>("Product", productsSchema);