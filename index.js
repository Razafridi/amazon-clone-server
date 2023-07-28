import express from 'express';
import userRouter from './Routes/user_routes.js';
import mongoose from 'mongoose';
import productRouter from './Routes/product_routes.js';
import cartRoute from './Routes/cart_routes.js';
import orderRoute from './Routes/order_routes.js';
import ratingRoute from './Routes/rating_route.js';


const app = express();
const PORT = process.env.PORT ||3000

//Use Middleware
app.use(express.json())

//Routes
app.use(userRouter);
app.use(productRouter);
app.use(cartRoute);
app.use(orderRoute)
app.use(ratingRoute)




//Connect to database
mongoose.connect('mongodb+srv://razafridi088:razafridi@cluster0.gkzlrqr.mongodb.net/?retryWrites=true&w=majority').then((result)=>{
    console.log("Connection Established Successfully");
});

//Listening to the Port

app.listen(PORT , '0.0.0.0' , ()=>{
    console.log(`Listening at Port ${PORT}`)
});
