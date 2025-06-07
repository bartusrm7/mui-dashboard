const Joi = require("joi");

const loginValidation = Joi.object({
	userEmail: Joi.string().email().required().messages({
		"string.empty": "Pole email nie może być puste",
		"string.email": "Email musi być prawidłowym adresem email",
	}),
	userPassword: Joi.string().min(6).required().messages({
		"string.empty": "Pole hasło nie może być puste",
		"string.min": "Hasło musi mieć co najmniej 6 znaków",
	}),
});

exports.loginValidation = loginValidation;
