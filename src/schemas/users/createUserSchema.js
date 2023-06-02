import Joi from 'joi'


export default Joi.object({
    name: Joi.string().min(3).max(20).required().regex(/^[^\d]+$/i),
    surname: Joi.string().min(3).max(50).required().regex(/^[^\d]+$/i),
    tel: Joi.string().required(),
    email: Joi.string().min(9).max(150).email().required(),
    password: Joi.string().min(6).max(50).required()
})
