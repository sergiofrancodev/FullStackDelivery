const { response, request, query } = require('express');

const usersGet = (req = request, res = response) => {

    const params = req.query;
    res.json({
        ok: true,
        msg: 'Get api controller',
        params
    })
}

const usersPut = (req, res = response) => {

    const id = req.params;

    res.status(400).json({
        ok: true,
        msg: 'Put api',
        id
    });
};

const usersPost = (req, res = response) => {

    const { name, age } = req.body;

    res.status(201).json({
        ok: true,
        msg: 'Post api',
        name,
        age
    });
};

const usersDelete = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Delete api'
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