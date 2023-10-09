// import { io } from "socket.io-client";
const io=require('socket.io-client')

const socket = io("ws://localhost:3001");

// Connect to the server
socket.on("connect", () => {
  console.log("Connected to the server!");
});

// Listen for messages from the server
socket.on("message", (data) => {
  console.log("Received message from the server:", data);
});

// Send a message to the server
socket.emit("message", "Hello from the client!");