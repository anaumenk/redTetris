const express = require("express");
const bodyParser = require("body-parser");
const socketIo = require("socket.io");
const http = require("http");
const errorHandler = require("errorhandler");
const database = require('./database');
const config = require('./config');
const autoIncrement = require('mongoose-auto-increment');
const app = express();
const port = config.PORT || 8000;
const models = require('./models');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(errorHandler());
app.use(require("./routes"));
database().then(info => {
  console.log(`Connected to ${info.host}:${info.port}/${info.name}`);
  autoIncrement.initialize(info);
});

const server = http.createServer(app);
const io = socketIo(server);
let rooms = [];
const players = [];

const getRooms = socket => {
  socket.emit("/api/rooms/get/all", rooms);
};

io.sockets.on("connection", socket => {
  console.log("New client connected");
  setInterval(() => getRooms(socket), 1000);
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

const getRoom = (id, name, player) => {
  let inGame = false;
  const room = rooms.find((room) => room.id === id && room.lid.name === name);
  if (room) {
    if (room.status !== "START" && room.multi) {
      player.score = 0;
      room.addPlayer(player);
      inGame = true;
    }
  }
  return inGame;
};

const checkLid = (playerId, token) => !!players.find((player) => player.token === token && player.id === playerId);

const deleteRoom = async (id) => {
  const room = rooms.findIndex((room) => room.id === id);
  if(!rooms[room].lid) {
    await models.Room.remove({_id: id});
    rooms.filter((room) => room.id !== id);
  }
};

const changeLid = async (id) => {
  const room = rooms.findIndex((room) => room.id === id);
  const newLid = rooms[room].players.find((player) => {
    if (player.status === 'game') {
      return player;
    }
  });
  rooms[room].lid = newLid || null;
  const roomBd = await models.Room.findOne({_id: id});
  if(!newLid){
      await models.Room.remove({_id: id});
      rooms = rooms.filter((room) => room.id !== id);
  } else {
      roomBd.lid = String(newLid.id);
      await roomBd.save();
  }
};

const deletePlayer = async(roomId, playerId) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players = rooms[room].players.map((player) => {
    if (player.id === playerId && !rooms[room].status) {
      player.status = 'exit';
    }else if(player.id === playerId && rooms[room].status === "START") {
      player.status = 'delete';
    }
    return player;
});
  return rooms[room];
};

const updateRoomScore = (roomId, playerId, score) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players.forEach((player) => {
    if (player.id === playerId) {
      player.score += score;
    } else {
      player.score -= score;
      if (score > 0) {
        player.indestruct += 1;
      }
    }
  });
  return rooms[room];
};

const stopGame = (roomId) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  if (rooms[room]) {
    rooms[room].players.forEach(async (player) => {
      const scorePlayer = await models.Score.findOne({owner: player.id});
      scorePlayer.score = Number(scorePlayer.score) + Number(player.score);
      await scorePlayer.save();
    });
  }
  return rooms[room];
};

const restartGame = (roomId) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].players = rooms[room].players.filter((player) => player.status === "game");
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

const changeGameMode = (roomId, mode, status) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  rooms[room].mode[mode] = status;
  return rooms[room];
};

const changePlayerField = (roomId, playerId, field) => {
  const room = rooms.findIndex((room) => room.id === roomId);
  const player = rooms[room].players.findIndex((player) => player.id === playerId)
  if (rooms[room].players[player]) {
    rooms[room].players[player].field = field;
  }
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
module.exports.deletePlayer = deletePlayer;
module.exports.changeGameMode = changeGameMode;
module.exports.changePlayerField = changePlayerField;
module.exports.changeLid = changeLid;
module.exports.server = server;
