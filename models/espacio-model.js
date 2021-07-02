const sql = require('../config/db')



const Espacio = function () {};

Espacio.listaEspaciosUsuario = (id, result) => {
    const sentencia1= "SELECT e.Nombre espacio, e.Descripcion descripcion, ue.Tipo_Usuario rol FROM espacios AS e";
    const sentencia2= " JOIN usuarios_espacios AS ue ON ue.ID_Espacio=e.ID_Espacio";
    const sentencia3= ` WHERE ue.ID_Usuario=${id} AND e.Estado=1 ORDER BY e.Nombre`;
    const consulta = (sentencia1+sentencia2+sentencia3);

    sql.query(consulta, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Espacio.crearEspacio = (espacio, idUser, result) =>{
    const consulta = ("INSERT INTO Espacios SET ?");
    sql.query(consulta , espacio, (err, resDB) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 

        const userEsp = {"ID_Usuario": idUser, "ID_Espacio": espacio.ID_Espacio, "Tipo_Usuario":"ADMIN"} //id esp debe ser: resDB.insertId cuando se corrija el modelo de BD
        sql.query("INSERT INTO usuarios_espacios SET ?", userEsp, (err2,res2) => {
            if(err2){
                console.log("error: ", err2);
                result(err, null);
                return; 
            }
       });
        result(null, { success: true });
    });
};


Espacio.editarEspacio = (idEspacio, data, result) => {
    const consulta = ("UPDATE espacios SET ? WHERE ID_Espacio = "+ idEspacio);
    sql.query(consulta, data, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}

Espacio.eliminarEspacio = (idEspacio, result) =>{
    const consulta = ("UPDATE espacios SET Estado=0 WHERE ID_Espacio = "+ idEspacio);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}




module.exports = Espacio;