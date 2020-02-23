const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const app = require('../index.js').server;
const models = require('../models');
let regPlayer = {name: "test", password: "test"};


const users = [{
    name: "FirstTest",
    password: "lol"
  }, {
    name: "SecondTest",
    password: "fuck"
}];

  before(async () => {
    await models.User.remove({});
    await models.Score.remove({});
    users.forEach(async user => {
        const player = await models.User.create(user);
        await models.Score.create({owner: player.id});
    });
  });

  describe('POST /register', async() => { // 1
    it('should register a new user', (done) => {

      request(app) // 3
        .post('/api/player/register')
        .send(regPlayer)
        .expect(200)
        .expect((res) => {
            expect(res.body.data.name).toBe(regPlayer.name);
            regPlayer.token = res.body.data.token;
        })
        .end((err, res) => { // 4
          if (err)
            return done(err);

          models.User.find({name: regPlayer.name}).then(users => {
            expect(users.length).toBe(1);
            expect(users[0].name).toBe(regPlayer.name);
            expect(users[0].token).toBe(regPlayer.token);
            done();
          }).catch((e) => done(e))
        })
    })

    it('should not register a new user with buzy body data', (done) => { // 6

      request(app) // 7
        .post('/api/player/register')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Create user already exist', (done) => {

      request(app) // 7
        .post('/api/player/register')
        .send(regPlayer)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Unvalid login', (done) => {

      let user = {login: 'Вася', password: 'qwersfa'};

      request(app) // 7
        .post('/api/player/register')
        .send(user)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })
  })

  describe('POST /login', async() => { // 1
    it('should login a registered user', (done) => {
      let logPlayer = {name: "test", password: "test"}; // 2

      request(app) // 3
        .post('/api/player/login')
        .send(logPlayer)
        .expect(200)
        .expect((res) => {
            expect(res.body.data.token).toBe(regPlayer.token);
        })
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();
        })
        })

        it('Empty login', (done) => {
          let logPlayer = {name: "", password: "test"};

          request(app) // 7
            .post('/api/player/login')
            .send(logPlayer)
            .expect(400)
            .end((err, res) => {
              if (err)
                return done(err)
              done();
            })
        })

        it('Empty password', (done) => {
          let logPlayer = {name: "test", password: ""};

          request(app) // 7
            .post('/api/player/login')
            .send(logPlayer)
            .expect(400)
            .end((err, res) => {
              if (err)
                return done(err)
              done();
            })
        })

        it('No such user', (done) => {
          let logPlayer = {name: "rewfdsvs", password: "test"};

          request(app) // 7
            .post('/api/player/login')
            .send(logPlayer)
            .expect(400)
            .end((err, res) => {
              if (err)
                return done(err)
              done();
            })
        })

        it('No such password', (done) => {
          let logPlayer = {name: "test", password: "ewqdsxdc"};

          request(app) // 7
            .post('/api/player/login')
            .send(logPlayer)
            .expect(400)
            .end((err, res) => {
              if (err)
                return done(err)
              done();
            })
        })


    it('should not login with buzy body data', (done) => { // 6

      request(app) // 7
        .post('/api/player/login')
        .send({})
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })
  })

  describe('POST /token', async() => { // 1
    it('Check valid token', (done) => {

      request(app) // 3
        .post('/api/player/token')
        .send(regPlayer)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();

        })
    })

    it('Token undefine', (done) => { // 6

      let token = '';

      request(app) // 7
        .post('/api/player/token')
        .send(token)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Token unvalid', (done) => { // 6

      let token = 'jjjkjhijgfrtd';

      request(app) // 7
        .post('/api/player/token')
        .send(token)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })

  describe('POST /info', async() => { // 1
    it('Return info registered user', (done) => {

      request(app) // 3
        .post('/api/player/info')
        .send(regPlayer)
        .expect(200)
        .expect((res) => {
            expect(res.body.data.player.name).toBe(regPlayer.name);
        })
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();

        })
    })

    it('Token undefine', (done) => { // 6

      let token = '';

      request(app) // 7
        .post('/api/player/login')
        .send(token)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Token unvalid', (done) => { // 6

      let token = 'jjjkjhijgfrtd';

      request(app) // 7
        .post('/api/player/login')
        .send(token)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })

  module.exports.regPlayer = regPlayer;