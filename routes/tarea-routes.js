const express = require("express");
const router = express.Router();


const {
    listaEspacio,
    crearTarea,
    eliminarTarea,
    editarTarea,
    realizarTarea,
    listaRealizadasEspacio,
    realizadasUsuarioEspacio
} = require ('../controllers/tarea-controller');



router.get('/lista-tareas-espacio/:id', listaEspacio );

router.post('/crear-tarea/:idEspacio', crearTarea );

router.put('/editar-tarea/:id', editarTarea);

router.delete('/eliminar-tarea/:id', eliminarTarea);

router.post('/realizar-tarea', realizarTarea);

router.get('/lista-tareas-realizadas-espacio/:id', listaRealizadasEspacio );

router.get('/tareas-realizadas-usuario', realizadasUsuarioEspacio );



module.exports = router;