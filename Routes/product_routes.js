import express from 'express';
import productModel from '../Models/product_model.js';
import authUser from '../Middleware/auth_user.js';
import productAuth from '../Middleware/product_auth.js';

const productrouter = express.Router();

//Add Product
productrouter.post('/seller/add-product', productAuth, async (req , res)=>{

    console.log("All ", req.body)
    const {name , description , price , productQuantity , image , category} = req.body;
    const id  = req.id;
    
    
    const product = new productModel({name ,quantity:productQuantity , description , price , category , image, userId:id });
    const result = await product.save();
    
    res.json({
     result
    });
})

//get all Product 
productrouter.get('/seller/get-products' ,productAuth , async (req , res)=>{
    const result = await productModel.find({});
    res.json({
        products: result,
    })
});

//get Product by id 
productrouter.get('/seller/get-product/:id', productAuth , async (req , res)=>{

    const id = req.params.id;
    const result = await productModel.findOne({_id : id});
    res.json({
        products: result,
    })
});


//get by category

productrouter.get('/seller/get-product-by-category/:category' ,productAuth, async (req , res)=>{

    const category = req.params.category;
    const result = await productModel.find({category});
    res.json({
        products: result,
    })
});
productrouter.get('/seller/search-product' , productAuth ,async (req , res)=>{

    const text = req.query.search;
    const reg = new RegExp(text ,'i');
    const result = await productModel.find({
        name : {$regex : reg}
    });
    res.json({
        products: result,
    })
});

export default productrouter;
