const express = require('express');
const cors = require('cors');


class Server {


    constructor(){

        this.app = express();
        this.port = process.env.PORT;
        this.usersPath = '/api/users';

        //Midelwares
        
        this.middelwares();

        //Routs app
        this.routes();
    }

    middelwares(){

        // Lectura y parse del body
        this.app.use( express.json());
        //CORS
        this.app.use(cors());

    }

    routes(){


        this.app.use(this.usersPath, require('../routes/users.routes'));

        
    }

    listen(){
        this.app.listen(this.port,  () => {
            console.log('Servidor corriendo en el puerto ', this.port)
        });
    }



}


module.exports = Server;