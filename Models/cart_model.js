import mongoose from "mongoose";


const cartSchema = mongoose.Schema({
    productId:{
        type:Object,
        require: true,
    },
    selectedItem: {
        type: Number,
        require:true,
    },
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
    rating: {
        type:Array ,
        default: [],
    },
    
    image: 
        {
            type: String,
            require: true,
        }
   
});


export default cartSchema