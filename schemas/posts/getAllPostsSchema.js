const Joi = require('joi');

const getAllPostsSchema = {
    query: Joi.object({
        page: Joi.number().min(1).optional(),
        limit: Joi.number().min(1).max(100).optional()
    })
};

module.exports = getAllPostsSchema;