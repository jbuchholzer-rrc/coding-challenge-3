import Joi from 'joi';

export const createTaskSchema = Joi.object({
    userId: Joi.string().required(),
    title: Joi.string().required(),
    priority: Joi.string().valid('low', 'medium', 'high').required(),
    status: Joi.string().valid('open', 'in-progress', 'completed').required(),
    dueDate: Joi.date().required()
});
