const express = require("express");

const router = express.Router();

const {
    listaEspaciosUsuario, 
    crearEspacio,
    editarEspacio,
    eliminarEspacio
} = require('../controllers/espacio-controller');


router.get('/lista-espacios-usuario/:id', listaEspaciosUsuario)

router.post('/crear-espacio/:idUser', crearEspacio);

router.put('/editar-espacio/:id', editarEspacio);

router.delete('/eliminar-espacio/:id', eliminarEspacio);



module.exports = router;