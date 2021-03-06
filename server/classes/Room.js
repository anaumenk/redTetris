const index = require("../index");

class Room {
  constructor(name, lid, multi, id) {
    this.id = id;
    this.name = name;
    this.lid = lid;
    this.players = [
      {
        id: lid.id,
        name: lid.name,
        score: 0,
        status: 'game',
        field: [],
        indestruct: 0
      }
    ];
    this.multi = multi;
    this.status = null;
    this.mode = {
      rotation: true,
      inverted: false,
    };
  }

  addPlayer(player) {
    if (this.newPlayerId(player.id)) {
      this.players = [
        ...this.players,
        {
          id: player.id,
          name: player.name,
          score: 0,
          status: 'game',
          field: [],
          indestruct: 0
        }
      ];
    } else {
      this.players.forEach((oldPlayer) => {
        if (oldPlayer.id === player.id) {
          oldPlayer.status = "game";
          oldPlayer.field = [];
          oldPlayer.indestruct = 0;
        }
      });
    }
  }

  newPlayerId(id) {
    return !this.players.find((player) => player.id === id);
  }
}

module.exports = Room;
