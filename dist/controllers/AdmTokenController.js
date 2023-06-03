"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _AdministrativeUser = require('../models/AdministrativeUser'); var _AdministrativeUser2 = _interopRequireDefault(_AdministrativeUser);

class AdmTokenController {
  async store(req, res) {
    try {
      const { username = "", password = "" } = req.body;

      if (!username || !password) {
        return res.status(401).json({
          errors: ["Invalid credentials"],
        });
      }

      const admUser = await _AdministrativeUser2.default.findOne({ where: { username } });

      if (!admUser) {
        return res.status(401).json({
          errors: ["Administrative user not found"],
        });
      }

      if (!(await admUser.passwordIsValid(password))) {
        return res.status(401).json({ errors: ["Invalid password"] });
      }

      const { id } = admUser;

      const token = _jsonwebtoken2.default.sign({ id, username }, process.env.TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRATION,
      });

      return res.json({ token });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new AdmTokenController();
