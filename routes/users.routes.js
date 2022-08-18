const { Router } = require('express');
const { check } = require('express-validator');

const {isValidRole, 
       isValidEmail, 
       isValidPhone, 
       isValidId } = require('../helpers/db-validators');

const {validateFields,
       validateJWT,
       haveRole } = require('../middlewares');

const { usersGet, 
        usersPut, 
        usersPost, 
        usersDelete, 
        usersPatch } = require('../controllers/users.controller');

const router = Router();

router.get('/', usersGet);

router.put('/:id', [
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(isValidId),
  check('role').custom(isValidRole),
  validateFields
], usersPut);

router.post('/',[
  check('name', 'El nombre es obligatorio').not().isEmpty(),
  check('email', 'El correo no es valido').isEmail(),
  check('email').custom(isValidEmail),
  check('phone', 'El telefono es obligatorio, solo acepta numeros, numeros de 10 digitos').isNumeric().isLength({min: 10, max: 10}),
  check('phone').custom(isValidPhone),
  check('password', 'El passwords es obligatorio y tiene que tener mas de 6 caracteres').isLength({min: 6}),
  check('role').custom(isValidRole),
  // check('role', 'No es un rol permitido').isIn(['ADMIN_ROLE', 'RESTAURANT_ROLE', 'USER_ROLE']),
  validateFields
], usersPost);

router.delete('/:id',[
  validateJWT,
  // isAdminRole,
  haveRole('ADMIN_ROLE', 'RESTAURANT_ROLE'),
  check('id', 'No es un ID valido').isMongoId(),
  check('id').custom(isValidId),
  validateFields
], usersDelete);

router.patch('/', usersPatch);




module.exports = router;