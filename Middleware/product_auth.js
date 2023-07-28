import jsonwebtoken from 'jsonwebtoken';

const key = 'secretkey';

const productAuth =  async (req , res , next)=>{
    try{
        const token = req.headers.token;
        const check = await jsonwebtoken.verify(token , key);
        if(!check){
            return res.status(400).json({message: "UnAuthorized User"});
        }
        console.log("Ckeck" ,check);
        req.id = check.id;
        next();
    }catch(e){
        res.status(500).json({error: e.message});
    }


}

export default productAuth;
