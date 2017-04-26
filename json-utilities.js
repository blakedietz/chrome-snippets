const convertJsonToTemplateString = (formatterFunction) => (objectToSerialize) => {
   return Object.keys(objectToSerialize).reduce((finalString, key) => {
    return finalString + formatterFunction(key);
  }
  , '');
};

function convertJsonToObjectConstructorString(object) {
  const formatter = key => `this.${key} = config.${key}; \n`;
  return convertJsonToTemplateString(formatter)(object);
}

function convertJsonToParameterObjectDocumentationString(parameterName, object) {
  const formatter = key => `@param ${parameterName}.${key} \n`;
  return convertJsonToTemplateString(formatter)(object);
}
