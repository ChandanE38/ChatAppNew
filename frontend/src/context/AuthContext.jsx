import { createContext, useContext, useState } from 'react'

export const AuthContext = createContext();

// const context = useContext(AuthContext);
export const useAuthContext = () => {
    return useContext(AuthContext);
};



export const AuthContextProvider = ({children}) => {

    const [authUser , setAuthUser ] =useState(JSON.parse(localStorage.getItem("chat-user")) || null)

    //we rap inside authcontext provider so that our entire app use value which assign to that
    return <AuthContext.Provider value={{authUser,setAuthUser}}>
        {children}
    </AuthContext.Provider>
}