const Joi = require("joi");

const registerValidation = Joi.object({
	userName: Joi.string().required().messages({
		"string.empty": "Pole nazwa użytkownika nie może być puste",
		"string.min": "Pole nazwa użytkownika musi mieć co najmniej 3 znaki",
	}),
	userEmail: Joi.string().email().required().messages({
		"string.empty": "Pole email nie może być puste",
		"string.email": "Email musi być prawidłowym adresem email",
	}),
	userPassword: Joi.string().min(6).required().messages({
		"string.empty": "Pole hasło nie może być puste",
		"string.min": "Hasło musi mieć co najmniej 6 znaków",
	}),
});

exports.registerValidation = registerValidation;
