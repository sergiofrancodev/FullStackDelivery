const {User, Category, Role, Product} = require('../models');

const isValidRole = async(role = '') => {

    const roleExists = await Role.findOne({role});
    if( !roleExists){
      throw new Error(`El rol ${role} no esta registrado en la base de datos`);
    }

  }

  const isValidEmail = async (email) =>{
    const  emailExist = await User.findOne({email});
    if(emailExist){
    throw new Error(`El correo ${email} ya esta registrado`);
  }

  };

  const isValidPhone = async(phone) =>{
    const phoneExist = await User.findOne({phone});
    if(phoneExist){
      throw new Error(`ya existe una registro con el telefono ${phone}, solo se permite una cuenta por cada numero`)
    }
  }
  const isValidId = async (id) =>{
    const  idExist = await User.findById(id);
    if(!idExist){
    throw new Error(`El id:  ${id} NO existe`);
  }

  };


  //Funcion personalizada para validar si la categoria existe en la base de datos antes de actualizarla
  const CategoryExistById = async(id) =>{

    const categoryExist = await Category.findById(id);

    if(!categoryExist){
        throw new Error(`La categoria con id: ${id} no esta registrada en la base de datos`);
    }

};

//Funcion personalizada para validar si el producto existe en la base de datos antes de actualizarla
const ProductExistById = async(id) =>{

  const productExist = await Product.findById(id);

  if(!productExist){
      throw new Error(`el prodcuto con id: ${id} no esta registrada en la base de datos`);
  }

};

// Validar colecciones permitidas - imagenes

const allowedCollections = (collection = '', collections = []) =>{

  const include = collections.includes(collection);

  if(!include){
    throw new Error(`La colección ${collection} no es permitida, solo se permiten ${collections}`)
  }

  return true;
}



  module.exports = {
    isValidRole,
    isValidEmail,
    isValidPhone,
    isValidId,
    CategoryExistById,
    ProductExistById,
    allowedCollections
  }