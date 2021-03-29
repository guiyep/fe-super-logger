import { onExecutePlugin } from '../plugin-executor';
import { attachToWindow } from '../window';

const plugins = {};
const configuration = {};

let initialized = false;

export const initialize = (
  {
    isWindowAccessFeatureEnabled = false,
    isPluginFeatureEnabled = false,
    isChromeDevtoolEnabled = false,
    isConsoleEnabled = true,
    isWindowAccessKeyFeatureEnabled = true,
    isCacheEnabled = true,
    isCacheTimerEnabled = undefined,
  },
  pluginsArray,
) => {
  if (!initialized) {
    initialized = true;

    pluginsArray.map((acc, plugin) => {
      let name;
      acc[plugin.name] = {
        original: plugin,
        execute: (objectAsProps) => {
          name = onExecutePlugin(plugin.runPlugin, objectAsProps);
        },
      };

      if (!Configurations[name]) {
        Configurations[name] = name;
        configuration[name] = true;
      } else {
        throw Error(`Configurations with name ${name} already exists`);
      }

      return acc;
    }, plugins);

    configuration['isWindowAccessFeatureEnabled'] = isWindowAccessFeatureEnabled;
    configuration['isWindowAccessKeyFeatureEnabled'] = isWindowAccessKeyFeatureEnabled;
    configuration['isPluginFeatureEnabled'] = isPluginFeatureEnabled;
    configuration['isChromeDevtoolEnabled'] = isChromeDevtoolEnabled;
    configuration['isConsoleEnabled'] = isConsoleEnabled;
    configuration['isCacheEnabled'] = isCacheEnabled;
    configuration['isCacheTimerEnabled'] = isCacheTimerEnabled;

    if (isWindowAccessFeatureEnabled) {
      attachToWindow({ isWindowAccessKeyFeatureEnabled });
    }

    if (arePluginsEnabled) {
      plugins = {};
    }
  }
};

export const runPlugins = (objectAsProps) => {
  Object.values(plugins).forEach((plugin) => {
    plugin.execute(objectAsProps);
  });
};

export const getConfiguration = () => {
  if (!initialize) {
    throw new Error('logger is not initialized');
  }

  return configuration;
};

export const setConfiguration = (key, value) => {
  if (!initialize) {
    throw new Error('logger is not initialized');
  }

  configuration[key] = value;
};

export const getPlugins = () => {
  if (!initialize) {
    throw new Error('logger is not initialized');
  }

  return plugins;
};
