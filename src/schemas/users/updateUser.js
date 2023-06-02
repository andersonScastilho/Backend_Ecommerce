import Joi from 'joi'


export default Joi.object({
    name: Joi.string().min(3).max(20).regex(/^[^\d]+$/i),
    surname: Joi.string().min(3).max(50).regex(/^[^\d]+$/i),
    tel: Joi.string(),
    email: Joi.string().min(9).max(150).email(),
    password: Joi.string().min(6).max(50)
})
