const router = require('express').Router();
const Player = require("../../classes/Player");
const index = require("../../index");

router.post('/token', (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  const player = index.checkToken(token);
  if (player) {
    response.data = { player }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/register', (req, res) => {
  const { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  const player = new Player(name, password);
  index.addNewPlayer(player);
  response.data = { token: player.getToken };
  res.send(response);
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  const player = index.login(name, password);
  if (player) {
    response.data = { token: player.getToken }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/info', (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  const player = index.getPlayerInfo(token);
  if (player) {
    response.data = { player }
  } else {
    response.error = "Something went wrong."
  }
  res.send(response);
});

module.exports = router;
