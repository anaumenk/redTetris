class Room {
    constructor(name, player) {
        this.id = Room.incrementId();
        this.name = name;
        this.player = player;
    }

    static incrementId() {
        if (!this.latestId) {
            this.latestId = 1;
        } else {
            this.latestId++;
        }
        return this.latestId;
    }

    // get info() {
    //     return {
    //         id: this.id,
    //         name: this.name
    //     };
    // }
}

module.exports = Room;
