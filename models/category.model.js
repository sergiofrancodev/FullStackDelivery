const {Schema, model} = require('mongoose');


const  CategorySchema = Schema({
    name: {
        type: String,
        required: [true, 'El nombre es es obligatorio'],
        unique: true,
    },
    status: {
        type: Boolean,
        default: true,
        required: true,
    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    image: { type: String},

});

CategorySchema.methods.toJSON = function(){

    const {__v, status, ...data} = this.toObject();
    return data;

}

module.exports = model( 'Category', CategorySchema);