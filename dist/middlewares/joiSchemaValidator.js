"use strict";Object.defineProperty(exports, "__esModule", {value: true});
exports. default = (schemaRef) => async (req, res, next) => {
    try {
        await schemaRef.validateAsync(req.body);

        return next()

    } catch (e) {
        res.status(400).json({
            errors: e.details.map((err) => err.message.replace(/["]/g, ''))
        })
    }
}

