
import User from "../models/user.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetCookie from "../utils/generateToken.js";

export const SignInUser = async (req, res) => {
    try {
        console.log("Request:", req.body);
        const { fullName, username, password, confirmPassword, gender } = req.body;

        if (!fullName || !username || !password || !confirmPassword || !gender) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ error: "Username already exists" });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Profile Picture URL
        const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

        if (!['male', 'female'].includes(gender)) {
            return res.status(400).json({ error: "Invalid gender" });
        }

        const profilePic = gender === "male" ? boyProfilePic : girlProfilePic;

        const newUser = new User({
            fullName,
            username,
            password: hashedPassword,
            gender,
            profilePic,
        });

        // Save user and generate token
        await newUser.save();
        generateTokenAndSetCookie(newUser._id, res);

        res.status(201).json({
            id: newUser._id,
            fullName: newUser.fullName,
            username: newUser.username,
            profilePic: newUser.profilePic,
        });
    } catch (error) {
        console.error("Error in SignInUser:", error.message);
        res.status(500).json({ error: "Internal Server Error in SignIn" });
    }
};





// export const SignInUser = async (req,res)=>{
//     try{
//         console.log("Request:",req.body);
//         const { FullName, Username, Password, ConfirmPassword, gender } = req.body;

        
//         if (!FullName || !Username || !Password || !ConfirmPassword || !gender) {
//             return res.status(400).json({ error: "All fields are required" });
//         }

//         if(Password!=ConfirmPassword){
//             return res.status(400).json({error:"password did not match"});
//         };

//         const user=await User.findOne({Username});
        
//         if(user){
//             return res.status(400).json({error:"Username already exists"});
//         };

//         //Hash password here;
//         const salt = await bcrypt.genSalt(10);
//         const hashedPassword = await bcrypt.hash(Password,salt);

//         // https://avatar-placeholder.iran.liara.run/
//         const boyProfilePic ='https://avatar.iran.liara.run/public/boy?username=${username}';

//         const girlProfilePic ='https://avatar.iran.liara.run/public/girl?username=${username}';

//         const newUser = new User({
//             FullName,
//             Username,
//             Password:hashedPassword,
//             gender,
//             profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
//         })
        
//         if(newUser){
//             // Generate JWT token here
//             generateTokenAndSetCookie(newUser._id , res);

//             await newUser.save();

//             res.status(201).json({
//                 id: newUser.id,
//                 FullName: newUser.FullName,
//                 Username: newUser.Username,
//                 profilePic: newUser.profilePic,
//                 // createdAt: newUser.createdAt,
//                 // updatedAt: newUser.updatedAt,
//             });
//         }
//         else{
//             res.status(400).json({error:"Invalid user data"});
//         }
//     }catch (error){
//         console.log('Error in signup controller', error.message);
//         res.status(500).json({error:"Internal Server Error in SignIn"});
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
  
      const user = await User.findOne({ username }); // Ensure this is awaited
  
      if (!user) {
        return res.status(400).json({ error: "User is not present" });
      }
  
      // Check if password is correct
      const isPasswordCorrect = await bcrypt.compare(password, user.password);
  
      if (!isPasswordCorrect) {
        return res.status(400).json({ error: "Invalid username or password" });
      }
  
      // If credentials are correct, generate the token and set the cookie
      generateTokenAndSetCookie(user._id, res);
  
      res.status(200).json({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        profilePic: user.profilePic,
      });
  
    } catch (error) {
      console.log("Error in login controller", error.message);
      res.status(500).json({ error: "Internal Server Error" });
    }
  
    console.log("Log in User");

};




export const LogOutUser = (req,res)=>{
    try{
        res.cookie("jwt","",{maxAge:0});
        res.status(500).json({message:"Log out sucessfully"});
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
