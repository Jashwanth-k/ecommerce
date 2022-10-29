let { userService } = require("./user.service");
let { roleService } = require("./role.service");
const config = require("../configs/config");
const db = require("../models");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

class AuthService {
  async signUp(user, roleNames = ["user"]) {
    user.email = user.email.toLowerCase();
    user.password = bcrypt.hashSync(user.password, 8);
    try {
      // promise returned with roles associated with roleNames
      const roleRes = await roleService.findRolesByName(roleNames);
      if (roleRes.length !== roleNames.length)
        throw new Error("invalid role name");

      // creates user and returns a promise
      const userRes = await userService.createUser(user);
      userRes.setRoles(roleRes);
    } catch (err) {
      throw err;
    }
  }

  async signIn(user) {
    try {
      const userRes = await userService.findUserByEmail(user.email);
      if (!userRes) throw new Error("incorrect email");
      // compares password with encrypted password in db and returns true if matches
      if (!bcrypt.compareSync(user.password, userRes.password))
        throw new Error("incorrect password");

      const token = jwt.sign(
        { id: userRes.id, email: userRes.email },
        config.SECRET,
        {
          expiresIn: config.EXPIRES_IN,
        }
      );
      return {
        id: userRes.id,
        email: userRes.email,
        token: token,
      };
    } catch (err) {
      throw err;
    }
  }
}

const authService = new AuthService();
module.exports = {
  authService,
};

// userService.createUser(user).then((user) => {
//   roleService
//     .findRolesByName(roleNames)
//     .then((roles) => {
//       user.setRoles(roles);
//     })
//     .catch((err) =>
//       Promise.reject(`err while creating user in auth: ${err}`)
//     );
// });
