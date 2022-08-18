const { response } = require('express');
const { User, Category, Product } = require('../models');
const {ObjectId} = require('mongoose').Types

const collectionsAllowed = [
    'users',
    'products',
    'categories',
    'roles',
    'productsByCategory'
];

const searchUsers = async(term = '', res = response) =>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const user = await User.findById(term);
       return res.json({
            results: (user) ?  [user] : []
        })
    }

    const regex = new RegExp( term, 'i')
    if(term === ''){
        res.json({
            msg: 'Debe ingresar una búsqueda'
        })
    }

    const users = await User.find({
        $or: [{name: regex,}, {email: regex}],
        $and: [{status: true}]
    });

    res.json({
        results:users
    })

}
const searchProducts = async(term = '', res = response) =>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const product = await Product.findById(term)
        .select('name price description available')
        .populate('category', 'name')
       return res.json({
            results: (product) ?  [product] : []
        })
    }

    const regex = new RegExp( term, 'i')
    if(term === ''){
        res.json({
            msg: 'Debe ingresar una búsqueda'
        })
    }

    const products = await Product.find({ name:regex, status: true}).populate('category', 'name');
    if(!products.length){
        return res.status(400).json({ msg: `No se encontraron resultados con la busqueda de (${term}) intente buscar con otro termino `})
    }

    res.json({
        results: products,
    })

}

const searchCategories = async(term = '', res = response) =>{

    const isMongoID = ObjectId.isValid( term );

    if (isMongoID){
        const category = await Category.findById(term)
        
       return res.json({
            results: (category) ?  [category] : []
        })
    }

    const regex = new RegExp( term, 'i')
    if(term === ''){
        res.json({
            msg: 'Debe ingresar una búsqueda'
        })
    }

    const categories = await Category.find({ name:regex, status: true });

    if(!categories.length){
        return res.status(400).json({ msg: `No se encontraron resultados con la busqueda de (${term}) intente buscar con otro termino `})
    }

    res.json({
        results: categories,
    })

}

const productsByCategory = async (term = '', res = response) => {
 
    const isMongoId = ObjectId.isValid(term); // true or false
 
    if (isMongoId) {
        const category = await Category.findById(term);
        return res.json({
            results: (category) ? [category] : []
        })
    }
    const regex = RegExp(term, 'i'); //sera una busqueda insensible (no estricta)
    if(term === ''){
        res.json({
            msg: 'Debe ingresar una búsqueda'
        })
    }
    const category = await Category.find({
        $or: [{ name: regex }, { email: regex }],
        $and: [{ state: true }]
    })
    if(!category[0] ){
        return res.status(400).json({
            msg: 'Esta categoría no existe'
        })
    }
    const products =  await Product.find({category: category[0]._id}).populate('category','name').populate('user','name')
    if(!products[0] ){
        return res.status(400).json({
            msg: 'No se encontraron productos'
        })
    }
    res.json({
        results: products
    })
}


const Search = (req, res = response) => {

    const { collections, term } = req.params;

    if (!collectionsAllowed.includes(collections)) {
        return res.status(400).json({
            ok: false,
            msg: `Las colecciones permitidas son ${collectionsAllowed}`
        });
    }

    switch (collections) {
        case 'users':
            searchUsers(term, res);
            break;

        case 'products':
            searchProducts(term, res);
            break;

        case 'categories':
            searchCategories(term, res);
            break;
        
        case 'productsByCategory':
            productsByCategory(term, res)
            break;

        default:
            res.status(500).json({
                msg: 'No hice esta busqueda'
            })
            break;
    }
    

}

module.exports = {
    Search
}