import mongoose from "mongoose";


const ratingSchema = mongoose.Schema({
    rating: {
        type: Number,
        require: true,
    },
    userId: {
        type: String,
        require: true,
    }
});

const productSchema = mongoose.Schema({
    name: {
        type:String , 
        require: true,
    },
    description: {
        type:String , 
        require: true,
    },
     userId: {
        type:String , 
        require: true,
    },
    category: {
        type:String , 
        require: true,
    },
    price: {
        type:Number , 
        require: true,
    },
    quantity: {
        type:Number , 
        require: true,
    },
    rating: [
        {
            type:ratingSchema,
            default : [],
        }
    ],
    
    image: 
        {
            type: String,
            require: true,
        }
    
});

const productModel = mongoose.model('products' , productSchema);

export default productModel;
