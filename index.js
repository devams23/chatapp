import express from "express";
import { Server } from "socket.io";
import http from "http";

const app = express();
const server = http.createServer(app);
const io = new Server(server);
const port = 3000;

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile("index.html");
});
io.on("connection", (socket) => {
  console.log(`A new user connected with id : ${socket.id}`);
  socket.on("user-msg", (message) => {
    console.log(message);
    io.emit("message" , message);
  });
});
server.listen(port, () => {
  console.log("http://localhost:3000/");
});
