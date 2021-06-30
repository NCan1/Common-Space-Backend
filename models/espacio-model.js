const sql = require('../config/db')



const Espacio = function () {};

Espacio.lista = result => {
    sql.query("SELECT * FROM espacios ", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};







module.exports = Espacio;