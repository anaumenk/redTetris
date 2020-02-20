const router = require('express').Router();
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
  console.log('/token: ' + player);
  if (player) {
    response.data = { player }
  } else {
    response.error = "No such user."
  }
  res.send(response);
});

router.post('/register', async (req, res) => {
  let { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  if (typeof(name) === "undefined" || typeof(password) === "undefined"){
    response.error = 'Name or password is empty';
    res.status(400);
  } else if (/^([A-Za-z0-9_\-\.])/.test(name) === false) {
    response.error = 'Login uncorrect';
    res.status(400);
  } else if (/^([A-Za-z0-9_\-\.])/.test(password) === false){
    response.error = 'Password uncorrect';
    res.status(400);
  } else {
    try {
      const checkPlayer = await models.User.findOne({name: name});
      if(checkPlayer){
        response.error = 'User already exist';
        res.status(400);
      } else {
        const player = await models.User.create({name: name, password: password});
        await models.Score.create({owner: player.id});
        response.data = { name: player.name, token: player.token };
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }
  res.send(response);
});

router.post('/login', async (req, res) => {
  const { name, password } = req.body;
  const response = {
    data: null,
    error: null
  };
  if (typeof(name) === "undefined" || typeof(password) === "undefined"){
    response.error = 'Name or password is empty';
    res.status(400);
  } else {
    try {
      const player = await models.User.findOne({name: name});
      if(!player || !bcrypt.compareSync(password, player.password)) {
        response.error = "No such user or wrong password.";
        res.status(400);
      } else {
        response.data = { name: player.name, token: player.token };
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }
  res.send(response);
});

router.post('/info', async (req, res) => {
  const token = req.body.token;
  const response = {
    data: null,
    error: null
  };
  
  if (typeof(token) === "undefined" || !token){
    response.error = 'Token undefined';
    res.status(400);
  } else {
    try {
      const user = await models.User.findOne({token: token});
      let score = await models.Score.findOne({owner: user.id});
      if(!user) {
        response.error = "Something went wrong.";
        res.status(400);
      } else if(!score) {
        score = await models.Score.create({owner: user.id});
      } else {
        const player = {name: user.name, score: score.score};
        response.data = {player};
      }
    } catch (error) {
        response.error = 'Server error';
        res.status(404);
    }
  }
  res.send(response);
});

module.exports = router;
