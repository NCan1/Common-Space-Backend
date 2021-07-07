const express = require("express");
const router = express.Router();
const {check} = require ("express-validator");


const {validarCampos} = require('../middlewares/validar-campos');
const { validarJWT } = require("../middlewares/validar-jwt");

const {existeEmailUsuario, existeUsuarioPorId} = require('../helpers/validaciones-db/validaciones-usuario');
const { existeEspacioPorId } = require("../helpers/validaciones-db/validaciones-espacio");


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
    descartarAdmin,
    login
} = require ('../controllers/usuario-controller');



router.post('/login', login );

router.get('/lista-usuarios',[
    validarJWT
], lista );

router.get('/lista-usuarios-espacio/:idEspacio',[
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], listaUsuariosEspacio)

router.post('/crear-usuario', [
    check('Nombre', 'El campo Nombre es necesario').not().isEmpty(),
    check('Email', 'El campo Email es necesario').not().isEmpty(),
    check('Password', 'El campo Password es necesario').not().isEmpty(),
    check('Email', 'El correo no es válido').isEmail(),
    check('Email').custom(existeEmailUsuario),
    validarCampos
], crearUsuario);

router.put('/editar-usuario/:id',[
    check('id').custom(existeUsuarioPorId),
    validarCampos
], editarUsuario);

router.delete('/eliminar-usuario/:id',[
    check('id').custom(existeUsuarioPorId),
    validarCampos
], eliminarUsuario);

router.get('/busca-mail-usuario',[
    check('idConsultante').custom(existeUsuarioPorId),
    validarCampos
], buscarMailUsuario );

router.post('/agregar-usuario-espacio', [
    check('idUser').custom(existeUsuarioPorId),
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], agregarAEspacio);

router.delete('/eliminar-usuario-espacio',[
    check('idUser').custom(existeUsuarioPorId),
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], eliminarUsuarioEspacio);

router.put('/asignar-admin',[
    check('idUser').custom(existeUsuarioPorId),
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], asignarAdmin);

router.put('/descartar-admin',[
    check('idUser').custom(existeUsuarioPorId),
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], descartarAdmin);



module.exports = router;