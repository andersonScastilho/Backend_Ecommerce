"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AdministrativeUser = require('../models/AdministrativeUser'); var _AdministrativeUser2 = _interopRequireDefault(_AdministrativeUser);
var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

class AdministrativeUserController {
  async store(req, res) {
    try {
      const { role_id, username, email, fullname, password } = req.body;

      if (!role_id) {
        return res.status(400).json({ error: ["Role is required"] });
      }

      const role = await _Role2.default.findByPk(role_id, {
        attributes: ["role"],
      });

      if (!role) {
        return res.status(400).json({
          errors: ['Role not found']
        })
      }

      const verifyEmail = await _AdministrativeUser2.default.findOne({
        where: {
          email,
        },
      });

      if (verifyEmail) {
        return res.status(401).json({ erros: ["E-mail in use"] });
      }

      const verifyUsername = await _AdministrativeUser2.default.findOne({
        where: {
          username,
        },
      });

      if (verifyUsername) {
        return res.status(401).json({ erros: ["Username in use"] });
      }

      const admUser = await _AdministrativeUser2.default.create({
        fullname,
        role_id,
        email,
        username,
        password
      },);

      return res.status(200).json({
        username,
        fullname,
        email,
        role
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
  async show(req, res) {
    try {
      const id = req.admUser_id;

      const admUser = await _AdministrativeUser2.default.findByPk(id, {
        attributes: ["username", "fullname", "email"],
        include: {
          attributes: ["role"],
          model: _Role2.default,
        },
      });

      if (!admUser) {
        return res.status(400).json({
          errors: ["Administrativer user not found"],
        });
      }

      return res.status(200).json(admUser);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new AdministrativeUserController();
