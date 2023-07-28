const {validationResult}  = require("express-validator");
const {ValidationError} = require ("../Errors");

module.exports  = function validationRequest(req) {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    throw new ValidationError(errors['errors'][0].msg);
  }
}