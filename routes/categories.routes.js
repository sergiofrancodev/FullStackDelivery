const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields} = require('../middlewares/validate-fields');
const { CreateCategory,
    UpdateCategory, 
    GivecategoryById, 
    DeleteCategory} = require('../controllers/categories.controller');
    const {GiveCategories} = require('../controllers/categories.controller');
    const { CategoryExistById } = require('../helpers/db-validators');
    const { isAdminRole, isRestaurantRoleAndAdmin } = require('../middlewares');
    
    
    const router = Router();

//Obtener Todas las Categorias
router.get('/', GiveCategories);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(CategoryExistById),
    validateFields,

], GivecategoryById);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validateJWT,
    isAdminRole,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    validateFields,
     
], CreateCategory);

// Actualizar una categoria - privado - solo el admin o el restaurante
router.put('/:id',[
    validateJWT,
    isAdminRole,
    check('category', 'No es un id de Mongo valido').isMongoId(),
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('id').custom(CategoryExistById),
    validateFields,
], UpdateCategory)

//Borrar una categoria - admin
router.delete('/:id',[
    validateJWT,
    isAdminRole,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(CategoryExistById),
    validateFields

], DeleteCategory);




module.exports = router;