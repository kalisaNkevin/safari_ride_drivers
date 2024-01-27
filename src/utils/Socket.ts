import io from "socket.io-client";

const socket = io("https://safari-ride-production.up.railway.app");

socket.on("connect", () => {
  console.log("Connected to the Socket.IO server!");
});
socket.on("connect_error", (error) => {
  console.error("Connection to the Socket.IO server failed:⚠", error);
});
socket.on("disconnect", () => {
  console.log("Disconnected from the Socket.IO server!");
});

export default socket;
