import Joi from 'joi'

export default Joi.object({
    email: Joi.string().email().min(9).max(150).required(),
    password: Joi.string().min(6).max(50).required()
})