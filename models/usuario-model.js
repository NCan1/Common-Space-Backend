const sql = require('../config/db')
var bcrypt = require('bcryptjs');


const Usuario = function () {};


Usuario.login = (usuario, result) => {
    const {Email, Password} = usuario;

    const consulta = "SELECT * FROM usuarios WHERE Email=? AND Estado=1"
    sql.query(consulta, Email, (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        if (!res.length) {
            result( "not_found" , null);
            return;
        }
        // if (!bcrypt.compareSync(rawContrasena, res[0].Contrasena)) {
        //     result({ kind: "bad_pass" }, null);
        //     return;
        // }

        if (Password!==res[0].Password) {
            result( "bad_pass" , null);
            return;
        }
        result(null, res);
    });
};


// Se usa únicamente dentro de la validación del JWT
Usuario.buscarPorId = (idUser) =>{
    return new Promise ((resolve, reject) =>{
        const consulta= "SELECT * FROM usuarios WHERE ID_Usuario=? AND Estado=1" 
        sql.query(consulta, idUser, (err, res) => {
            if (err) {
                console.log("error: ", err);
                reject(null);
            }
            resolve(res);
        });
    })
}


Usuario.lista = result => {
    sql.query("SELECT * FROM usuarios ", (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Usuario.listaUsuariosEspacio = (idEspacio, result) => {
    const sentencia1= "SELECT u.Nombre nombre, u.Email email, ue.Tipo_Usuario rol FROM usuarios AS u";
    const sentencia2= ` JOIN usuarios_espacios AS ue ON ue.ID_Usuario=u.ID_usuario`;
    const sentencia3= ` WHERE ue.ID_Espacio=${idEspacio} AND u.Estado=1 ORDER BY u.Nombre`;
    const consulta = (sentencia1+sentencia2+sentencia3);

    sql.query(consulta, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Usuario.crearUsuario = (usuario, result) =>{
    const consulta = ("INSERT INTO usuarios SET ?");
    sql.query(consulta, usuario, (err, resDB) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 
        result(null, { success: true });
    });
};


Usuario.editarUsuario = (idUsuario, data, result) => {
    const consulta = ("UPDATE usuarios SET ? WHERE ID_Usuario="+ idUsuario);
    sql.query(consulta, data, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}

Usuario.eliminarUsuario = (idUsuario, result) =>{
    const consulta = ("UPDATE usuarios SET Estado=0 WHERE ID_Usuario = "+ idUsuario);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}

Usuario.listaUsuariosEspacio = (idEspacio, result) => {
    const sentencia1= "SELECT u.Nombre nombre, u.Email email, ue.Tipo_Usuario rol FROM usuarios AS u";
    const sentencia2= ` JOIN usuarios_espacios AS ue ON ue.ID_Usuario=u.ID_usuario`;
    const sentencia3= ` WHERE ue.ID_Espacio=${idEspacio} AND u.Estado=1 ORDER BY u.Nombre`;
    const consulta = (sentencia1+sentencia2+sentencia3);

    sql.query(consulta, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};



Usuario.buscarMailUsuario = (email, result) =>{
    const consulta= "SELECT ID_Usuario id, Nombre nombre, Email email FROM usuarios WHERE EMAIL= ?" 

    sql.query(consulta, email, (err, res) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Usuario.agregarAEspacio = (idUser, idEspacio, result) =>{
    const userEsp = {"ID_Usuario": idUser, "ID_Espacio": idEspacio, "Tipo_Usuario":"GUEST"} 
    sql.query("INSERT INTO usuarios_espacios SET ?", userEsp, (err,res) => {
        if(err){
            console.log("error: ", err);
            result(err, null);
            return; 
        }
        result(null, res);
   });
};


Usuario.eliminarUsuarioEspacio = (idUsuario, idEspacio, result) =>{//Esta función también se utiliza cuando un usuario quiere salir de un espacio
    const consulta = ("DELETE FROM usuarios_espacios WHERE ID_Usuario="+ idUsuario +" AND ID_Espacio=" + idEspacio);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}


Usuario.asignarAdmin = (idUsuario, idEspacio, result) =>{
    const consulta = ("UPDATE usuarios_espacios SET Tipo_Usuario='ADMIN' WHERE ID_Usuario="+ idUsuario +" AND ID_Espacio=" + idEspacio);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}

Usuario.descartarAdmin = (idUsuario, idEspacio, result) =>{
    const consulta = ("UPDATE usuarios_espacios SET Tipo_Usuario='GUEST' WHERE ID_Usuario="+ idUsuario +" AND ID_Espacio=" + idEspacio);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}





module.exports = Usuario;