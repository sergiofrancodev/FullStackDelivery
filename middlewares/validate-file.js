const validateFileUpload = (req, res = response, netx) =>{

    if (!req.files || Object.keys(req.files).length === 0 || !req.files.file) {
       return res.status(400).json({msg: 'No hay archivos que subir'});
        
      }

    netx();

}

module.exports = {
    validateFileUpload
}