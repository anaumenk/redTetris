const index = require("../index");

class Room {
    constructor(name, token, multi) {
        this.id = Room.incrementId();
        this.name = name;
        this.player = index.getPlayerInfo(token);
        this.multi = multi;
    }

    static incrementId() {
        if (!this.latestId) {
            this.latestId = 1;
        } else {
            this.latestId++;
        }
        return this.latestId;
    }
}

module.exports = Room;
