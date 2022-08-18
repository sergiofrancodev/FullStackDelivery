const { response } = require('express');
const { Category } = require('../models');


const GiveCategories = async(req, res = response) =>{

    const {limit = 5, from = 0} = req.query;
    const query = {status: true};
   

    const [total, categories] = await Promise.all([
        Category.countDocuments(query),
        Category.find(query).populate('user', 'name')
    .skip(Number(from))
    .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        categories
    })

}

const GivecategoryById = async(req, res = response) =>{

    const {id} = req.params;

    const category = await Category.findById(id).populate('user', 'name')

    res.status(201).json({
        ok: true,
        category
    })

}

const CreateCategory = async(req, res = response) => {

    const name = req.body.name;

    const categoryDB = await Category.findOne({ name });


    if(categoryDB) {
        return res.status(400).json({
            ok: false,
            msg: `La categoria ${categoryDB.name}, ya existe`
        });
    }

    //Generar la data a guardar

    const data = {
        name,
        user: req.user._id,
    }

    const category = new Category( data );

    await category.save();


    res.status(201).json(category);
}

const UpdateCategory = async (req, res = response) => {

    const {id} = req.params;
    const {status, user, ...data} = req.body;

    data.user = req.user._id;


    const category = await Category.findByIdAndUpdate(id, data, {new: true} );

    res.status(201).json({
        ok: true,
        category
    
    })

}

const DeleteCategory = async(req, res = response) =>{

const {id} = req.params;



const category = await Category.findByIdAndUpdate(id, {status: false}, {new: true});

res.status(201).json({
    ok: true,
    category
})

}

// deleteCategorie cambiar status: false 

module.exports = {
    CreateCategory,
    GiveCategories,
    GivecategoryById,
    UpdateCategory,
    DeleteCategory
}