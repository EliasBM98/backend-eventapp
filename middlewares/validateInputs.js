const {validationResult} = require('express-validator');

/**
 * Middleware para validar los inputs de los formularios.
 * 
 * @param {Object} req - Objeto de la solicitud. 
 * @param {Object} res - Objeto respuesta.
 * @param {Function} next - Funcion para continuar ejecutando progrma.
 */
const validateInputs = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return res.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };
    next();
}

module.exports={
    validateInputs
}
