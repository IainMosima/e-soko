import {InferSchemaType, Schema, model} from "mongoose";

// productSchema
const userSchema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    phoneNumber: { type: String, required: true },
    location: { type: String, required: true },
    profileImgKey: { type: String }
});

type User = InferSchemaType<typeof userSchema>;

export default model<User>('Product', userSchema);