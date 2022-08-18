const { Router } = require('express');
const { check } = require('express-validator');
const { fileUpload, showImage, updateImgeCloudinary } = require('../controllers/uploads.controller');
const { allowedCollections } = require('../helpers');
const { validateFields, validateFileUpload } = require('../middlewares');

const router = Router();

router.post('/', validateFileUpload, fileUpload);

router.put('/:collection/:id', [
    validateFileUpload,
    check('id', 'El id debe ser un mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products', 'categories' ])),
    validateFields
], updateImgeCloudinary);


router.get('/:collection/:id', [
    check('id', 'El id debe ser un mongo ID').isMongoId(),
    check('collection').custom(c => allowedCollections(c, ['users', 'products', 'categories' ])),

], showImage)


module.exports = router;