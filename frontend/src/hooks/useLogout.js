// import {useState} from 'react'
// import {useAuthContext} from "../context/AuthContext";
// import toast from "react-hot-toast";

// const useLogout = ()=> {
//    const [loading , setLoading ] = useState(false);
//     const { setAuthUser } = useAuthContext();

//     const logout = async () => {
//         setLoading(true);

//         try{
//             const res = await fetch("/api/auth/logout",{
//                 method: "GET",
//                 headers : { "Context-Type": "application/json"},
//             });
//             const data = await res.json();
//             if(data.error){
//                 throw new Error(data.error);
//             }

//             localStorage.removeItem("chat-user");
//             setAuthUser(null);

//         }catch{
//             toast.error(error.message);
//         }finally{
//             setLoading(false);
//         }
//     }
//     return { loading , logout};
// }

// export default useLogout;


// import { useState } from 'react';
// import { useAuthContext } from "../context/AuthContext";
// import toast from "react-hot-toast";

// const useLogout = () => {
//     const [loading, setLoading] = useState(false);
//     const { setAuthUser } = useAuthContext();

//     const logout = async () => {
//         setLoading(true);

//         try {
//             const res = await fetch("/api/auth/logout", {
//                 method: "GET"
//                 // headers: { "Content-Type": "application/json" }, // Corrected header
//             });
//             const data = await res.json();
//             if (data.error) {
//                 throw new Error(data.error);
//             }

//             // Clear localStorage and update auth context
//             localStorage.removeItem("chat-user");
//             setAuthUser(null);

//             // Optional: Notify user of successful logout
//             toast.success("Successfully logged out!");
//         } catch (error) {
//             toast.error(error.message); // Handle any errors
//         } finally {
//             setLoading(false);
//         }
//     };

//     return { loading, logout };
// };

// export default useLogout;

import { useState } from 'react';
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true);

        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            // Check if the response is JSON
            const contentType = res.headers.get("content-type");
            if (contentType && contentType.includes("application/json")) {
                const data = await res.json();
                
                if (data.error) {
                    throw new Error(data.error);
                }

                // Clear localStorage and update auth context
                localStorage.removeItem("chat-user");
                setAuthUser(null);

                // Optional: Notify user of successful logout
                toast.success("Successfully logged out!");
            } else {
                throw new Error("Unexpected response format: Expected JSON.");
            }
        } catch (error) {
            console.error("Logout Error:", error); // Log the error for debugging
            toast.error(error.message); // Display the error message in a toast
        } finally {
            setLoading(false);
        }
    };

    return { loading, logout };
};

export default useLogout;