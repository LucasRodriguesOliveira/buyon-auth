import * as Joi from 'joi';

export const envSchema = Joi.object({
  NODE_ENV: Joi.string()
    .valid('development', 'production', 'test')
    .default('development'),
  DATABASE_URL: Joi.string().required(),
  SECRET_TOKEN: Joi.string().required(),
  PORT: Joi.string().required(),
  HOST: Joi.string().required(),
});
