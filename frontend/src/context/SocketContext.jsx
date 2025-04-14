
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

		if (authUser) {
			socketInstance = io("http://localhost:5000/", {
				path: "/socket.io",
				query: {
					userId: authUser._id,
				},
				transports: ["websocket"], // Use websocket only
				withCredentials: true, // For cookie/session support if needed
			});

			// ✅ Optional debug logs
			socketInstance.on("connect", () => {
				console.log("✅ Connected to socket server:", socketInstance.id);
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
