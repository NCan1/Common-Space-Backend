const jwt = require('jsonwebtoken');


const generarJWT = (objUser) => {
    return new Promise( async (resolve, reject) => {
        //console.log(objUser);
        let payload = {  };
        Object.assign(payload, objUser);
    
        jwt.sign( payload, process.env.SECRETORPRIVATEKEY , { 
            expiresIn: '1h'
        }, (err, token ) => {

            if ( err ){
                console.log(err);
                reject('No se pudo generar el token');
            }

            resolve( token );

        })


    })
}



module.exports = {
    generarJWT
}