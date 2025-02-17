import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://www.nanumsa.com"],
        methods: ["GET", "POST", "OPTIONS"],
        credentials: true,
        transports: ["websocket"],
    },
    transports: ["websocket"],
});

const clients = {};

io.on("connection", (socket) => {
    console.log("connection established.");

    socket.on("message", (token) => {
        if (!clients[token]) {
            console.log("new client", token);
            clients[token] = socket;
        } else {
            clients[token].emit("message", token);
        }
    });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
