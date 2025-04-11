import jwt from 'jsonwebtoken'

const generateTokenAndSetCookie = (userId ,token, res)=>{  

    res.cookie("jwt",token,{
        maxAge:1000*24*60*1000,//this should be in milisec format
        httpOnly:true, //prevent XSS attack (which is also known as scriptin attacks)
        sameSite:"strict", //CSRF attacks cross-site request forgery attacks
        secure:process.env.NODE_ENV !== "development"
    });

};

export default generateTokenAndSetCookie;