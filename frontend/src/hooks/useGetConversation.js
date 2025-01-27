import {useEffect, useState} from 'react';
import toast from 'react-hot-toast';

const useGetConversations = () => {
    const [loading,setLoading]=useState(false);
    const [conversations,setConversations]= useState([]);

    useEffect(()=> {
        const getConverations = async () => {

            //we use setLoading equal to true bcz it can show that loading before execution give its result; 
            setLoading(true);

            try{
                const res = await fetch("http://localhost:5000/api/users",{
                    method:"GET",
                });

                console.log("Response:",res);

                const data = await res.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);
            }catch(error){
                toast.error(error.message);
            }finally{
                setLoading(false);
            }
        }

        getConverations();
    },[]);

    //Here we are returning loading state and conversation state.
    return {loading,conversations};
}

export default useGetConversations;


// import { useEffect, useState } from "react";
// import toast from "react-hot-toast";

// const useGetConversations = () => {
//   const [loading, setLoading] = useState(false);
//   const [conversations, setConversations] = useState([]);

//   useEffect(() => {
//     const getConversations = async () => {
//       setLoading(true); // Show loading state while fetching data

//       try {
//         const res = await fetch("http://localhost:5000/api/users", {
//           method: "GET",
//         });

//         if (!res.ok) {
//           throw new Error(`HTTP error! Status: ${res.status}`);
//         }

//         const data = await res.json();

//         if (data.error) {
//           throw new Error(data.error);
//         }

//         setConversations(data);
//       } catch (error) {
//         toast.error(error.message || "Failed to fetch conversations");
//       } finally {
//         setLoading(false); // End loading state
//       }
//     };

//     getConversations();
//   }, []);

//   return { loading, conversations }; // Return loading and conversations state
// };

// export default useGetConversations;
