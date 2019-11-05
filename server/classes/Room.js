const index = require("../index");

class Room {
  constructor(name, token, multi) {
    this.id = Room.incrementId();
    this.name = name;
    const lid = index.getPlayerInfo(token);
    console.log(lid)
    this.lid = lid;
    this.players = [
      {
        id: lid.id,
        name: lid.name,
        score: 0,
      }
    ];
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

  addPlayer(player) {
    if (this.newPlayerId(player.id)) {
      this.players = [
        ...this.players,
        {
          id: player.id,
          name: player.name,
          score: 0,
        }
      ];
    }
  }

  newPlayerId(id) {
    return !this.players.find((player) => player.id === id);
  }
}

module.exports = Room;
