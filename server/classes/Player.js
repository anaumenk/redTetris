const jwt = require('jsonwebtoken');

class Player {
  constructor(name) {
    this.id = Player.incrementId();
    this.name = name;
    this.token = jwt.sign({id: this.id}, "SECRET");
  }

  static incrementId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }

  get token() {
      return {
          token: this.token,
      };
  }
}

module.exports = Player;
