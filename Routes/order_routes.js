import express, { json } from 'express';
import authUser from '../Middleware/auth_user.js';
import orderModel from '../Models/order_model.js';

const orderRoute = express.Router();


orderRoute.post('/order/place-order' ,authUser, async (req , res)=>{
    const userId = req.id;
    const {orderItems , totalAmount , address} = req.body;
    const order = new orderModel({
        totalAmount,
        userId,
        address,
        orderItems,
    })
    await order.save();
    console.log(orderItems , totalAmount);
    res.json(req.body);

});

orderRoute.get('/order/get-user-orders' ,authUser, async (req, res)=>{
    const userId = req.id;
    const orders = await orderModel.find({userId})
    res.json(orders);
});


export default orderRoute;