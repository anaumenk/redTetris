const expect = require('expect');
const request = require('supertest');
const {ObjectId} = require('mongodb');

const app = require('../index.js').server;
const models = require('../models');
const existUser = require('./player.test').regPlayer;
let newRoom = {
    token: '',
    name: '',
    multi: true,
};
let roomId = '';

  before(async () => {
    await models.Room.remove({});
  });

  describe('POST /', async() => { // 1
    it('Create a new room', (done) => {
        newRoom.token = existUser.token;
        newRoom.name = "newRoomTest";
      request(app) // 3
        .post('/api/rooms/')
        .send(newRoom)
        .expect(200)
        .expect((res) => {
            expect(res.body.data.name).toBe(newRoom.name);
            newRoom.id = roomId = res.body.data.id;
        })
        .end((err, res) => { // 4
          if (err)
            return done(err);

          models.Room.find({name: newRoom.name}).then(rooms => {
            expect(rooms.length).toBe(1);
            expect(rooms[0].name).toBe(newRoom.name);
            done();
          }).catch((e) => done(e))
        })
    })

    it('Create a new room without name', (done) => {

        let testRoomName = {
            token: existUser.token,
            name: '',
            multi: true,
        };

      request(app) // 7
        .post('/api/rooms/')
        .send(testRoomName)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Create a new room without multi', (done) => {

        let testRoomMulti = {
            token: existUser.token,
            name: 'roomTest2',
            multi: '',
        };

      request(app) // 7
        .post('/api/rooms/')
        .send(testRoomMulti)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Create a new room without token', (done) => {

        let testRoomToken = {
            token: '',
            name: 'roomTest2',
            multi: true,
        };

      request(app) // 7
        .post('/api/rooms/')
        .send(testRoomToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Create a new room with not exist token', (done) => {

        let testRoomToken = {
            token: 'deqwewqeqw',
            name: 'roomTest2',
            multi: true,
        };

      request(app) // 7
        .post('/api/rooms/')
        .send(testRoomToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Create a new room with duplicate name', (done) => {

        let testRoomDup = {
            token: existUser.token,
            name: 'newRoomTest',
            multi: true,
        };

      request(app) // 7
        .post('/api/rooms/')
        .send(testRoomDup)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })



  describe('POST /lid', async() => { // 1
    it('Check lid a created room', (done) => {
        newRoom.name = existUser.name;
      request(app) // 3
        .post('/api/rooms/lid')
        .send(newRoom)
        .expect(200)
        .expect((res) => {
            expect(res.body.data.lid).toBe(true);
        })
        .end((err, res) => { // 4
          if (err)
            return done(err);
          models.Room.find({_id: newRoom.id}).then(rooms => {
            expect(rooms.length).toBe(1);
            done();
          }).catch((e) => done(e))
        })
    })

    it('Cheak lid without name', (done) => {

        let testRoomLidName = {
            token: existUser.token,
            name: '',
            multi: true,
            id: roomId
        };

      request(app) // 7
        .post('/api/rooms/lid')
        .send(testRoomLidName)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Cheak lid without id', (done) => {

        let testRoomLidName = {
            token: existUser.token,
            name: existUser.name,
            multi: true,
            id: ''
        };

      request(app) // 7
        .post('/api/rooms/lid')
        .send(testRoomLidName)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Cheak lid without token', (done) => {

        let testRoomLidToken = {
            token: "",
            name: existUser.name,
            multi: true,
            id: roomId
        };

      request(app) // 7
        .post('/api/rooms/lid')
        .send(testRoomLidToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Cheak lid with not exist token', (done) => {

        let testRoomLidToken = {
            token: "eqweqwqw",
            name: existUser.name,
            multi: true,
            id: roomId
        };

      request(app) // 7
        .post('/api/rooms/lid')
        .send(testRoomLidToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Cheak lid with not exist roomId or uncorrect', (done) => {

        let testRoomLidToken = {
            token: existUser.token,
            name: existUser.name,
            multi: true,
            id: 100
        };

      request(app) // 7
        .post('/api/rooms/lid')
        .send(testRoomLidToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })

  describe('POST /score', async() => { // 1
    it('Check add score player in a room', (done) => {
      let sendObj = {
        token: existUser.token,
        score: 10,
        roomId: roomId
      };
      request(app) // 3
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
        done();
        })
    })

    it('Check score bad token', (done) => {

      let sendObj = {
        token: "existUser.token",
        score: 10,
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check score without room id', (done) => {

      let sendObj = {
        token: existUser.token,
        score: 10,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check score without token', (done) => {

      let sendObj = {
        token: '',
        score: 10,
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check score without score', (done) => {

      let sendObj = {
        token: existUser.token,
        score: '',
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check score with not exist roomId', (done) => {

      let sendObj = {
        token: existUser.token,
        score: 10,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/score')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })

  describe('POST /stop', async() => { // 1
    it('Check stop player in a room', (done) => {
      let sendObj = {
        token: existUser.token,
        roomId: roomId
      };
      request(app) // 3
        .post('/api/rooms/stop')
        .send(sendObj)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();
        })
    })

    it('Check stop bad token', (done) => {

      let sendObj = {
        token: "existUser.token",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/stop')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check stop without room id', (done) => {

      let sendObj = {
        token: existUser.token,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/stop')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check stop without token', (done) => {

      let sendObj = {
        token: '',
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/stop')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check stop with not exist room Id', (done) => {

      let sendObj = {
        token: existUser.token,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/stop')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })



  describe('POST /restart', async() => { // 1
    it('Check restart player in a room', (done) => {
      let sendObj = {
        token: existUser.token,
        roomId: roomId
      };
      request(app) // 3
        .post('/api/rooms/restart')
        .send(sendObj)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();
        })
    })

    it('Check restart bad token', (done) => {

      let sendObj = {
        token: "existUser.token",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/restart')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check restart without room id', (done) => {

      let sendObj = {
        token: existUser.token,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/restart')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check restart without token', (done) => {

      let sendObj = {
        token: '',
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/restart')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check restart with not exist room Id', (done) => {

      let sendObj = {
        token: existUser.token,
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/restart')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })



  describe('POST /status', async() => { // 1
    it('Check status room', (done) => {
      let sendObj = {
        token: existUser.token,
        status: "START",
        roomId: roomId
      };
      request(app) // 3
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();
        })
    })

    it('Check status bad token', (done) => {

      let sendObj = {
        token: "existUser.token",
        status: "START",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check status without room id', (done) => {

      let sendObj = {
        token: existUser.token,
        status: "START",
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check status without token', (done) => {

      let sendObj = {
        token: '',
        status: "START",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check status with not exist roomId', (done) => {

      let sendObj = {
        token: existUser.token,
        status: "START",
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check status without status', (done) => {

      let sendObj = {
        token: existUser.token,
        status: '',
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/status')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })


  describe('POST /mode', async() => { // 1
    it('Check mode room', (done) => {
      let sendObj = {
        token: existUser.token,
        status: true,
        mode: "inverted",
        roomId: roomId
      };
      request(app) // 3
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
          done();
        })
    })

    it('Check mode bad token', (done) => {

      let sendObj = {
        token: "existUser.token",
        status: true,
        mode: "inverted",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check mode without room id', (done) => {

      let sendObj = {
        token: existUser.token,
        status: true,
        mode: "inverted",
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check mode without token', (done) => {

      let sendObj = {
        token: '',
        status: true,
        mode: "inverted",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check mode with not exist roomId', (done) => {

      let sendObj = {
        token: existUser.token,
        status: true,
        mode: "inverted",
        roomId: ''
      };

      request(app) // 7
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check mode without mode', (done) => {

      let sendObj = {
        token: existUser.token,
        status: true,
        mode: "",
        roomId: roomId
      };

      request(app) // 7
        .post('/api/rooms/mode')
        .send(sendObj)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })


  describe('POST /delete/player', async() => { // 1
    it('Check delete player in a room', (done) => {
      newRoom.roomId = roomId;
      request(app) // 3
        .post('/api/rooms/delete/player')
        .send(newRoom)
        .expect(200)
        .end((err, res) => { // 4
          if (err)
            return done(err);
        done();
        })
    })

    it('Check delete player bad token', (done) => {

        let testRoomLidName = {
            token: 'existUser.token',
            roomId: roomId
        };

      request(app) // 7
        .post('/api/rooms/delete/player')
        .send(testRoomLidName)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check delete player without id', (done) => {

        let testRoomLidName = {
            token: existUser.token,
            roomId: ''
        };

      request(app) // 7
        .post('/api/rooms/delete/player')
        .send(testRoomLidName)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

    it('Check delete player without token', (done) => {

        let testRoomLidToken = {
            token: '',
            roomId: roomId
        };

      request(app) // 7
        .post('/api/rooms/delete/player')
        .send(testRoomLidToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })


    it('Check delete player with not exist roomId or uncorrect', (done) => {

        let testRoomLidToken = {
            token: existUser.token,
            roomId: 100
        };

      request(app) // 7
        .post('/api/rooms/delete/player')
        .send(testRoomLidToken)
        .expect(400)
        .end((err, res) => {
          if (err)
            return done(err)
          done();
        })
    })

  })
