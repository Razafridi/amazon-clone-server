import jsonwentoken from 'jsonwebtoken';
import userModel from '../Models/user_model.js';

const key = 'secretkey';
const authUser = async (req , res , next)=>{
    try{
        const token = req.headers.token;
    const result = await jsonwentoken.verify(token , key);
    const checkingUser = await userModel.findOne({email : result.email});
    console.log(result)
    if(!checkingUser){
        return res.status(400).json({message: "User Not authenticated!"});
    } 
    req.id = result.id;
    req.token = token;
    next();
        
    }catch(e){
        res.status(500).json({error: e.message});
    }
}

export default authUser;