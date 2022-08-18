const {response, request} = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const validateJWT =  async(req = request, res = response, next) =>{
    const token = req.header('x-token');

    if(!token){
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    
    };

   try {

   const {uid} = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

   //leer el usuario que corresponde al uid
   const user = await User.findById( uid );

   if(!user){
    return 
   }

   //Verificar si el uid tiene estado en true
   if(!user.status){
    return res.status(401).json({
        msg: 'Token no valido - usuario no existe en bd'
    })

}
console.log(user.status);


    req.user = user;
    next();


   } catch (error) {
    console.log(error);
    res.status(401).json({
        msg: 'Token no valido'
    })
    
   }

};

module.exports = {
    validateJWT
};