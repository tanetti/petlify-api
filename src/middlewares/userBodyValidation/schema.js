/* eslint-disable prefer-regex-literals */
const joi = require('joi');

const registerUserBodyValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.base': 'register-email-format-error',
    'string.email': 'register-email-format-error',
    'any.required': 'register-email-required-error',
  }),

  password: joi.string().min(8).required().messages({
    'string.base': 'register-password-format-error',
    'string.min': 'register-password-length-error',
    'any.required': 'register-password-required-error',
  }),

  name: joi.string().messages({
    'string.base': 'register-name-format-error',
  }),

  address: joi.string().messages({
    'string.base': 'register-address-format-error',
  }),

  phone: joi.string().messages({
    'string.base': 'register-phone-format-error',
  }),
});

const loginUserBodyValidationSchema = joi.object({
  email: joi.string().email().required().messages({
    'string.base': 'login-email-format-error',
    'string.email': 'login-email-format-error',
    'any.required': 'login-email-required-error',
  }),

  password: joi.string().required().messages({
    'string.base': 'login-password-format-error',
    'any.required': 'login-password-required-error',
  }),
});

module.exports = {
  registerUserBodyValidationSchema,
  loginUserBodyValidationSchema,
};