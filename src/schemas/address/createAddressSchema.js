import Joi from 'joi'

export default Joi.object({
    country: Joi.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    state: Joi.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    city: Joi.string().min(4).max(20).required().regex(/^[^\d]+$/i),
    neighborhood: Joi.string().min(4).max(50).required().regex(/^[^\d]+$/i),
    street: Joi.string().min(4).max(100).required().regex(/^[^\d]+$/i),
    complement: Joi.string().min(4).max(20).regex(/^[^\d]+$/i),
    address_number: Joi.number().integer().required(),
    zip_code: Joi.string().min(9).max(9).required().regex(/^[0-9]{5}-[0-9]{3}$/)
})