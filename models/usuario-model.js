const sql = require('../config/db')
var bcrypt = require('bcryptjs');

// Constructor
const Usuario = function () {};

Usuario.lista = result => {
    sql.query("SELECT * FROM usuarios ", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};







module.exports = Usuario;