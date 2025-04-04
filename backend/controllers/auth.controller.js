
// import User from "../models/user.model.js";
// import bcrypt from "bcryptjs";
// import generateTokenAndSetCookie from "../utils/generateToken.js";
import jwt from "jsonwebtoken";


import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

// // export const SignInUser = async (req, res) => {
// //     try {
// //         console.log("Request:", req.body);
// //         let { fullName, username, password, confirmPassword, gender } = req.body;

// //         // Trim all input fields
// //         fullName = fullName?.trim();
// //         username = username?.trim();
// //         password = password?.trim();
// //         confirmPassword = confirmPassword?.trim();
// //         gender = gender?.trim().toLowerCase(); // Normalize gender input

// //         if (!fullName || !username || !password || !confirmPassword || !gender) {
// //             return res.status(400).json({ error: "All fields are required" });
// //         }

// //         if (password.length < 6) {
// //             return res.status(400).json({ error: "Password must be at least 6 characters long" });
// //         }

// //         if (password !== confirmPassword) {
// //             return res.status(400).json({ error: "Passwords do not match" });
// //         }

// //         if (!["male", "female"].includes(gender)) {
// //             return res.status(400).json({ error: "Invalid gender. Choose 'male' or 'female'." });
// //         }

// //         const existingUser = await User.findOne({ username });
// //         if (existingUser) {
// //             return res.status(400).json({ error: "Username already exists" });
// //         }

// //         // Hash the password
// //         const hashedPassword = await bcrypt.hash(password, 10);

// //         // Profile Picture URL
// //         const profilePic = gender === "male"
// //             ? `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(username)}`
// //             : `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(username)}`;

// //         const newUser = new User({
// //             fullName,
// //             username,
// //             password: hashedPassword,
// //             gender,
// //             profilePic,
// //         });

// //         await newUser.save();
// //         generateTokenAndSetCookie(newUser._id, res);

// //         res.status(201).json({
// //             id: newUser._id,
// //             fullName: newUser.fullName,
// //             username: newUser.username,
// //             profilePic: newUser.profilePic,
// //         });
// //     } catch (error) {
// //         console.error("Error in SignInUser:", error.message);
// //         res.status(500).json({ error: "Internal Server Error. Please try again later." });
// //     }
// //};


// export const SignInUser = async (req, res) => {
//     try {
//         console.log("Request:", req.body);
//         const { fullName, username, password, confirmPassword, gender } = req.body;

//         if (!fullName || !username || !password || !confirmPassword || !gender) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "Passwords do not match" });
//         }

//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ error: "Username already exists" });
//         }

//         // Hash the password
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(password, salt);

//         // Profile Picture URL
//         const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
//         const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

//         if (!['male', 'female'].includes(gender)) {
//             return res.status(400).json({ error: "Invalid gender" });
//         }

//         const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

//         const newUser = new User({
//             fullName,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic,
//         });

//         // Save user and generate token
//         await newUser.save();
//         generateTokenAndSetCookie(newUser._id, res);

//         res.status(201).json({
//             id: newUser._id,
//             fullName: newUser.fullName,
//             username: newUser.username,
//             profilePic: newUser.profilePic,
//         });
//     } catch (error) {
//         console.error("Error in SignInUser:", error.message);
//         res.status(500).json({ error: "Internal Server Error in SignIn" });
//     }
// };






export const LogInUser = async (req, res) => {

    try {
        console.log("Log in User started");

        const { username, password } = req.body;

        console.log(username);

        console.log(password);



        // Validate input

        if (!username || !password) {

            return res.status(400).json({ error: "Username and password are required" });

        }



        const user = await User.findOne({ username });



        if (!user) {

            return res.status(400).json({ error: "User is not present" });

        }



        // Check if password is correct

        const isPasswordCorrect = await bcrypt.compare(password, user.password);

        if (!isPasswordCorrect) {

            return res.status(400).json({ error: "Invalid username or password" });

        }



        // Generate JWT Token

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1000d' });



        // Set Token in Cookie

        generateTokenAndSetCookie(user._id, token, res);



        // Send Response with Token

        res.status(200).json({

            _id: user._id,

            fullName: user.fullName,

            username: user.username,

            profilePic: user.profilePic,

            token,  // Including the token in response

        });



    } catch (error) {

        console.error("Error in login controller:", error.message);

        res.status(500).json({ error: "Internal Server Error" });

    }



    console.log("Log in User completed");

};



export const LogOutUser = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(200).json({message:"Log out sucessfully"});
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({ error: "Internal Server Error in Logout" });
    }

    console.log("Log Out User");
   
};


// // export const SignInUser = (req,res)=>{
// //     console.log("Sign In User");
// //     res.send("Sign In User");
// // };



// export const SignInUser = async (req, res) => {
//     try {
//         console.log("Request:", req.body);
//         let { fullName, username, password, confirmPassword, gender, profilePic } = req.body;

//         // Trim all input fields
//         fullName = fullName?.trim();
//         username = username?.trim();
//         password = password?.trim();
//         confirmPassword = confirmPassword?.trim();
//         gender = gender?.trim().toLowerCase(); // Normalize gender input
//         profilePic = profilePic?.trim();

//         if (!fullName || !username || !password || !confirmPassword || !gender || !profilePic) {
//             return res.status(400).json({ error: "All fields, including profile picture, are required" });
//         }

//         if (password.length < 6) {
//             return res.status(400).json({ error: "Password must be at least 6 characters long" });
//         }

//         if (password !== confirmPassword) {
//             return res.status(400).json({ error: "Passwords do not match" });
//         }

//         if (!["male", "female"].includes(gender)) {
//             return res.status(400).json({ error: "Invalid gender. Choose 'male' or 'female'." });
//         }

//         const existingUser = await User.findOne({ username });
//         if (existingUser) {
//             return res.status(400).json({ error: "Username already exists" });
//         }

//         // Hash the password
//         const hashedPassword = await bcrypt.hash(password, 10);

//         const newUser = new User({
//             fullName,
//             username,
//             password: hashedPassword,
//             gender,
//             profilePic,
//         });

//         await newUser.save();
//         generateTokenAndSetCookie(newUser._id, res);

//         res.status(201).json({
//             id: newUser._id,
//             fullName: newUser.fullName,
//             username: newUser.username,
//             profilePic: newUser.profilePic,
//         });
//     } catch (error) {
//         console.error("Error in SignInUser:", error.message);
//         res.status(500).json({ error: "Internal Server Error. Please try again later." });
//     }
// };

// import bcrypt from "bcrypt";
// import User from "../models/User.js";
// import generateTokenAndSetCookie from "../utils/generateToken.js";

export const SignInUser = async (req, res) => {
    try {
        console.log("Incoming Request:", req.body);

        let { fullName, username, password, confirmPassword, gender, profilePic } = req.body;

        // Trim all inputs
        fullName = fullName?.trim();
        username = username?.trim();
        password = password?.trim();
        confirmPassword = confirmPassword?.trim();
        gender = gender?.trim().toLowerCase(); // Normalize gender input
        profilePic = profilePic?.trim();

        // Validate required fields
        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields except profile picture are required." });
        }

        // Validate password length
        if (password.length < 6) {
            return res.status(400).json({ error: "Password must be at least 6 characters long." });
        }

        // Validate password confirmation
        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match." });
        }

        // Validate gender input
        if (!["male", "female"].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender. Choose 'male' or 'female'." });
        }

        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists. Choose another one." });
        }

        // Assign default profile picture if not provided
        if (!profilePic) {
            profilePic = gender === "male"
                ? `https://avatar.iran.liara.run/public/boy?username=${encodeURIComponent(username)}`
                : `https://avatar.iran.liara.run/public/girl?username=${encodeURIComponent(username)}`;
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create new user instance
        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });

        // Save user to database
        await newUser.save();

        // Generate auth token and set cookie
        generateTokenAndSetCookie(newUser._id, res);

        // Send success response
        res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
            message: "Signup successful!",
        });
    } catch (error) {
        console.error("Error in SignInUser:", error.message);
        res.status(500).json({ error: "Internal Server Error. Please try again later." });
    }
};




