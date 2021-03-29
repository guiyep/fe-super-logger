import { logger } from './src/logger';
import { initialize as initializeLogger } from './src/configuration';
import { setKey as setLoggerKey, setKeyStrategy as setLoggerKeyStrategy } from './src/key';

export { logger, initializeLogger, setLoggerKey, setLoggerKeyStrategy };
