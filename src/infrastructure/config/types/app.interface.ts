import { EnvMode } from './mode.enum';
import { UserConfig } from './user.interface';

export interface AppConfig {
  mode: EnvMode;
  user: UserConfig;
}
