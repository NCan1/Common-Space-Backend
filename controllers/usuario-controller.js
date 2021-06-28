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
    }
  
    );
  }


  module.exports = {
      lista
  }