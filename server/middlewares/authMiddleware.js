import jwt from 'jsonwebtoken';
//auth ,admin and customer
 
const isAuthenticate=(req,res,next)=>{
    try{
        //three ways to access token
        const token=req.cookies.token;
        // const token=req.body.token||req.cookies.token||req.header("Autherization").replace("bearer","");
       
        if(!token)
        {
            res.json({
                Status:false,
                message:"Missing token"
            })
        }
        //verify token
        try {
            const decode=jwt.verify(token,"jwt_secret_key")
            console.log(decode)
            //why this because to use the user detail in next middleware 
            req.user=decode;            
        } catch (error) {
            return res.json({
                Status:false,
                message:"Token is invalid"
            })
            
        }
        next();



    }   
    catch(error){
        return res.json({
            Status:false,
            message:"Something went wrong "
        })

    }
}

const isCustomer=(req,res,next)=>{
    try {
        if(req.user.roll!=="customer")
        {
            return res.json({
                Status:false,
                message:"protected routes for this role "
            })
    
        }
        next();
    } catch (error) {
        return res.json({
            Status:false,
            message:"User roll is not matching  "
        })
    }
   
}

const isAdmin=(req,res,next)=>{
    try {
        if(req.user.roll!=="admin")
        {
            return res.json({
                Status:false,
                message:"protected routes for this role "
            })
    
        }
        next();
    } catch (error) {
        return res.json({
            Status:false,
            message:"User roll is not matching  "
        })
    }
}
export {isAdmin,isCustomer,isAuthenticate}