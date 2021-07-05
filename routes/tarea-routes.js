const express = require("express");
const router = express.Router();
const {check} = require("express-validator");


const {validarCampos} = require('../middlewares/validar-campos');
const { existeTareaPorId } = require("../helpers/validaciones-db/validaciones-tarea");
const { existeEspacioPorId } = require("../helpers/validaciones-db/validaciones-espacio");
const { existeUsuarioPorId } = require('../helpers/validaciones-db/validaciones-usuario');


const {
    listaEspacio,
    crearTarea,
    eliminarTarea,
    editarTarea,
    realizarTarea,
    listaRealizadasEspacio,
    realizadasUsuarioEspacio
} = require ('../controllers/tarea-controller');



router.get('/lista-tareas-espacio/:idEspacio',[
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], listaEspacio );

router.post('/crear-tarea/:idEspacio',[
    check('idEspacio').custom(existeEspacioPorId),
    check('Nombre', 'El campo Nombre es necesario').not().isEmpty(),
    check('Puntaje', 'El campo Puntaje es necesario').not().isEmpty(),
    check('ID_Categoria', 'El campo Categoría es necesario').not().isEmpty(),
    check('ID_Periodicidad', 'El campo Periodicidad es necesario').not().isEmpty(),
    validarCampos
], crearTarea );

router.put('/editar-tarea/:id',[
    check('id').custom(existeTareaPorId),
    validarCampos
], editarTarea);

router.delete('/eliminar-tarea/:id',[
    check('id').custom(existeTareaPorId),
    validarCampos
], eliminarTarea);

router.post('/realizar-tarea',[
    check('idUser').custom(existeUsuarioPorId),
    check('idTarea').custom(existeTareaPorId),
    validarCampos
], realizarTarea);

router.get('/lista-tareas-realizadas-espacio/:id',[
    check('id').custom(existeEspacioPorId),
    validarCampos
], listaRealizadasEspacio );

router.get('/tareas-realizadas-usuario',[
    check('idUser').custom(existeUsuarioPorId),
    check('idEspacio').custom(existeEspacioPorId),
    validarCampos
], realizadasUsuarioEspacio );



module.exports = router;