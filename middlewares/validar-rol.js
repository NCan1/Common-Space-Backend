

const esAdminRol = ( req, res, next ) => {

    if ( !req.usuario ) {
        return res.status(500).json({
            msg: 'Se quiere verificar el rol sin validar el token primero'
        });
    }

    const { Nombre } = req.usuario;
    //solo se necesita el ID espacio para determinar el rol del user en dicho espacio
    if ( Tipo_Usuario !== 'ADMIN' ) {
        return res.status(401).json({
            msg: `${ Nombre } no es administrador - No puede hacer esto`
        });
    }

    next();
}



module.exports = {
    esAdminRol
}