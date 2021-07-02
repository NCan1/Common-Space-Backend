const express = require("express");

const router = express.Router();

const {
    lista, 
    listaUsuariosEspacio,
    crearUsuario,
    editarUsuario,
    eliminarUsuario
} = require ('../controllers/usuario-controller');



router.get('/lista-usuarios', lista );

router.get('/lista-usuarios-espacio/:idEspacio', listaUsuariosEspacio)

router.post('/crear-usuario', crearUsuario);

router.put('/editar-usuario/:id', editarUsuario);

router.delete('/eliminar-usuario/:id', eliminarUsuario);



module.exports = router;