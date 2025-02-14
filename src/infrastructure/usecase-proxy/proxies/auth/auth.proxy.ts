import { Provider } from '@nestjs/common';
import { LoginProxy } from './login-usecase.proxy';

export const AuthProxy: Map<symbol, Provider> = new Map([LoginProxy.Entry]);
