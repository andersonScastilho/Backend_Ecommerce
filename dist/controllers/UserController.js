"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);

var _validator = require('validator'); var _validator2 = _interopRequireDefault(_validator);

var _regExp = require('../utils/regExp');

class UserController {
  async store(req, res) {
    try {
      const { name, surname, tel, email, password } = req.body

      const isValidName = _regExp.regExpValidationCharactersFromAToZ.call(void 0, name)
      const isValidSurname = _regExp.regExpValidationCharactersFromAToZ.call(void 0, surname)

      if (!name || !surname || !tel || !email || !password) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }


      if (!isValidName) {
        return res.status(400).json({
          errors: ['Provide a valid name']
        })
      }

      if (!isValidSurname) {
        return res.status(400).json({
          errors: ['Provide a valid surname']
        })
      }

      if (!_validator2.default.isEmail(email)) {
        return res.status(400).json({
          errors: ['Provide a valid email']
        })
      }

      if (!_validator2.default.isMobilePhone(tel)) {
        return res.status(400).json({
          errors: ['Provide a valid number']
        })
      }

      const user = await _User2.default.create({
        name, surname, tel, email, password
      })

      return res.status(200).json({
        email,
        name,
        surname,
      });

    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async update(req, res) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ errors: ["login required"] });
      }

      const user = await _User2.default.findByPk(req.user_id);

      if (!user) {
        return res.status(404).json({ error: ["User not found"] });
      }

      const { email, name, surname, tel } = req.body;

      if (!name && !surname && !tel && !email) {
        return res.status(400).json({
          errors: ['Missing data']
        })
      }

      if (email) {
        if (!_validator2.default.isEmail(email)) {
          return res.status(400).json({
            errors: ['Provide a valid email']
          })
        }
      }

      if (name) {
        const isValidName = _regExp.regExpValidationCharactersFromAToZ.call(void 0, name)
        if (!isValidName) {
          return res.status(400).json({
            errors: ['Provide a valid name']
          })
        }
      }

      if (surname) {
        const isValidSurname = _regExp.regExpValidationCharactersFromAToZ.call(void 0, surname)
        if (!isValidSurname) {
          return res.status(400).json({
            errors: ['Provide a valid surname']
          })
        }
      }

      if (tel) {
        if (!_validator2.default.isMobilePhone(tel)) {
          return res.status(400).json({
            errors: ['Provide a valid tel']
          })
        }
      }

      await user.update({ name, email, surname, tel });

      return res.status(200).json({
        email,
        name,
        surname,
        tel,
      });
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async show(req, res) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ errors: ["login required"] });
      }

      const user = await _User2.default.findByPk(req.user_id, {
        attributes: ["name", "email", "surname", "tel"],
        include: {
          model: _Address2.default,
        },
      });

      if (!user) {
        return res.status(404).json({ error: ["User not found"] });
      }

      return res.status(200).json(user);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }

  async delete(req, res) {
    try {
      if (!req.user_id) {
        return res.status(401).json({ errors: ["login required"] });
      }
      const user = await _User2.default.findByPk(req.user_id);

      if (!user) {
        return res.status(404).json({ errors: ["User not found"] });
      }

      await user.destroy()

      return res.status(200).json({
        message: 'User deleted'
      });

    } catch (e) {
      res.status(400).json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new UserController();
