const express = require("express");

const router = express.Router();

const {
    lista, 
    listaUsuariosEspacio,
    crearUsuario,
    editarUsuario,
    eliminarUsuario,
    buscarMailUsuario,
    agregarAEspacio,
    eliminarUsuarioEspacio,
    asignarAdmin,
    descartarAdmin
} = require ('../controllers/usuario-controller');



router.get('/lista-usuarios', lista );

router.get('/lista-usuarios-espacio/:idEspacio', listaUsuariosEspacio)

router.post('/crear-usuario', crearUsuario);

router.put('/editar-usuario/:id', editarUsuario);

router.delete('/eliminar-usuario/:id', eliminarUsuario);

router.get('/busca-mail-usuario', buscarMailUsuario );

router.post('/agregar-usuario-espacio', agregarAEspacio);

router.delete('/eliminar-usuario-espacio', eliminarUsuarioEspacio);

router.put('/asignar-admin', asignarAdmin);

router.put('/descartar-admin', descartarAdmin);



module.exports = router;