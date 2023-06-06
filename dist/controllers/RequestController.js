"use strict";Object.defineProperty(exports, "__esModule", {value: true}); function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }var _sequelize = require('sequelize');

var _Address = require('../models/Address'); var _Address2 = _interopRequireDefault(_Address);
var _Request = require('../models/Request'); var _Request2 = _interopRequireDefault(_Request);
var _User = require('../models/User'); var _User2 = _interopRequireDefault(_User);
var _Product = require('../models/Product'); var _Product2 = _interopRequireDefault(_Product);
var _RequestProduct = require('../models/RequestProduct'); var _RequestProduct2 = _interopRequireDefault(_RequestProduct);

class RequestController {
    async store(req, res) {
        const { address_id, products } = req.body

        const products_request = []

        products.forEach(async (product) => {
            const productIsValid = await _Product2.default.findByPk(product.product_id)

            if (!productIsValid) {
                return res.status(400).json({
                    errors: ['Invalid Product']
                })
            }
            products_request.push({ ...product, price: productIsValid.dataValues.price })

        })

        const addressVerify = await _Address2.default.findOne({
            where: {
                [_sequelize.Op.and]: [
                    { id: address_id },
                    { user_id: req.user_id }
                ]
            }
        })

        if (!addressVerify) {
            return res.status(401).json({
                errors: ['Este endereço não pertence ao usuario atual']
            })
        }

        const price_total = products_request.reduce((acc, item) => {
            const price_totalItem = item.price * item.quantity

            return acc + price_totalItem
        }, 0)

        const request = await _Request2.default.create({
            price_total, address_id, user_id: req.user_id,
        })


        if (!request) {
            return res.status(400).json({
                errors: ['Failed to add request']
            })
        }

        products.forEach(async (product) => {
            const quantity = product.quantity
            const product_id = product.product_id

            const nro_request = request.id

            await _RequestProduct2.default.create({ quantity, product_id, nro_request })
        })

        return res.status(200).json({
            request
        })
    }
    async index(req, res) {

        try {
            const requests = await _Request2.default.findAll({
                attributes: ['id', 'price_total', 'created_at', 'updated_at'],
                include: [{
                    attributes: ['name', 'surname', 'email', 'tel'],
                    model: _User2.default
                }, {
                    attributes: ['country', 'state', 'city', 'neighborhood', 'street', 'address_number', 'zip_code', 'complement'],
                    model: _Address2.default,
                }, {
                    attributes: ['name', 'description', 'price'],
                    model: _Product2.default,
                    as: 'products',
                    through: {
                        attributes: ['nro_request', 'quantity']
                    }
                }],
                where: {
                    user_id: req.user_id
                }
            })

            return res.status(200).json({
                requests
            })
        } catch (e) {
            return res
                .status(400)
                .json({ errors: e.errors.map((err) => err.message) });
        }
    }
    async delete(req, res) {
        const { request_id } = req.params

        try {
            const request = await _Request2.default.findByPk(request_id)

            if (!request) {
                return res.status(404).json({
                    errors: ['Request not found']
                })
            }

            if (request.user_id !== req.user_id) {
                return res.status(401).json({
                    errors: ['You are not allowed to delete this']
                })
            }

            if (request.payload === 'paid') {
                return res.status(400).json({
                    errors: ['Request is paid']
                })
            }

            await request.destroy()

            res.status(200).json({
                message: "Request deleted"
            })
        } catch (e) {
            return res
                .status(400)
                .json({ errors: e.errors.map((err) => err.message) });
        }

    }
}
exports. default = new RequestController()