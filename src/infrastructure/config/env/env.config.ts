import { ConfigModuleOptions } from '@nestjs/config';
import { appConfig } from './app.config';
import { tokenConfig } from './token.config';
import { envSchema } from './env.schema';

export const envConfig: ConfigModuleOptions = {
  load: [appConfig, tokenConfig],
  validationSchema: envSchema,
  isGlobal: true,
};
