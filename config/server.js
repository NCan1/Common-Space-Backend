const express = require('express');
const cors = require('cors');
const morgan = require('morgan');


class Server {

    constructor() {
        this.app  = express();
        this.port = process.env.PORT;

        this.paths = {
            usuarios: '/api/usuarios',
            espacios: '/api/espacios',
            tareas: '/api/tareas'
        }

        // Middlewares
        this.middlewares();

        // Rutas
        this.routes();
    }



    middlewares() {

        // CORS
        this.app.use( cors() );

        //Morgan
        this.app.use(morgan('dev'));

        // Lectura y parseo del body
        this.app.use( express.json() );

    }

    routes() {
        this.app.use(this.paths.usuarios, require('../routes/usuario-routes'));
        this.app.use(this.paths.espacios, require('../routes/espacio-routes'));
        this.app.use(this.paths.tareas, require('../routes/tarea-routes'));
    }

    listen() {
        this.app.listen( this.port, () => {
            console.log('Servidor corriendo en puerto', this.port );
        });
    }

}




module.exports = Server;
