const { Router } = require('express');
const { check } = require('express-validator');

const { validateJWT } = require('../middlewares/validate-jwt');
const { validateFields} = require('../middlewares/validate-fields');
const { GiveAllProducts,
        GiveProductById,
        CreateProduct,
        UpdateProduct,
        DeleteProduct,
    } = require('../controllers/products.controller');
   
    const { CategoryExistById, ProductExistById } = require('../helpers/db-validators');

    const { isRestaurantRoleAndAdmin } = require('../middlewares');
    
    
    const router = Router();

//Obtener Todas las Categorias
router.get('/', GiveAllProducts);

// Obtener una categoria por id - publico
router.get('/:id', [
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(ProductExistById),
    validateFields,
], GiveProductById);

// Crear categoria - privado - cualquier persona con un token valido
router.post('/', [ 
    validateJWT,
    isRestaurantRoleAndAdmin,
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check('category', 'No es un id de Mongo valido').isMongoId(),
    check('category').custom(CategoryExistById),
    validateFields,
], CreateProduct);

// Actualizar una categoria - privado - solo el admin o el restaurante
router.put('/:id',[
    validateJWT,
    isRestaurantRoleAndAdmin,
    check('id', 'El id del producto no es un ID valido'),
    check('id').custom(ProductExistById),
    validateFields,
], UpdateProduct)

//Borrar una categoria - admin
router.delete('/:id',[
    validateJWT,
    isRestaurantRoleAndAdmin,
    check('id', 'No es un id de Mongo valido').isMongoId(),
    check('id').custom(ProductExistById),
    validateFields

], DeleteProduct);




module.exports = router;