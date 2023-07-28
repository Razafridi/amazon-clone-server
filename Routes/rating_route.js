import express from 'express';
import productModel from '../Models/product_model.js';
import authUser from '../Middleware/auth_user.js';


const ratingRoute = express.Router();


ratingRoute.post('/rating/rate-product' ,authUser, async (req , res)=>{
    const userId = req.id;
    const {productId , rating } = req.body

    const product = await productModel.findById(productId);
    for(var i=0;i<product.rating.length;i++){
        if(product.rating[i].userId == userId){
            product.rating[i].rating = rating;
            await product.save();
            return res.json({product , status: "updated"});
        }
    }

    product.rating.push({
        userId,
        rating,
    })
    await product.save();
     res.json({product , status: "New Added"});

});



export default ratingRoute;