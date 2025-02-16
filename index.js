import { Server } from "socket.io";
import { createServer } from "http";
import express from "express";
import morgan from "morgan";

const app = express();
const server = createServer(app);

const io = new Server(server, {
    cors: {
        origin: ["https://www.nanumsa.com", "172.31.3.54"],
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
        credentials: false,
        transports: ["websocket"],
        allowedHeaders: ["*"],
    },
    transports: ["websocket"],
});

app.use(morgan("combined"));

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

// 포트 번호와 서버 시작
const PORT = process.env.PORT || 3000; // 원하는 포트 번호
server.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
});
