const { response, request } = require('express');
const { Product } = require('../models');


const GiveAllProducts = async (req, res = response) => {

    const { limit = 5, from = 0 } = req.query;
    const query = { status: true };

    const [total, products] = await Promise.all([
        Product.countDocuments(query),
        Product.find(query)
            .populate('user', 'name')
            .populate('category', 'name')
            .skip(Number(from))
            .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        products
    })

};

const GiveProductById = async (req, res = response) => {

    const {id} = req.params;

    const product = await Product.findById(id)
    .populate('user', 'name')
    .populate('category', 'name')

    res.status(201).json({
        ok: true,
        product
    })

};

const CreateProduct = async (req = request, res = response) => {


    const { status, user, ...body } = req.body;

    const productDB = await Product.findOne({ name: body.name });

    if (productDB) {
        return res.status(400).json({
            ok: false,
            msg: `El Producto: ${productDB.name} Ya existe`
        });
    }


    const data = {
        ...body,
        name: body.name,
        user: req.user._id
    };

    const product = new Product(data)
    await product.save();

    res.status(201).json({
        ok: true,
        msg: 'Producto creado con exito',
        product
    })
};

const UpdateProduct = async (req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.user = req.user._id;


    const product = await Product.findByIdAndUpdate(id, data, {new: true} );

    res.status(201).json({
        ok: true,
        product
    
    })

};

const DeleteProduct = async (req, res = response) => {

    const {id} = req.params;

const product = await Product.findByIdAndUpdate(id, {status: false, available: false}, {new: true});

res.status(201).json({
    ok: true,
    product
})

};

module.exports = {
    GiveAllProducts,
    GiveProductById,
    CreateProduct,
    UpdateProduct,
    DeleteProduct
}