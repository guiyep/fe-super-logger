import { getConfiguration } from '../configuration';
import { Configurations } from '../configuration/configs';

const cacheByTime = {};

const getOneConfiguration = (name) => {
  const config = getConfiguration();
  return config[name];
};

let lastSaved;

export const saveLog = ({ time, ...props }) => {
  const log = { time, ...props };

  const timer = getOneConfiguration(Configurations.IS_CACHE_TIMER_ENABLED);
  if (timer) {
    const now = +new Date();
    if (lastSaved && now - lastSaved > timer) {
      cacheByTime = {};
    }
  }

  if (!cacheByTime[time]) {
    lastSaved = +new Date();
    cacheByTime[time] = log;
  }
};

const getCacheFromTo = ({ from, to }) => {
  return { byGroup, byPosition, byFunctionName, byLoggingType, data: {} };
};
