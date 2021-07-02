const Espacio = require('../models/espacio-model');




listaEspaciosUsuario = (req, res) => {
    const {id} = req.params;
    Espacio.listaEspaciosUsuario(id, (err, data) => {
      if (err) {
        return res.status(500).send({
          ok: false,
          error: err.message,
          message: 'Ha ocurrido un error interno mientras se solicitaba la lista de espacios'
        });
      }
      res.status(200).send({
        ok: true,
        espacios: data
      });
    });
}


crearEspacio = (req, res) => {  
    const espacio = req.body;
    const {idUser} = req.params;
    Espacio.crearEspacio(espacio, idUser, (err, data) => {
      if (err)
        res.status(500).send({
        sucess: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se registraba un nuevo espacio'
        });
      else 
        res.status(201).send({
        success: true,
        message: 'Espacio creado correctamente'
      });
    });
};


editarEspacio = (req, res) =>{
    const {ID_Espacio, Estado, ...resto} = req.body;
    const {id} = req.params;  
    Espacio.editarEspacio(id, resto, (err, data) => {
      if (err)
        res.status(500).send({
        sucess: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se editaba el espacio'
        });
      else 
        res.status(201).send({
        success: true,
        message: 'Espacio editado correctamente'
      });
    });  
  };
  
  
eliminarEspacio = (req,res) =>{
    const {id} = req.params;  
    Espacio.eliminarEspacio(id, (err, data) => {
      if (err)
        res.status(500).send({
        sucess: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se eliminaba el espacio'
        });
      else 
        res.status(201).send({
        success: true,
        message: 'Espacio eliminado correctamente'
      });
    });  
};



module.exports = {
    listaEspaciosUsuario,
    crearEspacio,
    editarEspacio,
    eliminarEspacio
};