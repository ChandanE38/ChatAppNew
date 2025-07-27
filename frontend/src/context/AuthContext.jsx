import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

//created new hook
// const context = useContext(AuthContext);
export const useAuthContext = () => {
    return useContext(AuthContext);
};



export const AuthContextProvider = ({children}) => {

    const [authUser , setAuthUser ] =useState(JSON.parse(localStorage.getItem("chat-user")) || null)

    console.log("🔍 AuthContext - Current authUser:", authUser);
    console.log("🔍 AuthContext - Token available:", !!localStorage.getItem("token"));
    console.log("🔍 AuthContext - chat-user in localStorage:", localStorage.getItem("chat-user"));
    console.log("🔍 AuthContext - token in localStorage:", localStorage.getItem("token"));

    //we rap inside authcontext provider so that our entire app use this "value" which assign to that
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}