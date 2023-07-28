import express from 'express';
import userModel from '../Models/user_model.js';
import authUser from '../Middleware/auth_user.js';
import productModel from '../Models/product_model.js';

const cartRoute = express.Router();

//Add to Cart
cartRoute.post('/cart/add-to-cart',authUser , async (req, res)=>{
    try{
    const {productId } = req.body;
    const id = req.id;
    const user = await userModel.findById(id);
    console.log(user.cart);
    for(var i =0;i<user.cart.length;i++){
        if(user.cart[i].productId == productId){
            user.cart[i].selectedItem+=1;
            console.log("Add TO Cart" , user.cart[i].selectedItem);
            await user.save();
            return res.json(user);
        }
    }
    const product = await productModel.findById(productId);
    const {name , description , price , quantity , image , category , rating , userId } = product._doc;
    console.log("Quantity", quantity);

    user.cart.push({
        name , 
        description , 
        price , 
        quantity , 
        image , 
        category , 
        rating , 
        userId , 
        productId , 
        selectedItem:1,
    })

    await user.save();
   
    res.json({
        user
    })

}catch(e){
    res.json({
        error: e.message,
    })
}
});


//Get all Carts Items
// cartRoute.get('/cart/get-carts' , authUser,async (req, res)=>{
//     const list = [];
//     const userId = req.id;
//     const user = await userModel.findById(userId);
//     for(var index =0;index < user.cart.length;index++){
//         const product = await productModel.findById(user.cart[index].productId);
//         list.push({product , selectedItems: user.cart[index].quantity});
//     }
//     res.json({
//         cart: list,
//     })
// });

//subtract from cart

cartRoute.post('/cart/subtract-from-cart',authUser , async (req, res)=>{
    try{
    const {productId } = req.body;
    const id = req.id;
    const user = await userModel.findById(id);
    for(var i =0;i<user.cart.length;i++){
        if(user.cart[i].productId == productId){
            if(user.cart[i].selectedItem >1){
                user.cart[i].selectedItem-=1;
                await user.save();
                return res.json(user);

            }else{
                break;
            }
            
        }
    }
    

    
   
    res.status(400).json({
        message: 'This Have only one Item'
    })

}catch(e){
    res.status(500).json({
        error: e.message,
    })
}
});


//Remove from cart

cartRoute.delete('/cart/delete-from-cart',authUser , async (req, res)=>{
    try{
    const {productId } = req.body;
    const id = req.id;
    const user = await userModel.findById(id);
    for(var i =0;i<user.cart.length;i++){
        if(user.cart[i].productId == productId){
            user.cart.splice(i, 1);
            await user.save()
            return res.json({
                message: "Successfully Deleted",
            })
            }   
        }
    res.status(400).json({
        message: 'Cart Item not found',
    })

}catch(e){
    res.status(500).json({
        error: e.message,
    })
}
});


//Clear cart

cartRoute.delete('/cart/clear-cart',authUser , async (req, res)=>{
    try{
    const {productId } = req.body;
    const id = req.id;
    const user = await userModel.findById(id);

    user.cart = [];
    await user.save();
    // for(var i =0;i<user.cart.length;i++){
    //     if(user.cart[i].productId == productId){
    //         user.cart.splice(i, 1);
    //         await user.save()
    //         return res.json({
    //             message: "Successfully Deleted",
    //         })
    //         }   
    //     }
    res.status(200).json({
        user,
        message: 'Cart Clear',
    })

}catch(e){
    res.status(500).json({
        error: e.message,
    })
}
});
export default cartRoute;