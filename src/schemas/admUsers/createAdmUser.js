import Joi from 'joi'

export default Joi.object({
    fullname: Joi.string().min(5).max(255).required().regex(/^[^\d]+$/i),
    email: Joi.string().email().required(),
    username: Joi.string().min(5).max(15).required().regex(/^[^\d]+$/i),
    role_id: Joi.number().integer().required(),
    password: Joi.string().min(6).max(50).required()
})