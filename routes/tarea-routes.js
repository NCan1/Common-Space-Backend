const express = require("express");
const router = express.Router();


const {
    listaEspacio,
    crearTarea,
    eliminarTarea,
    editarTarea
} = require ('../controllers/tarea-controller');



router.get('/lista-tareas-espacio/:id', listaEspacio );

router.post('/crear-tarea/:idEspacio', crearTarea );

router.put('/editar-tarea/:id', editarTarea);

router.delete('/eliminar-tarea/:id', eliminarTarea);






module.exports = router;