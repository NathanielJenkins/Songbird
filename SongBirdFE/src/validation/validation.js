//ahhhh wonderful code reuse... here find an nearly  identical file to the one on the api side.
//Too back they are hosted in the different areas..

const Joi = require("@hapi/joi");

export const authSchemas = {
	firstname: Joi.string().min(1).max(15).required(),
	lastname: Joi.string().min(1).max(15).required(),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.trim()
		.required(),
	password: Joi.string().min(5).required(),
	repeat_password: Joi.ref("password"),
	email: Joi.string()
		.email({ tlds: { allow: false } })
		.required(),
	password: Joi.string().min(5).required(),
};

export function validate(schema, values) {
	return schema.validate(values);
}
