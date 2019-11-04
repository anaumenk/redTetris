const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const errorHandler = require("errorhandler");

//del
const Player = require("./classes/Player");
//del

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler());
app.use(require("./routes"));

const server = http.createServer(app);
const io = socketIo(server);
const rooms = [];

//del
const player1 = new Player("1", "1");
const players = [player1];
//del

// uncommit when del
// const players = []

const getMultiRooms = () => {
    return rooms.filter((room) => {
        if (room.multi) {
            return room;
        }
    });
};

const getRooms = async socket => {
    socket.emit("/api/rooms", getMultiRooms());
};

io.on("connection", socket => {
    console.log("New client connected"), setInterval(
          () => getRooms(socket),
          1000
        );
    socket.emit("/api/rooms", getMultiRooms());
    socket.on("disconnect", () => console.log("Client disconnected"));
});

server.listen(port, () => console.log(`Listening on port ${port}`));

const addNewRoom = (newRoom) => {
    rooms.push(newRoom);
};

const addNewPlayer = (player) => {
    players.push(player);
};

const checkToken = (token) => {
    const player = players.filter((player) => player.getToken === token);
    return player.length > 0;
};

const login = (name, password) => {
    return players.filter((player) => {
        if (player.checkLogin(name, password))
            return player
    })[0];
};

const getPlayerInfo = (token) => {
    return players.map((player) => {
        if (player.getToken === token) {
            return player.getInfo;
        }
    })[0];
};

const getRoom = (id, name) => rooms.find((room) => room.id === id && room.player.name === name);

const checkLid = (playerId, token) => !!players
  .find((player) => player.token === token && player.id === playerId);

module.exports.addNewRoom = addNewRoom;
module.exports.checkToken = checkToken;
module.exports.addNewPlayer = addNewPlayer;
module.exports.login = login;
module.exports.getPlayerInfo = getPlayerInfo;
module.exports.getRoom = getRoom;
module.exports.checkLid = checkLid;
