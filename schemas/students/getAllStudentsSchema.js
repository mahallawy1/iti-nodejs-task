const Joi = require('joi');

const getAllStudentsSchema = {
    query: Joi.object({
        page: Joi.number().min(1).optional(),
        limit: Joi.number().min(1).max(100).optional()
    })
};

module.exports = getAllStudentsSchema;