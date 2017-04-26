/**
 * A generic template generator that will generate a string given an object to serialize and a 
 * formatter function that accepts a key as an argument
 */
const convertJsonToTemplateString = (formatterFunction) => (objectToSerialize) => {
   return Object.keys(objectToSerialize).reduce((finalString, key) => {
    return finalString + formatterFunction(key);
  }
  , '');
};

/**
 * Converts a json object to key value pairs for a constructor function of a model that represents 
 *  the json.
 * E.g. { foo: 'bar' }
 * The out put of this function bould be the body of the constructor function below.
 *
 * class Foo {
 *   constructor(config) {
 *      this.foo = config.bar;
 *   }
 * }
 */
function convertJsonToObjectConstructorString(object) {
  const formatter = key => `this.${key} = config.${key}; \n`;
  return convertJsonToTemplateString(formatter)(object);
}

/**
 * Converts a javascript object that is a map of parameters to a function to JSDoc format.
 * For example:
 * const someParams = { foo: 'bar', baz: 'boo' };
 * someFunc(someParams);
 *
 * The jsdoc string would be generated as follows:
 *
 * @param someParams.foo
 * @param someParams.baz
 */
function convertJsonToParameterObjectDocumentationString(parameterName, object) {
  const formatter = key => `@param ${parameterName}.${key} \n`;
  return convertJsonToTemplateString(formatter)(object);
}
