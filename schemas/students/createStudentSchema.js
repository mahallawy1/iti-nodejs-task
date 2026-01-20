const Joi = require('joi');

const createStudentSchema = {
    body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        age: Joi.number().min(18).max(150).required(),
        course: Joi.string().min(2).max(100).required(),
        grades: Joi.object().optional()
    })
};

module.exports = createStudentSchema;