const APIError = require('../utils/APIError');

const validate = (schema) => {
    return (req, res, next) => {
        for (const key in schema) {
            const { error } = schema[key].validate(req[key], { abortEarly: true });
            if (error) {
                throw new APIError(error.details[0].message, 400);
            }
        }
        next();
    };
};

module.exports = validate;