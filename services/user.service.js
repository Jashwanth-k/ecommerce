const db = require("../models/index");

class UserService {
  constructor() {
    this.schema = db.user;
  }

  createUser(user) {
    return this.schema.create(user);
  }

  findUserByEmail(email) {
    return this.schema.findOne({
      where: {
        email: email.toLowerCase(),
      },
    });
  }
}

const userService = new UserService();
module.exports = {
  userService,
};
