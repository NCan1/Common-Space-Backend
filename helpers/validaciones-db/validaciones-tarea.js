const sql = require('../../config/db')


const existeTareaPorId = ( id='' ) => {
    return new Promise ((resolve, reject) =>{
        const consulta= "SELECT * FROM tareas WHERE ID_Tarea=? AND Estado=1"
        sql.query(consulta, id, (err, res) => {
            if (err) {
                console.log('error');
                reject(new Error(err));
            }else{
                if (res.length===0) {
                    reject (new Error(`La Tarea ${ id } no existe `))
                }
                resolve (true)
            }   
        });
    })
 
}



module.exports = {
    existeTareaPorId
}