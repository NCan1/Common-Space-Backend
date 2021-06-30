const Tarea = require('../models/tarea-model');




listaEspacio = (req, res) => {
    const {id} = req.params;
    Tarea.listaEspacio(id, (err, tareasDB) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          error: err.message,
          message: 'Ha ocurrido un error interno mientras se solicitaba la lista de tareas'
        });
      }
      res.status(200).send({
        ok: true,
        tareas: tareasDB
      });
    });
}


crearTarea = (req, res) => {  
    const tarea = req.body;
    const {idEspacio} = req.params;

    Tarea.crearTarea(tarea, idEspacio, (err, data) => {
      if (err)
        res.status(500).send({
            sucess: false,
            error: err.message,
            message: 'Ha ocurrido un error interno mientras se registraba un nuevo tarea'
        });
      else 
        res.status(201).send({
            success: true,
            message: 'Tarea creada correctamente'
      });
    });
};


editarTarea = (req, res) =>{
    const {ID_Tarea, Estado, ...resto} = req.body;
    const {id} = req.params;  

    Tarea.editarTarea(id, resto, (err, data) => {
        if (err)
            res.status(500).send({
            sucess: false,
            error: err.message,
            message: 'Ha ocurrido un error interno mientras se editaba la tarea'
            });
        else 
            res.status(201).send({
                success: true,
                message: 'Tarea editada correctamente'
      });
    });  
};


eliminarTarea = (req,res) =>{
    const {id} = req.params;  
    Tarea.eliminarTarea(id, (err, data) => {
        if (err)
            res.status(500).send({
            sucess: false,
            error: err.message,
            message: 'Ha ocurrido un error interno mientras se eliminaba la tarea'
            });
        else 
            res.status(201).send({
                success: true,
                message: 'Tarea eliminada correctamente'
      });
    });  
  };


  module.exports = {
      listaEspacio,
      crearTarea,
      editarTarea,
      eliminarTarea
  }