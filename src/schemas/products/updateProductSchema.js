import Joi from "joi";

export default Joi.object({
    description: Joi.string().min(3).max(50),
    price: Joi.number(),
    packaging: Joi.string().min(2).max(10).regex(/^[^\d]+$/i),
    image_key: Joi.string(),
    category_id: Joi.number().integer(),
    name: Joi.string().min(3).max(50)
})