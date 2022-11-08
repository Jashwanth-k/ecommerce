const config = require("../configs/config");
const jwt = require("jsonwebtoken");

class JwtService {
  createToken(payload) {
    return jwt.sign(payload, config.SECRET, { expiresIn: config.EXPIRES_IN });
  }

  validateToken(token) {
    return jwt.verify(token, config.SECRET);
  }
}

const jwtService = new JwtService();
module.exports = { jwtService };
