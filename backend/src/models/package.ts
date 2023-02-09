import {InferSchemaType, Schema, model} from "mongoose";

const ItemSchema = new Schema({
    // here _id is equivalent to product id`
    _id: { type: Schema.Types.ObjectId, required: true },
    quantity: { type: Number, required: true }
});

const packageSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    packageName: { type: String, required: true },
    items: [ItemSchema],
});

type Package = InferSchemaType<typeof packageSchema>;

export default model<Package>('Package', packageSchema);
