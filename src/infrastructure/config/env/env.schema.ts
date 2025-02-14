import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  API_PORT: Joi.number().required(),
  DATABASE_URL: Joi.string().required(),
  SECRET_TOKEN: Joi.string().required(),
});
