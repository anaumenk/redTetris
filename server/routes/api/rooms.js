const router = require('express').Router();
const Room = require("../../classes/Room");
const index = require("../../index");

router.post('/', (req, res) => {
    const newRoom = new Room(req.body.name, req.body.token);
    index.addNewRoom(newRoom);
    res.send(newRoom);
});

module.exports = router;
