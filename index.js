import { Server } from "socket.io";

const port = 3000;

const io = new Server(port, {
    cors: {
        origin: ["http://www.nanumsa.com/"],
        credentials: true,
        transports: ["websocket", "polling"],
    },
    transports: ["websocket", "polling"],
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
