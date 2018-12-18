'use strict';

const validateEmail = user => {
  if (!/^\w+([\.-]?\w+)@wolox+(\.\w{2,3})+$/.test(user.email))
    return { valid: false, message: 'invalid domain email' };
  return { valid: true };
};

const validatePassword = user => {
  if (!/^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,}$/.test(user.password))
    return { valid: false, message: 'invalid password' };
  return { valid: true };
};
const isDefined = obj => {
  return obj === '' || obj === undefined || obj === null;
};

const validateMissingValues = (obj, requiredParams) => {
  for (const param in requiredParams) {
    if (isDefined(obj[requiredParams[param]])) return { message: `missing value` };
  }

  return { valid: true };
};

const checkValidations = (validations, object, requiredParams) =>
  validations.reduce(
    (result, validation) => {
      const validationResult = validation(object, requiredParams);

      if (!validationResult.valid) {
        result.valid = false;
        result.messages.push(validationResult.message);
      }
      return result;
    },
    {
      valid: true,
      messages: []
    }
  );

exports.validateUser = (user, requiredParams) =>
  checkValidations([validateEmail, validatePassword, validateMissingValues], user, requiredParams);
