
import { createContext, useState, useEffect, useContext } from "react";
import { useAuthContext } from "./AuthContext";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const useSocketContext = () => {
	return useContext(SocketContext);
};

export const SocketContextProvider = ({ children }) => {
	const [socket, setSocket] = useState(null);
	const [onlineUsers, setOnlineUsers] = useState([]);
	const { authUser } = useAuthContext();

	useEffect(() => {
		let socketInstance;

		if (authUser && authUser._id) {
			console.log("🔌 Initializing socket connection for user:", authUser._id);
			
			// Determine the backend URL based on environment
			const backendUrl = process.env.NODE_ENV === 'production'
				? window.location.origin // In production, use the same origin
				: 'http://localhost:5000'; // In development, use localhost
			
			console.log('🔌 Connecting to socket server at:', backendUrl);
			
			socketInstance = io(backendUrl, {
				query: {
					userId: authUser._id,
				},
				transports: ["websocket", "polling"], // Allow both websocket and polling
				withCredentials: true, // For cookie/session support if needed
			});

			// ✅ Optional debug logs
			socketInstance.on("connect", () => {
				console.log("✅ Connected to socket server:", socketInstance.id);
				console.log("👤 User ID for socket:", authUser._id);
			});

			socketInstance.on("connect_error", (err) => {
				console.error("❌ Socket connection error:", err.message);
				console.error("❌ Socket connection error details:", err);
			});

			socketInstance.on("disconnect", (reason) => {
				console.log("🔌 Socket disconnected, reason:", reason);
			});

			socketInstance.on("getOnlineUsers", (users) => {
				setOnlineUsers(users);
				console.log("🟢 Online users:", users);
			});

			// Add listener for newMessage to test if socket is working
			socketInstance.on("newMessage", (message) => {
				console.log("🎯 Socket received newMessage:", message);
			});

			setSocket(socketInstance);
		} else {
			if (authUser === null) {
				console.log("🚫 User not authenticated, skipping socket connection");
			} else if (authUser && !authUser._id) {
				console.error("❌ AuthUser missing _id field:", authUser);
			} else {
				console.log("⏳ Waiting for user authentication...");
			}
		}

		// Cleanup on unmount or authUser change
		return () => {
			if (socketInstance) {
				socketInstance.disconnect();
			}
			setSocket(null);
			setOnlineUsers([]);
		};
	}, [authUser]);

	return (
		<SocketContext.Provider value={{ socket, onlineUsers }}>
			{children}
		</SocketContext.Provider>
	);
};
