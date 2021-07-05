const sql = require('../../config/db')


const existeEmailUsuario = ( email = '') => {
    return new Promise ((resolve, reject) =>{
        const consulta= "SELECT * FROM usuarios WHERE Email=? AND Estado=1"
        sql.query(consulta, email, (err, res) => {
            if (err) {
                console.log('error');
                reject(new Error(err));
            }else{
                if (res.length>0) {
                    reject (new Error(`El correo: ${ email }, ya está registrado`))
                }
                resolve (true)
            }   
        });
    })
}

const existeUsuarioPorId = ( id='' ) => {
    return new Promise ((resolve, reject) =>{
        const consulta= "SELECT * FROM usuarios WHERE ID_Usuario=? AND Estado=1"
        sql.query(consulta, id, (err, res) => {
            if (err) {
                console.log('error');
                reject(new Error(err));
            }else{
                if (res.length===0) {
                    reject (new Error(`El Usuario ${ id } no existe `))
                }
                resolve (true)
            }   
        });
    })
 
}


module.exports = {
    existeEmailUsuario,
    existeUsuarioPorId
}