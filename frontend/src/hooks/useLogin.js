// import {useState} from 'react'
// import { useAuthContext } from '../context/AuthContext.jsx';
// import toast from 'react-hot-toast';

// const useLogin = () => {
//     const [loading , setLoading] = useState(false);
//    const {setAuthUser} = useAuthContext();

//     const login = async (username,password) => {
       
//         const success=handleInputErrors({username, password})
//         if(!success) return;

//         //const {setAuthUser} = useAuthContext();
//         //if the success then return this function handleInputErrors;


//         setLoading(true);

//         try{
//             const res = await fetch("http://localhost:5000/api/auth/login",{
//                 method:"GET",
//                 headers:{"Content-Type":"application/json"},
//                 body:JSON.stringyfy({username,password})
//             })

//             const data= await res.json();
//             if(data.error){
//                 throw new Error(data.error)
//             }

//             localStorage.setItem("chat-user" , JSON.stringyfy(data));
//             setAuthUser(data);
//         }catch{
//             toast.error(error.message);
//         }finally{
//             setLoading(false);
//         }
//     }
//     return {loading,login}
// }

// export default useLogin;


// function handleInputErrors({username, password}){
//     if( !username || !password ){
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


import { useState } from "react";
import { useAuthContext } from "../context/AuthContext.jsx";
import toast from "react-hot-toast";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const login = async (username, password) => {
    // Validate input fields
    const isValid = handleInputErrors({ username, password });
    if (!isValid) return;

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (data.error) {
        throw new Error(data.error);
      }

      // Store user info in localStorage and update auth context
      localStorage.setItem("chat-user", JSON.stringify(data));
      setAuthUser(data);
      toast.success("Login successful!");
    } catch (error) {
      toast.error(error.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return { loading, login };
};

export default useLogin;

// Input validation helper function
function handleInputErrors({ username, password }) {
  if (!username || !password) {
    toast.error("Please fill in all fields");
    return false;
  }

  if (password.length < 6) {
    toast.error("Password must be at least 6 characters");
    return false;
  }

  return true;
}