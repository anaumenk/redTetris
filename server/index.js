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
let rooms = [];
const players = [];

const getMultiRooms = () => {
  return rooms.filter((room) => {
    if (room.multi && !room.status) {
      return room;
    }
  });
};

const getRooms = socket => {
  socket.emit("/api/rooms/get/multi", getMultiRooms());
};

io.sockets.on("connection", socket => {
  console.log("New client connected");
  setInterval(
    () => {
      getRooms(socket);
      socket.emit("/api/rooms/get/all", rooms);
    },
    1000
  );
  getRooms(socket);
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
  return players.filter((player) => player.getToken === token).length > 0;
};

const login = (name, password) => {
  return players.filter((player) => {
    if (player.checkLogin(name, password))
      return player
  })[0];
};

const getPlayerInfo = (token) => {
  const player = players.find((player) => player.getToken === token);
  return player ? player.getInfo : null;
};

const getPlayerByToken = (token) => players.find((player) => player.getToken === token);

const getRoom = (id, name, token) => {
  const room = rooms.find((room) => room.id === id && room.lid.name === name);
  const player = getPlayerByToken(token);
  if (room) {
    room.addPlayer(player);
  }
  return room;
};

const checkLid = (playerId, token) => !!players.find((player) => player.token === token && player.id === playerId);

const deleteRoom = (id) => {
  rooms = rooms.filter((room) => room.id !== id);
};

const updateRoomScore = (roomId, playerId, score) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players.forEach((player) => {
    if (player.id === playerId) {
      player.score += score;
    } else {
      player.score -= score;
    }
  });
  return rooms[room];
};

const stopGame = (roomId) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players.forEach((player) => {
    players[players.findIndex((p) => p.id === player.id)].updateScore(player.score);
  });
  return rooms[room];
};

const restartGame = (roomId) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players.forEach((player) => {
    player.score = 0;
  });
  return rooms[room].players;
};

const setGameStatus = (roomId, status) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].status = status;
  return rooms[room];
};

module.exports.addNewRoom = addNewRoom;
module.exports.checkToken = checkToken;
module.exports.addNewPlayer = addNewPlayer;
module.exports.login = login;
module.exports.getPlayerInfo = getPlayerInfo;
module.exports.getRoom = getRoom;
module.exports.checkLid = checkLid;
module.exports.deleteRoom = deleteRoom;
module.exports.updateRoomScore = updateRoomScore;
module.exports.stopGame = stopGame;
module.exports.setGameStatus = setGameStatus;
module.exports.restartGame = restartGame;
