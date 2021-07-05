const sql = require('../config/db')


const Tarea = function () {};

Tarea.listaEspacio = (IdEspacio, result) => {
    const consulta = ("SELECT * FROM tareas AS t JOIN tareas_espacios AS te ON t.ID_Tarea=te.ID_Tarea WHERE te.ID_Espacio=" + IdEspacio +" AND t.Estado=1 ORDER BY t.Nombre");
    sql.query(consulta , (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Tarea.crearTarea = (tarea, idEspacio, result) =>{
    const consulta = ("INSERT INTO tareas SET ?");
    sql.query(consulta , tarea, (err, resDB) => {
        if (err) {
            console.log("error: ", err);
            result(err, null);
            return;
        } 

        const tarEsp = {"ID_Tarea": resDB.insertId , "ID_Espacio": parseInt(idEspacio, 10)}
        sql.query("INSERT INTO tareas_espacios SET ?", tarEsp, (err2,res2) => {
            if(err2){
                console.log("error: ", err2);
                result(err, null);
                return; 
            }
       });
        result(null, { success: true });
    });
};


Tarea.editarTarea = (idTarea, tarea, result) => {
    const consulta = ("UPDATE tareas SET ? WHERE ID_Tarea = "+ idTarea);
    sql.query(consulta, tarea, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}

Tarea.eliminarTarea = (idTarea, result) =>{
    const consulta = ("UPDATE tareas SET Estado=0 WHERE ID_Tarea = "+ idTarea);
    sql.query(consulta, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}


Tarea.realizarTarea = (ids, result) =>{
    const data = {
        Fecha: new Date(),
        ID_Tarea: ids.idTarea,
        ID_Usuario: ids.idUser
    };
  
    const consulta = ("INSERT INTO usuarios_tareas SET ? ");
    sql.query(consulta, data, (err,res) =>{
        if(err){
            console.log("error: ", err);
            result (err, null);
            return;
        }
        result(null, {success:true});
    });
}


Tarea.listaRealizadasEspacio = (ids, result) => {
    const sentencia1 = ("SELECT t.nombre tarea, t.Puntaje puntaje, t.descripcion descripcion, c.Nombre categoria, u.Nombre user, ut.Fecha fecha FROM tareas AS t"); 
    const sentencia2 = (" JOIN tareas_espacios AS te ON te.ID_Tarea=t.ID_Tarea")
    const sentencia3 = (" JOIN usuarios_tareas AS ut ON ut.ID_Tarea=t.ID_Tarea")
    const sentencia4 = (" JOIN categorias AS c ON c.ID_Categoria=t.ID_Categoria JOIN usuarios AS u ON u.ID_Usuario=ut.ID_Usuario")
    const sentencia5 = (" WHERE te.ID_Espacio=" + IdEspacio +" AND t.Estado=1")
    const consulta = ( sentencia1+sentencia2+sentencia3+sentencia4+sentencia5);
    sql.query(consulta , (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};


Tarea.realizadasUsuarioEspacio = (ids, result) => {
    const sentencia1 = ("SELECT t.nombre tarea, t.Puntaje puntaje, t.descripcion descripcion, c.Nombre categoria, u.Nombre user, ut.Fecha fecha FROM tareas AS t"); 
    const sentencia2 = (" JOIN tareas_espacios AS te ON te.ID_Tarea=t.ID_Tarea")
    const sentencia3 = (" JOIN usuarios_tareas AS ut ON ut.ID_Tarea=t.ID_Tarea")
    const sentencia4 = (" JOIN categorias AS c ON c.ID_Categoria=t.ID_Categoria JOIN usuarios AS u ON u.ID_Usuario=ut.ID_Usuario")
    const sentencia5 = (" WHERE te.ID_Espacio=" + ids.idEspacio +" AND u.ID_Usuario="+ ids.idUser +" AND t.Estado=1")
    const consulta = ( sentencia1+sentencia2+sentencia3+sentencia4+sentencia5);
    sql.query(consulta , (err, res) => {
        if (err) {
            result(err, null);
            return;
        }
        result(null, res);
    });
};







module.exports = Tarea;