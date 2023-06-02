import Joi from "joi/lib";

export default Joi.object({
    username: Joi.string().min(5).max(15).required().regex(/^[^\d]+$/gi),
    password: Joi.string().min(6).max(50).required(/^[^\d]+$/gi)
})