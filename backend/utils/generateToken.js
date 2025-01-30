// import jwt from 'jsonwebtoken'

// const generateTokenAndSetCookie = (userId , res)=>{
//     const token = jwt.sign({userId}, process.env.JWT_SECRET,{
//         expiresIn:'1000d'
//     });

//     res.cookie("jwt",token,{
//         maxAge:1000*24*60*1000,//this should be in milisec format
//         httpOnly:true, //prevent XSS attack (which is also known as scriptin attacks)
//         sameSite:"strict", //CSRF attacks cross-site request forgery attacks
//         secure:process.env.NODE_ENV !== "development"
//     });

// };

// export default generateTokenAndSetCookie;

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