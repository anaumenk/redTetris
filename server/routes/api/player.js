const router = require('express').Router();
const Player = require("../../classes/Player");
const index = require("../../index");
const models = require('../../models');
const bcrypt = require('bcrypt');

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

router.post('/register', async (req, res) => {
  const { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  try {
    const player = await models.User.create({name: name, password: password});
    if (player){
      await models.Score.create({owner: player.id});
      response.data = { token: player.token };
    }
  } catch (error) {
     response.error = error;
  }
  res.send(response);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  const player = await models.User.findOne({name: name});
  if(player){
    if(bcrypt.compareSync(password, player.password)){
      response.data = { token: player.token };
    }else{
      response.error = "No such user or wrong password.";
    }
  }else{
    response.error = "No such user or wrong password.";
  }
  res.send(response);
});

router.post('/info', async (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  const user = await models.User.findOne({token: token});
  const score = await models.Score.findOne({owner: user.id});
  let player = {name: user.name, score: score.score};
  console.log(player);
  if (player) {
    response.data = {player};
  } else {
    response.error = "Something went wrong.";
  }
  res.send(response);
});

module.exports = router;
