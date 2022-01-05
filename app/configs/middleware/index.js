const { validationResult } = require('express-validator');

module.exports = (req, res, next) => {
    
    req.validate = () => {
        const errors = validationResult(req).array();
        if (errors.length == 0) return;
        throw new Error(`${errors[0].param} : ${errors[0].msg}`)
    };
    
    res.error = (err, status = 400) => { 
        res.status(status).json( { msg: err.message || err.msg  || 'Validation failed' } );
    };

    next();
    
}