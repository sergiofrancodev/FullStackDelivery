const {response } = require('express');
const User = require('../models/user.model');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generate-jwt');
const { googleVerify } = require('../helpers/google-verify');

const login = async(req, res = response) =>{

    const {email, password} = req.body;

    try {

        //verificar si el email existe

        const user = await User.findOne({email });

        if(!user){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son correctos - email'
            });
        };

        //verificar si el usuario esta activo

        if(!user.status){
            return res.status(400).json({
                ok: false,
                msg: 'Este usuario no existe en la Base de Datos'
            });
        };

        //verificar password

        const validPassword = bcryptjs.compareSync(password, user.password);

        if(!validPassword){
            return res.status(400).json({
                ok: false,
                msg: 'El usuario o la contraseña no son correctos - password'
            })
        }

        //generar JWT

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            msg: 'Usuario y contraseña validos',
            user,
            token
        });
        
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            ok: false,
            msg: 'Hable con el administrador'
        })
    }

};

//Ingreso con Google Account

const googleSignIn = async(req, res = response) =>{

    const {id_token} = req.body;

    try {

        const {email, name, image} = await googleVerify(id_token);

        let user = await User.findOne({email});

        if(!user){
            const data = {
                name,
                email,
                phone: 'Por Favor actualice su telefono',
                password: ':P',
                image,
                google: true,
                role: "USER_ROLE"

            };

            user = new User(data);
            await user.save();
        }

        if(!user.status){
            return res.status(401).json({
                msg: 'Hable con el administrador, usuario bloquedo'
            });
        }

        //generar JWT

        const token = await generateJWT(user.id);

        res.json({
            ok: true,
            user,
            token
        })
    } catch (error) {
        res.status(400).json({
            ok: false,
            msg: 'El Token no se pudo verificar'
        });

        
    }


    

}


module.exports = {
    login,
    googleSignIn
};