"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _AdministrativeUser = require('../models/AdministrativeUser'); var _AdministrativeUser2 = _interopRequireDefault(_AdministrativeUser);

exports. default = async (req, res, next) => {
    const user = await _AdministrativeUser2.default.findByPk(req.admUser_id)

    if (!user) {
        return res.status(400).json({
            errors: ['User not found']
        })
    }

    if (user.role_id !== 1) {
        return res.status(400).json({
            errors: ['You are not allowed to change this']
        })
    }

    return next()
}