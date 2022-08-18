const { response, request, query } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');

const usersGet = async(req = request, res = response) => {
    const {limit = 5, from = 0} = req.query;
    const query = {status: true};
   

    const [total, users] = await Promise.all([
        User.countDocuments(query),
        User.find(query)
    .skip(Number(from))
    .limit(Number(limit))
    ]);

    res.json({
        ok: true,
        total,
        users
    })
}

const usersPut = async(req, res = response) => {

    const {id} = req.params;
    const {_id, password, google, email, ...resto}  = req.body;

    
    if(password){
        //Encriptar la contraseña
        const salt = bcryptjs.genSaltSync(10);
        resto.password = bcryptjs.hashSync(password, salt);
        
    }
    const user = await User.findByIdAndUpdate(id, resto);


    res.status(400).json({
        ok: true,
        user
    });
};

const usersPost = async (req, res = response) => {


    const { name, email, password, role, phone } = req.body;
    const user = new User({ name, email, password, role, phone });


    //Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);

    //Guardar en DB
    await user.save();


    res.status(201).json({
        ok: true,
        msg: 'Post api',
        user
    });
};

const usersDelete = async(req, res = response) => {
    const {id} = req.params;
   
const user = await User.findByIdAndUpdate(id, {status: false});

const userAuth  = req.user;

    res.json({
        ok: true,
        user,
        userAuth
    });
};

const usersPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch api'
    });
};


module.exports = {
    usersGet,
    usersPut,
    usersPost,
    usersDelete,
    usersPatch
}