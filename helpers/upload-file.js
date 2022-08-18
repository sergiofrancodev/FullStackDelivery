const path = require('path');
const { v4: uuidv4 } = require('uuid');

const uploadFile = ( files, validExtensions = ['png', 'jpg', 'jpeg', 'gif'], folder = '' ) => {

    return new Promise((resolve, reject) =>{

        const { file } = files;
        const nameReduce = file.name.split('.');
        const extension = nameReduce[nameReduce.length -1];

    
        //Validar Extension
        if( !validExtensions.includes(extension)){
           return reject(`La extension ${extension} no es permitida, solo se permiten ${validExtensions}`);
        }
    
    const finalName = uuidv4() + '.' + extension;
        
    
        const uploadPath = path.join(__dirname, '../uploads/', folder, finalName);
      
        file.mv(uploadPath, (err) => {
          if (err) {
            reject(err);
          }


          resolve(finalName)
      
        });




    })



}


module.exports = {
    uploadFile
}