const router = require('express').Router();
const Player = require("../../classes/Player");
const index = require("../../index");

router.post('/token', (req, res) => {
  const data = {player: index.checkToken(req.body.token)};
  res.send(data);
});

router.post('/register', (req, res) => {
  const { name, password } = req.body;
  const player = new Player(name, password);
  index.addNewPlayer(player);
  res.send({ token: player.getToken });
});

router.post('/login', (req, res) => {
  const { name, password } = req.body;
  const player = index.login(name, password);
  const data = player ? { token: player.getToken } : { error: "No such user." };
  res.send(data);
});

module.exports = router;
