import { createContext, useContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const useAuthContext = () => {
    return useContext(AuthContext);
};

export const AuthContextProvider = ({ children }) => {
    // Initialize with undefined to handle loading state correctly in App.jsx
    const [authUser, setAuthUser] = useState(undefined);

    useEffect(() => {
        try {
            const userJson = localStorage.getItem("chat-user");
            const user = userJson ? JSON.parse(userJson) : null;
            setAuthUser(user);
        } catch (error) {
            console.error("Failed to parse user from localStorage", error);
            setAuthUser(null);
        }
    }, []);

    return (
        <AuthContext.Provider value={{ authUser, setAuthUser }}>
            {children}
        </AuthContext.Provider>
    );
};
