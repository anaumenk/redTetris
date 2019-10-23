const router = require('express').Router();
// const Player = require("../../classes/Player");
const index = require("../../index");

router.post('/token', (req, res) => {
  const data = {player: index.checkToken(req.body.token)};
  res.send(data);
});

module.exports = router;
