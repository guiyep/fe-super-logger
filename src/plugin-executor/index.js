const onExecutePlugin = (f, { loggingType, functionName, position, group, time, description, context, color }) => {
  if (typeof f !== 'function') {
    throw Error('onExecutePlugin: your plugin executor need to be a function');
  }

  if (typeof loggingType !== 'string') {
    throw Error('onExecutePlugin: loggingType is required');
  }

  if (typeof functionName !== 'string') {
    throw Error('onExecutePlugin: functionName is required');
  }

  if (typeof description !== 'string') {
    throw Error('onExecutePlugin: description is required');
  }

  f({ group, time, position, description, context, color });
};
