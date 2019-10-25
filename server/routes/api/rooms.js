const router = require('express').Router();
const Room = require("../../classes/Room");
const index = require("../../index");

router.post('/', (req, res) => {
    const token = req.body.token;
    const response = {
        data: null,
        error: null
    };
    if (index.checkToken(token)) {
        const newRoom = new Room(req.body.name, token, req.body.multi);
        index.addNewRoom(newRoom);
        response.data = newRoom;
    } else {
        response.error = "No such user."
    }
    res.send(response);
});

module.exports = router;
