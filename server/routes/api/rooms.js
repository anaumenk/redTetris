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

router.post('/room', (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  if (index.checkToken(token)) {
    response.data = {};
    const room = index.getRoom(req.body.id, req.body.name, token);
    if (room) {
      response.data.room = room;
      response.data.lid = index.checkLid(room.lid.id, token)
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/delete', (req) => {
  const token = req.body.token;
  if (index.checkToken(token)) {
    const room = index.getRoom(req.body.id, req.body.name, token);
    if (room) {
      index.deleteRoom(req.body.id);
    }
  }
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
    response.data = {};
    const player = index.getPlayerInfo(token);
    const newRoom = index.updateRoomScore(roomId, player.id, score);
    if (newRoom) {
      response.data.room = newRoom;
    } else {
      response.error = "Update score error."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

module.exports = router;
