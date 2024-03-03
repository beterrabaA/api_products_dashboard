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
    name: joi.string().required(),
    brand: joi.string().required(),
    model: joi.string().required(),
    data: joi.array().items(
      joi.object({
        price: joi.number().min(1).required(),
        color: joi.string().required(),
      })
    ),
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

module.exports = {
  prodSchema,
  prodWDtailsSchema,
  prodWDataSchema,
  sProdWDataSchema,
};
