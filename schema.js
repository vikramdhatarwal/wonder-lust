const Joi = require('joi');

const listingSchema = Joi.object({
    listing: Joi.object({
        title: Joi.string().required(),
        description: Joi.string().required(),
        price: Joi.number().min(1).required(),
        image: Joi.object({
            url: Joi.string().allow('', null),
            filename: Joi.string().allow('', null)
        }),
        location: Joi.string().required(),
        country: Joi.string().required()
    }).required()
}).required();

module.exports = { listingSchema };
