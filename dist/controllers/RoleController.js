"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _Role = require('../models/Role'); var _Role2 = _interopRequireDefault(_Role);

class RoleController {
  async store(req, res) {
    try {
      const role = await _Role2.default.create(req.body);

      return res.status(200).json(role);
    } catch (e) {
      return res
        .status(400)
        .json({ errors: e.errors.map((err) => err.message) });
    }
  }
}
exports. default = new RoleController();
