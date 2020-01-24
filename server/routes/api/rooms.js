const router = require('express').Router();
const Room = require("../../classes/Room");
const index = require("../../index");
const models = require('../../models');

router.post('/', async (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
    const roomDb = await models.Room.create({name: req.body.name, lid: player.id});
    const newRoom = new Room(req.body.name, player, req.body.multi, Number(roomDb.id));
    index.addNewRoom(newRoom);
    response.data = newRoom;
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/lid', async (req, res) => {
  const token = req.body.token;
  let lid = false;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
    if(await models.Room.findOne({lid: player.id})) lid = true;
    const room = index.getRoom(req.body.id, req.body.name, player);
    if (room) {
      response.data = {};
      console.log(lid);
      response.data.lid = lid;
    } else {
      response.error = "No such room."
    }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/delete/player', async(req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
    const room = index.stopGame(roomId);
    console.log("tytroom: "+room);
    if (room) {
      response.data = {};
        const newRoom = index.deletePlayer(roomId, player.id);
        console.log("newRoom:" + newRoom.players);
        if (newRoom.players.length === 0) {
          console.log('delete:' + await models.Room.deleteOne({_id: roomId}));
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

router.post('/score', async (req, res) => {
  const token = req.body.token;
  const score = req.body.score;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
    response.data = {};
    const room = index.updateRoomScore(roomId, player.id, score);
    if (room) {
      response.data.room = room;
    } else {
      response.error = "Score update error.";
    }
  } else {
    response.error = "No such player.";
  }
  res.send(response);
});

router.post('/stop', async (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
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

router.post('/status', async (req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const status = req.body.status;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
    const room = index.setGameStatus(roomId, status);
    response.data = {};
    response.data.status = room.status;
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/restart', async(req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
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

router.post('/mode', async(req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const mode = req.body.mode;
  const status = req.body.status;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({token: token});
  if (player) {
      const room = index.changeGameMode(roomId, mode, status);
      response.data = {};
      response.data.mode = room.mode;
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

module.exports = router;
