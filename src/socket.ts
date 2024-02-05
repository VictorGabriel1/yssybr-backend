import { Server } from "socket.io";
import { getProcesses } from "./utils/getProcesses";

const io = new Server(8000, {
  transports: ["websocket", "polling"],
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});

io.on("connect", async (socket) => {
  console.log("User connected! ", socket.id);

  getProcesses(socket);

  socket.on("disconnect", async () => {
    console.log("User diconnected!", socket.id);
  });
});
