//* validators/login.validator.js
const Joi = require('joi')

const loginSchema = Joi.object({
    userName: Joi.string().email().lowercase().required(),
    password: Joi.string().min(5).required()
});

module.exports = loginSchema;