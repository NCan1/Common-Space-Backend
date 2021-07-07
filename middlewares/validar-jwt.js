const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario-model');

const validarJWT = async ( req, res , next ) => {

    const token = req.header('el-famoso-token');

    if ( !token ) {
        return res.status(401).json({
            ok: false,
            msg: 'No hay token en la petición'
        });
    }

    try {
        const { idUser } = jwt.verify(
            token,
            process.env.SECRETORPRIVATEKEY 
        );

        const usuario = await Usuario.buscarPorId(idUser);

        if( usuario.length===0 ) {
            return res.status(401).json({
                msg: 'Token no válido - usuario no existe DB'
            })
        }

        req.usuario = usuario[0];
        next();
        
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'Token no válido'
        });
    }  
}


module.exports = {
    validarJWT
}
