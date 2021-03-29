import { getConfiguration, runPlugins } from '../configuration';
import { saveLog } from '../cache';
import { Configurations } from '../configuration/configs';

const colors = {};

const isConfigurationEnabled = (name) => {
  const config = getConfiguration();
  return config[name];
};

const getColor = (key) => {
  if (colors[key]) {
    return colors[key];
  }

  const keyValue = 1 / Array.from(key).reduce((acc, _, index) => acc + key.charCodeAt(index), 4224);

  const thisColor = `#${Math.floor(keyValue * 16777215).toString(16)}`;

  colors[key] = thisColor;

  return thisColor;
};

const log = (method, { position, group }) => (functionName, text, object) => {
  if (isConfigurationEnabled(Configurations.IS_LOGGING_ENABLED)) {
    const timeNow = +new Date();

    const color = getColor(functionName);

    if (isConfigurationEnabled(Configurations.IS_CONSOLE_ENABLED)) {
      return console[method](
        `%c${timeNow}:%c${functionName} %c- ${text}`,
        `color: green; font-weight: bold;`,
        `color: ${color}; font-weight: bold; text-decoration: underline`,
        'font-weight: bold;',
        object !== undefined ? object : '',
        (object && object.stack) || '',
      );
    }

    const toSend = {
      loggingType: method,
      position,
      group,
      functionName,
      time: timeNow,
      description: text,
      context: object,
      color,
    };

    if (isConfigurationEnabled(Configurations.IS_PLUGIN_FEATURE_ENABLED)) {
      runPlugins(toSend);
    }

    if (isConfigurationEnabled(Configurations.IS_CACHE_ENABLED)) {
      saveLog(toSend);
    }
  }
  return undefined;
};

const execute = (method) => log(method);

const executeWithExtraInfo = (method, position, group) => {
  const scopedLogger = log(method, { position, group });
  return (text, object) => {
    return scopedLogger(position, group ? `${group} - ${text}` : text, object);
  };
};

export const logger = {
  log: execute('log'),
  error: execute('error'),
  info: execute('info'),
  warn: execute('warn'),

  loggerIn: (position) => ({
    log: executeWithExtraInfo('log', position),
    error: executeWithExtraInfo('error', position),
    info: executeWithExtraInfo('info', position),
    warn: executeWithExtraInfo('warn', position),

    // group logging
    groupIn: (group) => ({
      log: executeWithExtraInfo('log', position, group),
      error: executeWithExtraInfo('error', position, group),
      info: executeWithExtraInfo('info', position, group),
      warn: executeWithExtraInfo('warn', position, group),
    }),
  }),
};

export default logger;
