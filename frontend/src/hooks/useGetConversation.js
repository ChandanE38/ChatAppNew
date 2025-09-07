
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);
    const { authUser } = useAuthContext();

    useEffect(() => {
        const getConversations = async () => {
            // Only fetch if user is authenticated
            if (!authUser || !authUser._id) {
                console.log("⏳ Skipping conversations fetch - user not authenticated");
                return;
            }

            setLoading(true);

            try {
                // Get the token from localStorage
                const token = localStorage.getItem("token");
                
                if (!token) {
                    throw new Error("No authentication token found");
                }

                const res = await fetch("http://localhost:5000/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Fixed template literal syntax
                    },
                });

            

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                console.error("Error fetching conversations:", error.message);
                // Only show toast for non-auth errors to avoid spam
                if (!error.message.includes("token") && !error.message.includes("Unauthorized")) {
                    toast.error(error.message);
                }
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, [authUser]); // Add authUser as dependency

    return { conversations, loading }; // Return conversations and loading state
};

export default useGetConversations;