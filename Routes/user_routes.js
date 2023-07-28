import express from 'express';
import userModel from '../Models/user_model.js';
import bcryptjs from 'bcryptjs';
import jsonwebtoken from 'jsonwebtoken';
import authUser from '../Middleware/auth_user.js'
import productModel from '../Models/product_model.js';



const userRouter = express.Router();
//Sign Up Api
userRouter.post('/api/signup', async (req  , res)=>{
    try{
    const {name , email , password , type } = req.body;
    const existUser = await userModel.findOne({email})
    if(existUser){
        return res.status(400).json({message: "User Already exists with this email"});
    }
    const securePassword = await bcryptjs.hash(password , 12);
    const user = new userModel({name  , email , password: securePassword , type});
    const result = await user.save();
    res.json({result});
    }catch(e){
        return res.status(500).json({error : e.message});
    }
});

//Sign in Api

userRouter.post('/api/signin' , async (req , res)=>{
    try{

        const {email , password } = req.body;
        console.log(req.body);
        const user = await userModel.findOne({email});
        if(!user){
            return res.status(400).json({message: "User not Found!"});
        }
        const checkPassword = await bcryptjs.compare(password , user.password);
        if(!checkPassword){
            return res.status(400).json({message: "Incorrect Password!"});
        }
        //generate token
        const token = await jsonwebtoken.sign({email , id: user._id} , 'secretkey');
        return res.status(200).json({token , user})

    }catch(e){
        return res.status(500).json({error : e.message});
    }


});


//Authenticate user 

userRouter.post('/api/get-user' , authUser, async (req , res)=>{
    try{
        const id = req.id;
        
        const user = await userModel.findById(id);
        res.json({
            token: req.token,
            user
        })

    }catch(e){
        res.status(500).json({error: e.message});
    }
})
// Carts
//Add To Cart


export default userRouter;
