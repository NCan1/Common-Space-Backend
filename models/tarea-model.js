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







module.exports = Tarea;