import { Op } from 'sequelize'

import Address from '../models/Address'
import Request from '../models/Request'
import User from '../models/User'
import Product from '../models/Product'
import RequestProduct from '../models/RequestProduct'

class RequestController {
    async store(req, res) {
        const { address_id, products } = req.body

        const products_request = []

        products.forEach(async (product) => {
            const productIsValid = await Product.findByPk(product.product_id)

            if (!productIsValid) {
                return res.status(400).json({
                    errors: ['Invalid Product']
                })
            }
            products_request.push({ ...product, price: productIsValid.dataValues.price })

        })

        const addressVerify = await Address.findOne({
            where: {
                [Op.and]: [
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

        const request = await Request.create({
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

            await RequestProduct.create({ quantity, product_id, nro_request })
        })

        return res.status(200).json({
            request
        })
    }
    async index(req, res) {

        const requests = await Request.findAll({
            attributes: ['id', 'price_total', 'created_at', 'updated_at'],
            include: [{
                attributes: ['name', 'surname', 'email', 'tel'],
                model: User
            }, {
                attributes: ['country', 'state', 'city', 'neighborhood', 'street', 'address_number', 'cep', 'complement'],
                model: Address,
            }, {
                attributes: ['name', 'description', 'price'],
                model: Product,
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
    }
    async delete(req, res) {
        const { request_id } = req.params

        const request = await Request.findByPk(request_id)

        if (!request) {
            return res.status(400).json({
                errors: ['Request not found']
            })
        }

        if (request.user_id !== req.user_id) {
            return res.status(401).json({
                errors: ['You are not allowed to delete this']
            })
        }

        if (request.payload === 'paid') {
            return res.status(401).json({
                errors: ['Request is paid']
            })
        }

        await request.destroy()

        res.status(200).json({
            message: "Request deleted"
        })
    }
}
export default new RequestController()