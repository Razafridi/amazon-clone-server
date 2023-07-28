import mongoose from "mongoose";

const cart = mongoose.Schema({
    name: {
        type:String,
        require:true,
    },
    image: {
        type:String,
        require:true,
    },
    description:{
        type:String,
        require:true,
    },
    productId:{
        type:String,
        require:true,
    },
    quantity:{
        type:Number,
        require:true,
    },
    price:{
        type:Number,
        require:true,
    },
})


const orderSchema = mongoose.Schema({
    totalAmount :{
        type: Number,
        require:true,
    },
    userId: {
        type: String,
        require: true,
    },
    status: {
        type: String,
        default: 'Pending',
    },
    address: {
        type: String,
        require:true,
    },
    orderItems: [
        {
        type:cart,
        require: true,
        }
    ]

});
const orderModel = mongoose.model('orders', orderSchema);
export default orderModel;