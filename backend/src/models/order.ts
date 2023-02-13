import {InferSchemaType, Schema, model} from "mongoose";

const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, required: true },
    packageId: { type: Schema.Types.ObjectId, required: true, },
    price: { type: Number, required: true },
    status: { type: String, default: 'not-paid', select: false }
});

type Order = InferSchemaType<typeof OrderSchema>;

export default model<Order>('Order', OrderSchema);