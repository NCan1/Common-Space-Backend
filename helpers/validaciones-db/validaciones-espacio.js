const sql = require('../../config/db')


const existeEspacioPorId = ( id='' ) => {
    return new Promise ((resolve, reject) =>{
        const consulta= "SELECT * FROM espacios WHERE ID_Espacio=? AND Estado=1"
        sql.query(consulta, id, (err, res) => {
            if (err) {
                console.log('error');
                reject(new Error(err));
            }else{
                if (res.length===0) {
                    reject (new Error(`El Espacio ${ id } no existe `))
                }
                resolve (true)
            }   
        });
    })
 
}


module.exports = {
    existeEspacioPorId
}