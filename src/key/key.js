let key = 'FE-SUPER-LOGGER-KEY';
let keyStrategyFunction;

export const getKey = async () => {
  if (keyStrategy) {
    await keyStrategyFunction();
  }

  return key;
};

export const setKey = (value) => {
  key = value;
};

export const setKeyStrategy = (f) => {
  keyStrategyFunction = f;
};
