import { getKey } from '../key';
import { setConfiguration } from '../configuration';
import { Configurations } from '../configuration/configs';

let windowAccessKeyFeatureEnabled = true;

const activateLogging = async ({ key }) => {
  try {
    const uniqueKey = windowAccessKeyFeatureEnabled && (await getKey());
    if (uniqueKey === key || !windowAccessKeyFeatureEnabled) {
      setConfiguration(Configurations.IS_LOGGING_ENABLED, true);
    }
  } catch {
    throw Error('Unable to get key for this fe-super-console instance');
  }
};

const deactivateLogging = async ({ key }) => {
  try {
    const uniqueKey = windowAccessKeyFeatureEnabled && (await getKey());
    if (uniqueKey === key || !windowAccessKeyFeatureEnabled) {
      setConfiguration(Configurations.IS_LOGGING_ENABLED, false);
    }
  } catch {
    throw Error('Unable to get key for this fe-super-console instance');
  }
};

export const attachToWindow = ({ isWindowAccessKeyFeatureEnabled }) => {
  if (typeof window !== 'undefined') {
    windowAccessKeyFeatureEnabled = isWindowAccessKeyFeatureEnabled;
    window.fe_super_logger = {
      activateLogging,
      deactivateLogging,
    };
  }
};
