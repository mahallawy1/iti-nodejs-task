
const Joi = require('joi');
/* {
    name: { type: String, required: true },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true
    },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ['admin', 'user'],
      default: 'user'
    },
    age: { type: Number, required: true }
  },
  { timestamps: true }
);*/ 
const signinschema = {  
    body: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required()
    })
};
module.exports = signinschema;
