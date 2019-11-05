const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

class Player {
  constructor(name, password) {
    this.id = Player.incrementId();
    this.name = name;
    this.password = bcrypt.hashSync(password, 10);
    this.token = jwt.sign({id: this.id}, "SECRET");
    this.score = 0;
  }

  static incrementId() {
    if (!this.latestId) {
      this.latestId = 1;
    } else {
      this.latestId++;
    }
    return this.latestId;
  }

  get getToken() {
      return this.token;
  }
  get getInfo() {
      return {
        id: this.id,
        name: this.name,
        score: this.score,
      };
  }

  checkLogin(name, password) {
    return this.name === name && bcrypt.compareSync(password, this.password);
  }
}

module.exports = Player;
