"use client"; // Ensure it's only used on the client side

import { useEffect, useState } from "react";
import { io } from "socket.io-client";

const SOCKET_SERVER_URL =
  process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5000";

export function useSocket(userId) {
  const [socket, setSocket] = useState(null);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!userId) return;

    const newSocket = io(SOCKET_SERVER_URL, {
      withCredentials: true,
      transports: ["websocket"], // Force WebSocket only
    });

    setSocket(newSocket);

    // Log successful connection
    newSocket.on("connect", () => {
      console.log("Connected to socket:", newSocket.id);
      newSocket.emit("login", { userId });
    });

    // Log connection errors
    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    // Log other socket errors
    newSocket.on("error", (error) => {
      console.error("Socket error:", error);
    });

    // Listen for new notifications
    newSocket.on("newNotification", (data) => {
      console.log("Received notification:", data);
      setNotifications((prev) => [...prev, data]);
    });

    return () => {
      newSocket.disconnect();
    };
  }, [userId]);

  return { socket, notifications };
}
