"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _jsonwebtoken = require('jsonwebtoken'); var _jsonwebtoken2 = _interopRequireDefault(_jsonwebtoken);

var _AdministrativeUser = require('../models/AdministrativeUser'); var _AdministrativeUser2 = _interopRequireDefault(_AdministrativeUser);

exports. default = async (req, res, next) => {
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ errors: ["Login required"] });
  }
  const [, token] = authorization.split(" ");

  try {
    const dados = _jsonwebtoken2.default.verify(token, process.env.TOKEN_SECRET);
    const { id, username } = dados;

    const admUser = await _AdministrativeUser2.default.findOne({
      where: {
        id,
        username,
      },
    });

    if (!admUser) {
      return res.status(401).json({ errors: ["Invalid user"] });
    }

    req.admUser_id = id;
    req.admUser_username = username;

    return next();
  } catch (e) {
    return res.status(401).json({ errors: ["Token expired or invalid"] });
  }
};
