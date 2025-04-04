// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const protectRoute= async(req,res,next)=>{
//     try{
//         const token = req.cookies.jwt;
    
//         if(!token){
//             return res.status(401).json({error:"Unauthorised - No Token Provided"});
//         }

//         const decoded = jwt.verify(token,process.env.JWT_SECRET);

//         if(!decoded){
//             return res.status(401).json({error:"Unauthorised -Invalid token"});

//         }

//         const user = await User.findById(decoded.userId).select("-password");

//         if(!user){
//             return res.status(404).json({error:"User not found"});
//         }

//         req.user = user;

//         next();

//     }catch{
//         console.log("Error in protectRoute middleware:",error.message);
//         res.status(500).json({error:"Internal server error in Token"});
//     }
// };

// export default protectRoute;




// import jwt from 'jsonwebtoken';
// import User from '../models/user.model.js';

// const protectRoute = async (req, res, next) => {
//     try {
//         let token;

//         // Check for Bearer Token in Authorization Header
//         if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
//             token = req.headers.authorization.split(" ")[1]; // Extract token after "Bearer"
//         } 
//         // Fallback to Token in Cookies
//         else if (req.cookies?.jwt) {
//             token = req.cookies.jwt;
//         }

//         if (!token) {
//             return res.status(401).json({ error: "Unauthorized - No Token Provided" });
//         }

//         let decoded;
//         try {
//             decoded = jwt.verify(token, process.env.JWT_SECRET);
//         } catch (error) {
//             return res.status(401).json({ error: "Unauthorized - Invalid Token" });
//         }

//         const user = await User.findById(decoded.userId).select("-password");

//         if (!user) {
//             return res.status(404).json({ error: "User not found" });
//         }

//         req.user = user;
//         next();
//     } catch (error) {
//         console.error("Error in protectRoute middleware:", error.message);
//         res.status(500).json({ error: "Internal Server Error in Token Verification" });
//     }
// };

// export default protectRoute;

import jwt from 'jsonwebtoken';
import User from '../models/user.model.js';

const protectRoute = async (req, res, next) => {
    try {
        let token;

        // 1️⃣ Check for Bearer Token in Authorization Header
        if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
            token = req.headers.authorization.split(" ")[1];
        } 
        // 2️⃣ Fallback to Token in Cookies
        else if (req.cookies?.jwt) {
            token = req.cookies.jwt;
        }

        console.log("🔹 Extracted Token:", token); // Debugging log

        if (!token) {
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        // 3️⃣ Verify JWT Token
        let decoded;
        try {
            decoded = jwt.verify(token, process.env.JWT_SECRET);
            console.log("✅ Token Decoded:", decoded); // Debugging log
        } catch (error) {
            console.error("❌ JWT Verification Error:", error.message);
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        // 4️⃣ Fetch User from Database (Exclude Password)
        const user = await User.findById(decoded.userId).select("-password");

        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("❌ Error in protectRoute Middleware:", error.message);
        res.status(500).json({ error: "Internal Server Error in Token Verification" });
    }
};

export default protectRoute;
