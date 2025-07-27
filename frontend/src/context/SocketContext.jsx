
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

		console.log("🔍 AuthContext - authUser:", authUser);
		console.log("🔍 AuthContext - authUser._id:", authUser?._id);

		if (authUser && authUser._id) {
			console.log("🚀 Creating socket connection for user:", authUser._id);
			
			socketInstance = io("http://localhost:5000", {
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
			});

			socketInstance.on("disconnect", () => {
				console.log("🔌 Socket disconnected");
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
