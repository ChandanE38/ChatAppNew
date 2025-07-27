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

      console.log("🔑 Login response:", data);

      // Store token separately in localStorage
      localStorage.setItem("token", data.token);

      // Extract user data (without token) for storage
      const userData = {
        _id: data._id,
        fullName: data.fullName,
        username: data.username,
        profilePic: data.profilePic
      };

      console.log("👤 User data to store:", userData);

      // Store user info in localStorage and update auth context
      localStorage.setItem("chat-user", JSON.stringify(userData));
      setAuthUser(userData);

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