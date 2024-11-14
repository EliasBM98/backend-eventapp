const {validationResult} = require('express-validator');

const validateInputs = (req, res, next) => {
    const errors = validationResult(req);

    if(!errors.isEmpty()){
        return resizeBy.status(400).json({
            ok: false,
            errors: errors.mapped()
        });
    };
    next();
}

module.exports={
    validateInputs
}
