const joi = require("joi");

const prodSchema = joi.object({
  name: joi.string().required(),
  brand: joi.string().required(),
  model: joi.string().required(),
  price: joi.number().min(1).required(),
  color: joi.string().required(),
});

const prodWDtailsSchema = joi.object({
  name: joi.string().required(),
  details: joi.object({
    brand: joi.string().required(),
    model: joi.string().required(),
    color: joi.string().required(),
  }),
  price: joi.number().min(1).required(),
});

const prodWDataSchema = joi.array().items(
  joi.object({
    id: joi.string().required(),
    name: joi.string().required(),
    brand: joi.string().required(),
    model: joi.string().required(),
    data: joi.array().items(
      joi.object({
        price: joi.number().min(1).required(),
        color: joi.string().required(),
      })
    ),
    userId: joi.string().required(),
  })
);

// single prodWDataSchema
const sProdWDataSchema = joi.object({
  name: joi.string().required(),
  brand: joi.string().required(),
  model: joi.string().required(),
  data: joi.array().items(
    joi.object({
      price: joi.number().min(1).required(),
      color: joi.string().required(),
    })
  ),
});

const userRegisterSchema = joi
  .object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  })
  .messages({
    "string.empty": "Field is required",
    "string.email": "Invalid email",
    "string.min": "Password must have at least 6 characters",
  });

const userLoginSchema = joi
  .object({
    email: joi.string().email().required(),
    password: joi.string().min(6).required(),
  })
  .messages({
    "string.empty": "Field is required",
    "string.email": "Invalid email",
    "string.min": "Password must have at least 6 characters",
  });

module.exports = {
  prodSchema,
  prodWDtailsSchema,
  prodWDataSchema,
  sProdWDataSchema,
  userRegisterSchema,
  userLoginSchema,
};
