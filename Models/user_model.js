import mongoose from "mongoose";
import cartSchema from "./cart_model.js";

const userSchema = mongoose.Schema(
    {
        name: {
            type:String ,
            require: true,
        },
        email: {
            type:String ,
            require: true,
        },
        password: {
            type:String ,
            require: true,
        },
        type: {
            type:String ,
            require: true,
        },
        cart: [
            {
                type:cartSchema,
                default: [],
            }
        ]
    }
);

const userModel = mongoose.model('users', userSchema);
export default userModel;