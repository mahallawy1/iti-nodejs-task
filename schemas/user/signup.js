
const Joi = require('joi');

const signupschema = {  
    body: Joi.object({
        name: Joi.string().min(3).max(30).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
        role: Joi.string().valid('admin', 'user').default('user'),
        age: Joi.number().required()
    })

};

module.exports = signupschema;
