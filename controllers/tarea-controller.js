const Tarea = require('../models/tarea-model');




listaEspacio = (req, res) => {
  const {idEspacio} = req.params;
  Tarea.listaEspacio(idEspacio, (err, data) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se solicitaba la lista de tareas'
      });
    }
    res.status(200).send({
      ok: true,
      tareas: data
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


realizarTarea = (req,res) =>{
  const ids = req.body;  
  Tarea.realizarTarea(ids, (err, data) => {
      if (err)
          res.status(500).send({
          sucess: false,
          error: err.message,
          message: 'Ha ocurrido un error interno mientras se asginaba como tarea realizada'
          });
      else 
          res.status(201).send({
              success: true,
              message: 'Tarea realizada correctamente'
    });
  });  
};


listaRealizadasEspacio = (req, res) => {
  const {id} = req.params;
  Tarea.listaRealizadasEspacio(id, (err, tareasDB) => {
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

realizadasUsuarioEspacio = (req, res) => {
  const ids = req.body; 
  Tarea.realizadasUsuarioEspacio(ids, (err, tareasDB) => {
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
  


module.exports = {
  listaEspacio,
  crearTarea,
  editarTarea,
  eliminarTarea,
  realizarTarea,
  listaRealizadasEspacio,
  realizadasUsuarioEspacio
}