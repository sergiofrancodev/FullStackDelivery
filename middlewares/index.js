const thisValidateFields = require('../middlewares/validate-fields');
const thisValidateJWT = require('../middlewares/validate-jwt');
const thisValidateRoles = require('../middlewares/validate-role');
const validateFileUpload  = require('./validate-file');



module.exports = {
    ...thisValidateFields,
    ...thisValidateJWT,
    ...thisValidateRoles,
    ...validateFileUpload
}