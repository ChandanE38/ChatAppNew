
import { useEffect, useState } from "react";
import toast from "react-hot-toast";

const useGetConversations = () => {
    const [conversations, setConversations] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const getConversations = async () => {
            setLoading(true);

            try {
                // Get the token from localStorage
                const token = localStorage.getItem("token");

                const res = await fetch("http://localhost:5000/api/users", {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`, // Fixed template literal syntax
                    },
                });

                console.log("Response:", res);

                const data = await res.json();
                if (data.error) {
                    throw new Error(data.error);
                }
                setConversations(data);
            } catch (error) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        };

        getConversations();
    }, []);

    return { conversations, loading }; // Return conversations and loading state
};

export default useGetConversations;