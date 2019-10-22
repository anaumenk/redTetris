const router = require('express').Router();
const Room = require("../../classes/Room");
const rooms = require("../../index");

router.post('/', (req, res) => {
    const newRoom = new Room(req.body.name, req.body.player);
    rooms.addNewRoom(newRoom);
    res.send(newRoom);
});

module.exports = router;
