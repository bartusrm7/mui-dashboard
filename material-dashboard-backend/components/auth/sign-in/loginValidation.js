const Joi = require("joi");

const loginValidation = Joi.object({
	userEmail: Joi.string().email().required().messages({
		"string.empty": "Email field cannot be empty",
		"string.email": "Email must be a valid email address",
	}),
	userPassword: Joi.string().min(6).required().messages({
		"string.empty": "Password field cannot be empty",
		"string.min": "Password must be at least 6 characters",
	}),
});

exports.loginValidation = loginValidation;
