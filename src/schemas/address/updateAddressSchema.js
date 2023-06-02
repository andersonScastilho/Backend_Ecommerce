import Joi from 'joi'

export default Joi.object({
    country: Joi.string().min(4).max(20),
    state: Joi.string().min(4).max(20),
    city: Joi.string().min(4).max(20),
    neighborhood: Joi.string().min(4).max(50),
    street: Joi.string().min(4).max(100),
    complement: Joi.string().min(4).max(20),
    address_number: Joi.number().integer(),
    zip_code: Joi.string().min(9).max(9)
})