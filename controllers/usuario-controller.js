const Usuario = require('../models/usuario-model');




lista = (req, res) => {
  Usuario.lista((err, usuarioDB) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        err
      });
    }
    res.status(200).send({
      ok: true,
      usuarios: usuarioDB
    });
  });
}


listaUsuariosEspacio = (req, res) => {
  const {idEspacio} = req.params;
  Usuario.listaUsuariosEspacio(idEspacio, (err, data) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se solicitaba la lista de usuarios'
      });
    }
    res.status(200).send({
      ok: true,
      usuarios: data
    });
  });
}


crearUsuario = (req, res) => {  
  const usuario = req.body;
  Usuario.crearUsuario(usuario, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se registraba un nuevo usuario'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Usuario creado exitosamente'
    });
  });
};


editarUsuario = (req, res) =>{
  const {ID_Usuario, Estado, ...resto} = req.body;
  const {id} = req.params;  
  Usuario.editarUsuario(id, resto, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se editaba al usuario'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Usuario editado exitosamente'
    });
  });  
};
  
  
eliminarUsuario = (req,res) =>{
    const {id} = req.params;  
    Usuario.eliminarUsuario(id, (err, data) => {
      if (err)
        res.status(500).send({
        sucess: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras se eliminaba al usuario'
        });
      else 
        res.status(201).send({
        success: true,
        message: 'Usuario eliminado exitosamente'
      });
    });  
};


buscarMailUsuario = (req, res) => {
  const {mailConsultado} = req.body;
  Usuario.buscarMailUsuario(mailConsultado, (err, data) => {
    if (err) {
      return res.status(500).send({
        ok: false,
        error: err.message,
        message: 'Ha ocurrido un error interno mientras buscaba al usuario'
      });
    }
    res.status(200).send({
      ok: true,
      usuario: data
    });
  });
}


agregarAEspacio = (req, res) => {  
  const {idUser, idEspacio} = req.body;
  Usuario.agregarAEspacio(idUser, idEspacio, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se agregaba un nuevo usuario'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Usuario agregado exitosamente'
    });
  });
};


eliminarUsuarioEspacio = (req,res) =>{
  const {idUser, idEspacio} = req.body;  
  Usuario.eliminarUsuarioEspacio(idUser, idEspacio, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se eliminaba al usuario'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Usuario eliminado exitosamente'
    });
  });  
};


asignarAdmin = (req,res) =>{
  const {idUser, idEspacio} = req.body;
  Usuario.asignarAdmin(idUser, idEspacio, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se ejecutaba la operación'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Operación realizada exitosamente'
    });
  });  
};


descartarAdmin = (req,res) =>{
  const {idUser, idEspacio} = req.body;
  Usuario.descartarAdmin(idUser, idEspacio, (err, data) => {
    if (err)
      res.status(500).send({
      sucess: false,
      error: err.message,
      message: 'Ha ocurrido un error interno mientras se ejecutaba la operación'
      });
    else 
      res.status(201).send({
      success: true,
      message: 'Operación realizada exitosamente'
    });
  });  
};

  module.exports = {
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
  }