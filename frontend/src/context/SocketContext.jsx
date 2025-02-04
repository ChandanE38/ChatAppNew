// import {createContext,useState,useEffect} from "react";
// import { useAuthContext } from "./AuthContext";
// import { io } from "../../../backend/socket/socket";

// export const SocketContext = createContext();

// export const SocketContextProvider = ({children})=>{ 
//     const [socket,setSocket] =  useState(null);  
//     const [onlineUsers,setOnlineUsers] = useState([]);
//     const {authUser} = useAuthContext();

//     useEffect(()=>{
//         if(authUser){
//             const socket = io("http://localhost:5000");

//             setSocket(socket);

//             return ()=> socket.close();
//         }
//         else{
//             if(socket){
//                 socket.close();
//                 setSocket(null);
//             }
//         }
//     },[]);


//     return(
//         <SocketContext.Provider value={{socket,onlineUsers}}>
//             {children}
//         </SocketContext.Provider>
//     );
// }


// import { createContext, useState, useEffect, useContext } from "react";
// import { io } from "socket.io-client";
// import { useAuthContext } from "./AuthContext";

// export const SocketContext = createContext();

// //created new hook
// export const useSocketContext = () => {
//     return useContext(SocketContext);
// };

// export const SocketContextProvider = ({ children }) => { 
//   const [socket, setSocket] = useState(null);  
//   const [onlineUsers, setOnlineUsers] = useState([]);
//   const { authUser } = useAuthContext();

//   useEffect(() => {
//     if (authUser) {
//       const socketInstance = io("http://localhost:5000",{
//          query:{
//             userId:authUser._id,
//          }
//       });

//       setSocket(socketInstance);

//       socket.on("getOnlineUsers",(users)=>{
//         setOnlineUsers(users);
//       })

//       return () => socketInstance.close();
//     } else {
//       if (socket) {
//         socket.close();
//         setSocket(null);
//       }
//     }
//   }, [authUser]);

//   return (
//     <SocketContext.Provider value={{ socket, onlineUsers }}>
//       {children}
//     </SocketContext.Provider>
//   );
// };


import { createContext, useState, useEffect, useContext } from "react";
import { io } from "socket.io-client";
import { useAuthContext } from "./AuthContext";

export const SocketContext = createContext();

//created new hook
export const useSocketContext = () => {
    return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => { 
  const [socket, setSocket] = useState(null);  
  const [onlineUsers, setOnlineUsers] = useState([]);
  const { authUser } = useAuthContext();

  // ✅ Ensure socket initializes properly
  useEffect(() => {
    if (authUser) {
      const socketInstance = io("http://localhost:5000");
      setSocket(socketInstance);

      return () => {
        socketInstance.close();
        setSocket(null);
      };
    }
  }, [authUser]);

  // ✅ Prevent null reference error before using socket.on
  useEffect(() => {
    if (!socket) return;

    socket.on("online-users", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socket.off("online-users");
    };
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};
