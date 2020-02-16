const router = require('express').Router();
const Room = require("../../classes/Room");
const index = require("../../index");
const models = require('../../models');

router.post('/', async (req, res) => {
  const token = req.body.token;
  const roomName = req.body.name;
  const roomMulti = req.body.multi;
  const response = {
    data: null,
    error: null
  };
  if (!token){
    response.error = 'Token undefined';
    res.status(400);
  } else if (!roomName){
    response.error = 'Room name undefined';
    res.status(400);
  } else if (!roomMulti){
    response.error = 'Room multi undefined';
    res.status(400);
  } else {
    try {
      const player = await models.User.findOne({token: token});
      const existRoom = await models.Room.findOne({name: roomName});
      if(!player) {
        response.error = "No such user"
        res.status(400);
      } else if (existRoom){
        response.error = "Room already exist"
        res.status(400);
      } else {
        const roomDb = await models.Room.create({name: roomName, lid: player.id});
        const newRoom = new Room(roomName, player, roomMulti, Number(roomDb.id));
        index.addNewRoom(newRoom);
        response.data = newRoom;
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }
  res.send(response);
});

router.post('/lid', async (req, res) => {
  const token = req.body.token;
  const playerName = req.body.name;
  const roomId = req.body.id;
  let lid = false;
  const response = {
    data: null,
    error: null
  };
  if (typeof(token) === "undefined" || !token){
    response.error = 'Token undefined';
    res.status(400);
  } else if (!playerName){
    response.error = 'Palyer name undefined';
    res.status(400);
  } else if (!roomId){
    response.error = 'Room id undefined';
    res.status(400);
  } else {
    try {
      const player = await models.User.findOne({token: token});
      const existRoom = await models.Room.findOne({_id: roomId});
      if(!player) {
        response.error = "No such user";
        res.status(400);
      } else if (!existRoom){
        response.error = "No such room";
        res.status(406);
      } else {
        if(String(existRoom.lid) === player.id){
          lid = true;
        }
        index.getRoom(roomId, playerName, player);
        response.data = {};
        response.data.lid = lid;
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }
  // const player = await models.User.findOne({token: token});
  // if (player) {
  //   if(await models.Room.findOne({lid: player.id}))
  //     lid = true;
  //   const room = index.getRoom(req.body.id, req.body.name, player);
  //   if (room) {
  //     response.data = {};
  //     response.data.lid = lid;
  //   } else {
  //     response.error = "No such room."
  //   }
  // } else {
  //   response.error = "No such user."
  // }
  res.send(response);
});

router.post('/delete/player', async(req, res) => {
  const token = req.body.token;
  const roomId = req.body.roomId;
  const response = {
    data: null,
    error: null
  };

  if (typeof(token) === "undefined" || !token){
    response.error = 'Token undefined';
    res.status(400);
  } else if (!roomId) {
    response.error = 'Room id undefined';
    res.status(400);
  } else {
    try {
      const player = await models.User.findOne({token: token});
      const existRoom = await models.Room.findOne({_id: roomId});
      if(!player) {
        response.error = "No such user";
        res.status(400);
      } else if (!existRoom){
        response.error = "No such room";
        res.status(406);
      } else {
        const room = index.stopGame(roomId);
        const newRoom = index.deletePlayer(roomId, player.id);
        if (room.status) {index.setGameStatus(roomId, 'STOP');}
        if (String(existRoom.lid) === player.id) { index.deleteRoom(roomId);}
        response.data = {};
        response.data.room = newRoom;
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }

  // const player = await models.User.findOne({token: token});
  // if (player) {
  //   const room = index.stopGame(roomId);
  //   console.log("tytroom: "+room);
  //   if (room) {
  //     if (room.status) {
  //       index.setGameStatus(roomId, 'STOP');
  //     }
  //     response.data = {};
  //       const newRoom = index.deletePlayer(roomId, player.id);
  //       console.log("newRoom:" + newRoom.players);
  //       if (await models.Room.findOne({lid: player.id})) {
  //         console.log('delete:' + await models.Room.deleteOne({_id: roomId}));
  //         index.deleteRoom(roomId);
  //       }
  //       response.data.room = newRoom;
  //   } else {
  //     response.error = "No such room."
  //   }
  // } else {
  //   response.error = "No such user."
  // }
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
