const express = require("express");
const router = express.Router();
const {check} = require("express-validator");


const {validarCampos} = require('../middlewares/validar-campos');
const { existeEspacioPorId } = require("../helpers/validaciones-db/validaciones-espacio");
const { existeUsuarioPorId } = require('../helpers/validaciones-db/validaciones-usuario');


const {
    listaEspaciosUsuario, 
    crearEspacio,
    editarEspacio,
    eliminarEspacio
} = require('../controllers/espacio-controller');


router.get('/lista-espacios-usuario/:idUser',[
    check('idUser').custom(existeUsuarioPorId),
    validarCampos
], listaEspaciosUsuario)

router.post('/crear-espacio/:idUser',[
    check('Nombre', 'El campo Nombre es necesario').not().isEmpty(),
    check('Descripcion', 'El campo Descripción es necesario').not().isEmpty(),
    check('idUser').custom(existeUsuarioPorId),
    validarCampos
], crearEspacio);

router.put('/editar-espacio/:id',[
    check('id').custom(existeEspacioPorId),
    validarCampos
], editarEspacio);

router.delete('/eliminar-espacio/:id',[
    check('id').custom(existeEspacioPorId),
    validarCampos
], eliminarEspacio);



module.exports = router;