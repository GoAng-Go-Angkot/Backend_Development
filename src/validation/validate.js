import ValidationError from "./../exception/ValidationError.js";

const validate = (schema, data) => {
  const result = schema.validate(data, {
    abortEarly: false,
    allowUnknown: false
  });
  if(result.error) {
    throw new ValidationError("Validation failed", result.error.details);
  } else {
    return result.value;
  }
};

export default validate