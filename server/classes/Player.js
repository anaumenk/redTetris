const jwt = require('jsonwebtoken');

class Player {
  constructor(name, password) {
    this.id = Player.incrementId();
    this.name = name;
    this.password = password;

    //del
    this.token = "1";
    //del

    //uncommit ehen del
    // this.token = jwt.sign({id: this.id}, "SECRET");

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
      return { id: this.id, name: this.name };
  }

  checkLogin(name, password) {
    return this.name === name && this.password === password;
  }
}

module.exports = Player;
