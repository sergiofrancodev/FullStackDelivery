const {response, request} = require('express');


const isAdminRole = (req = request, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    };
    const {role, name} = req.user;

    if( role !== 'ADMIN_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - No puedehacer esto `
        });
    }

    next();
}

const isRestaurantRoleAndAdmin = (req = request, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    };
    const {role, name} = req.user;

    if( role !== 'ADMIN_ROLE' && 'RESTAURANT_ROLE'){
        return res.status(401).json({
            msg: `${name} no es administrador - No puedehacer esto `
        });
    }

    next();
}

const haveRole = (...roles) =>{
    return (req = request, res = response, next) =>{

    if(!req.user){
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    };

    if(!roles.includes(req.user.rol)){

        return res.status(401).json({
            msg: `El Servicio requiere uno de estos roles: ${roles}`
        })

    }

   



        next();

    }

}


module.exports = {
    isAdminRole,
    haveRole,
    isRestaurantRoleAndAdmin
}