const { Schema, model} = require('mongoose');


const UserSchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es obligatorio'],
    },
    email: {
        type: String,
        required: [true, 'El correo es obligatorio'],
        unique: true
    },
    phone: {
        type: String,
        required: [true, 'El telefono es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contraseña obligatoria']
    },
    image: {
        type: String,
    },
    role: {
        type: String,
        require: true,
        emun: ['ADMIN_ROLE', 'RESTAURANT_ROLE', 'USER_ROLE']
    },
    status: {
        type: Boolean,
        default: true,
    },
    google: {
        type: Boolean,
        default: false
    }
});


UserSchema.methods.toJSON = function(){

    const {__v, password, _id, ...user} = this.toObject();
    user.uid = _id;
    return user;

}

module.exports = model('User', UserSchema);