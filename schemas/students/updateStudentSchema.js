const Joi = require('joi');

const updateStudentSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).optional(),
        age: Joi.number().min(18).max(150).optional(),
        course: Joi.string().min(2).max(100).optional(),
        grades: Joi.object().optional()
    }),
    params: Joi.object({
        id: Joi.string().hex().length(24).required()
    })
};

module.exports = updateStudentSchema;