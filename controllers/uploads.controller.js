const path = require('path');
const fs = require('fs');
const cloudinary = require('cloudinary').v2
cloudinary.config(process.env.CLOUDINARY_URL)
const { response } = require("express");
const { uploadFile } = require("../helpers");
const {User, Product, Category} = require('../models')

const fileUpload = async(req, res = response) =>{
    

    try { 
        const name =  await uploadFile(req.files, undefined, 'imgs');
        // const name =  await uploadFile(req.files, ['pdf'], 'pdfs');
        res.json({
            name
        })
    } catch (error) {
        res.status(400).json({
            msg: error
        })
    }
}

// const updateImge = async(req, res = response) =>{
    
//     const {id, collection} = req.params;

//     let model;

//     switch (collection) {
//         case 'users':
//             model = await User.findById(id);
//             if(!model){
//                 return res.status(400).json({
//                     msg: `No existe un usuario con el id ${id}`
//                 });
//             }
//         break;

//         case 'products':
//             model = await Product.findById(id);
//             if(!model){
//                 return res.status(400).json({
//                     msg: `No existe un producto con el id ${id}`
//                 });
//             }

//         break;

//         case 'categories':
//             model = await Category.findById(id);
//             if(!model){
//                 return res.status(400).json({
//                     msg: `No existe una categoria con el id ${id}`
//                 });
//             }

//         break;

//         default:
//             return res.status(500).json({msg: 'Se me olvido validar esto'});
//     }

    
    
//     try {
//         //Limpiar imagenes previas
//     if(model.image){
//         //borrar la imagen del server
//         const pathImage = path.join(__dirname, '../uploads', collection, model.image);
//         if(fs.existsSync(pathImage)){
//             fs.unlinkSync(pathImage);
//         }
    
//     }
        
//     } catch (error) {
//         res.status(500).json('Se me olvido programar esto')
        
//     }

//     const name =  await uploadFile(req.files, undefined, collection);

//     model.image = name;

//     await model.save();


//     res.json({
//        model
//     })

// }

const updateImgeCloudinary = async(req, res = response) =>{
    
    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

        break;

        case 'categories':
            model = await Category.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe una categoria con el id ${id}`
                });
            }

        break;

        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    
    

    //Limpiar imagenes previas
    if(model.image){

    //borrar la imagen del server
const nameArr = model.image.split('/');
const name = nameArr[nameArr.length -1];
const [ public_id ] = name.split('.');
cloudinary.uploader.destroy(public_id);
    
    }

    //Subir Imagen a Cloudinary
    const {tempFilePath} = req.files.file;
    const { secure_url } = await cloudinary.uploader.upload(tempFilePath)
    model.image = secure_url;
    await model.save();
        
    res.json({
       model
    })

}

const showImage = async(req, res = response) =>{

    const {id, collection} = req.params;

    let model;

    switch (collection) {
        case 'users':
            model = await User.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe un usuario con el id ${id}`
                });
            }
        break;

        case 'products':
            model = await Product.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe un producto con el id ${id}`
                });
            }

        break;

        case 'categories':
            model = await Category.findById(id);
            if(!model){
                return res.status(400).json({
                    msg: `No existe una categoria con el id ${id}`
                });
            }

        break;

        default:
            return res.status(500).json({msg: 'Se me olvido validar esto'});
    }

    
    
    try {
        //Limpiar imagenes previas
    if(model.image){
        //borrar la imagen del server
        const pathImage = path.join(__dirname, '../uploads', collection, model.image);
        if(fs.existsSync(pathImage)){
           return res.sendFile(pathImage)
        }
    
    }
        
    } catch (error) {
        res.status(500).json({error})
        
    }

    const defaultImage = path.join(__dirname, '../assets/no-image.jpg');

    res.sendFile(defaultImage)
}

module.exports = {
    fileUpload,
    showImage, 
    updateImgeCloudinary
}