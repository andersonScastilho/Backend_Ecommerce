import Joi from "joi";

export default Joi.object({
    description: Joi.string().min(3).max(50).required(),
    price: Joi.number().required(),
    packaging: Joi.string().min(2).max(10).required().regex(/^[^\d]+$/i),
    image_key: Joi.string(),
    category_id: Joi.number().integer().required(),
    name: Joi.string().min(3).max(50).required().regex(/^[^\d]+$/i)
})