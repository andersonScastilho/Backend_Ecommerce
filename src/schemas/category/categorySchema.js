import Joi from "joi";

export default Joi.object({
    name: Joi.string().min(3).max(25).lowercase().required().regex(/^[^\d]+$/i)
})