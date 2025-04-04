// import {useState} from 'react'
// import toast from 'react-hot-toast';
// import { useAuthContext } from '../context/AuthContext';


// const useSignup = () => {
//     const [loading , setLoading] = useState(false);
//     const {setAuthUser} = useAuthContext();
    
//     const signup = async({ fullName,username, password, confirmPassword, gender})=> {
//        const success=handleInputErrors({fullName,username, password, confirmPassword, gender})

//     //    const {setAuthUser} = useAuthContext();

//        //if the success then return this function handleInputErrors;
//        if(!success) return;

//        setLoading(true);
       
//        try{
//             const res = await fetch("http://localhost:5000/api/auth/Signup",{
//                 method:"POST",
//                 headers:{"content-Type":"application/json"},
//                 body:JSON.stringify({fullName,username, password, confirmPassword, gender})
//             })

//             const data = await res.json();
//             console.log(data);

//             if(data.error){
//                 throw new Error(data.error)
//             }
            
//             //set the user to the localStorage and then update the auth context values
//             localStorage.setItem("chat-user",JSON.stringify(data))

//             //context
//             setAuthUser(data);

//        }catch(error){
//             toast.error(error.message)
//        }finally{
//         setLoading(false);
//        }

//     }
//     return { loading , signup };
// };

// export default useSignup;


// function handleInputErrors({fullName,username, password, confirmPassword, gender}){
//     if(!fullName || !username || !password || !confirmPassword || !gender){
//         toast.error('Please fill in all fields')
//         return false
//     }

//     if(password!= confirmPassword){
//         toast.error('Password do not match')
//         return false
//     }

    
//     if(password!= confirmPassword){
//         toast.error('Password must be atleast 6 characters')
//         return false
//     }

//     return true;
// }


// import { useState } from "react";
// import toast from "react-hot-toast";
// import { useAuthContext } from "../context/AuthContext";

// const useSignup = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();
    
//     const signup = async ({ fullName, username, password, confirmPassword, gender, profilePic }) => {
//         const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });

//         if (!success) return;

//         setLoading(true);

//         try {
//             const res = await fetch("http://localhost:5000/api/auth/Signup", {
//                 method: "POST",
//                 headers: { "Content-Type": "application/json" },
//                 body: JSON.stringify({ fullName, username, password, confirmPassword, gender, profilePic }),
//             });

//             const data = await res.json();
//             console.log("Signup Response:", data);

//             if (res.status !== 201) {
//                 throw new Error(data.error || "Signup failed");
//             }

//             // Store user in localStorage
//             localStorage.setItem("chat-user", JSON.stringify(data));

//             // Update auth context
//             setAuthUser(data);

//             // Success message
//             toast.success("Signup successful!");

//         } catch (error) {
//             toast.error(error.message);
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, signup };
// };

// export default useSignup;

// // 🛠 Improved Input Validation
// function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
//     if (!fullName || !username || !password || !confirmPassword || !gender) {
//         toast.error("Please fill in all fields");
//         return false;
//     }

//     if (password.length < 6) {
//         toast.error("Password must be at least 6 characters");
//         return false;
//     }

//     if (password !== confirmPassword) {
//         toast.error("Passwords do not match");
//         return false;
//     }

//     return true;
// }


import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const DEFAULT_PROFILE_PIC = "/assets/default-profile-pic.png"; // Local default image

const useSignup = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();
    
    const signup = async ({ fullName, username, password, confirmPassword, gender, profilePic }) => {
        const success = handleInputErrors({ fullName, username, password, confirmPassword, gender });
        if (!success) return;

        // Assign default profile picture if not provided
        profilePic = profilePic || DEFAULT_PROFILE_PIC;

        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/Signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ fullName, username, password, confirmPassword, gender, profilePic }),
            });

            const data = await res.json();
            console.log("Signup Response:", data);

            if (res.status !== 201) {
                throw new Error(data.error || "Signup failed");
            }

            // Store user in localStorage
            localStorage.setItem("chat-user", JSON.stringify(data));

            // Update auth context
            setAuthUser(data);

            // Success message
            toast.success("Signup successful!");

        } catch (error) {
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    };

    return { loading, signup };
};

export default useSignup;

// 🛠 Improved Input Validation
function handleInputErrors({ fullName, username, password, confirmPassword, gender }) {
    if (!fullName || !username || !password || !confirmPassword || !gender) {
        toast.error("Please fill in all fields");
        return false;
    }

    if (password.length < 6) {
        toast.error("Password must be at least 6 characters");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    return true;
}
