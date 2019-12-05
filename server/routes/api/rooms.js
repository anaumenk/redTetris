const router = require('express').Router();
const Room = require("../../classes/Room");
const index = require("../../index");

router.post('/', (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const newRoom = new Room(req.body.name, token, req.body.multi);
    index.addNewRoom(newRoom);
    response.data = newRoom;
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/lid', (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const room = index.getRoom(req.body.id, req.body.name, token);
    if (room) {
      response.data = {};
      response.data.lid = index.checkLid(room.lid.id, token)
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/delete/player', (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const room = index.stopGame(roomId);
    if (room) {
      response.data = {};
        const playerInfo = index.getPlayerInfo(token);
        const newRoom = index.deletePlayer(roomId, playerInfo.id);
        if (!newRoom.players) {
          index.deleteRoom(roomId);
        }
        response.data.room = newRoom;
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/score', (req, res) => {
  const token = req.body.token;
  const score = req.body.score;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const player = index.getPlayerInfo(token);
    if (player) {
      response.data = {};
      const room = index.updateRoomScore(roomId, player.id, score);
      if (room) {
        response.data.room = room;
      } else {
        response.error = "Score update error."
      }
    } else {
      response.error = "No such player."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/stop', (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const room = index.stopGame(roomId);
    if (room) {
      response.data = {};
      response.data.room = room;
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/status', (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const status = req.body.status;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const room = index.setGameStatus(roomId, status);
    response.data = {};
    response.data.status = room.status;
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/restart', (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    const players = index.restartGame(roomId);
    if (players) {
      response.data = {};
      response.data.players = players;
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

module.exports = router;
