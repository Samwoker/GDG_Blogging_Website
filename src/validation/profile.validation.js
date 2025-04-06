const joi = require("joi");
exports.updateProfileSchema = {
    body: joi.object().keys({
      name: joi.string().trim().required(),
      email: joi.string().email().trim().lowercase().required(),
      profile: joi.object({
        bio: joi.string().max(500),
        socialLinks: joi.object({
          twitter: joi.string().uri().allow(''),
          linkedin: joi.string().uri().allow(''),
          github: joi.string().uri().allow('')
        })
      }),
    }),
  }