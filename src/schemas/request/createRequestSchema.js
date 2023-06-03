import Joi from 'joi'

export default Joi.object({
    address_id: Joi.number().integer().required(),
    products: Joi.array().items(Joi.object({
        product_id: Joi.number().integer().required(),
        quantity: Joi.number().integer().required()
    })).required()

})