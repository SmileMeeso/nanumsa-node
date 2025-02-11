import { Server } from "socket.io";

const port = 3000;
const io = new Server(port, {
    cors: {
        origin: ["*"],
        methods: ["GET", "POST", "DELETE", "PATCH", "PUT", "OPTIONS"],
        credentials: true,
        transports: ["websocket"],
        allowedHeaders: ["*"],
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
