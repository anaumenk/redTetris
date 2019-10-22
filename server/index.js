const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const errorHandler = require("errorhandler");

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler());
app.use(require("./routes"));

const server = http.createServer(app);
const io = socketIo(server);
const rooms = [];

const getRooms = async socket => {
    socket.emit("/api/rooms", rooms);
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
          () => getRooms(socket),
          1000
        );
    socket.emit("/api/rooms", rooms);
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const addNewRoom = (newRoom) => {
    rooms.push(newRoom);
};

module.exports.addNewRoom = addNewRoom;
