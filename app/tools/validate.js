

const Joi = require("@hapi/joi");

module.exports = {
    validateBody: (schema) => {
        
        return (req, res, next) => {

            const result = Joi.validate(req.body, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            next();
        }
    },

    validateParams: (schema) => {
        return (req, res, next) => {

            const result = Joi.validate(req.query, schema);
            if (result.error) {
                return res.status(400).json(result.error);
            }
            next();
        }
    },
  
    schemas: {
        authSchema: Joi.object().keys({
            firstname: Joi.string().min(1).max(15).required(),
            lastname: Joi.string().min(1).max(15).required(),
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        }),

        loginSchema : Joi.object().keys({
            email: Joi.string().email().required(),
            password: Joi.string().min(5).required()
        }),

        resetPassword : Joi.object().keys({
            email: Joi.string().email().required(),
        }) 
    }
  }
  