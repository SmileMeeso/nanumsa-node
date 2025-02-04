import { Server } from "socket.io";

const port = 3030;
const io = new Server(port, {
    cors: {
        origin: ["http://localhost:5173", "http://127.0.0.1:5050"],
        credentials: true,
        transports: ["websocket"],
    },
    transports: ["websocket"],
});

const clients = {};

io.on("connection", (socket) => {
    socket.on("message", (token) => {
        if (!clients[token]) {
            console.log("new client", token);
            clients[token] = socket;
        } else {
            clients[token].emit("message", token);
        }
    });
});
