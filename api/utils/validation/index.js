const {check, validationResult} = require("express-validator");

exports.runValidation = (req, res, next) => {
    const errors = validationResult(req)
    if(!errors.isEmpty()) {
        return res.status(400).json({
          status: 400,
          message: errors.array()[0].msg 
        })
    }
    next()
}

exports.registerValidation = [
    check('users_fullname', 'fullname empty').notEmpty(),
    check('users_email', 'email empty').notEmpty().matches(/.+\@.+\..+/).withMessage('check your email'),
    check('users_password',"password empty").notEmpty().isLength({ min: 6 }).withMessage('password must be 6 character'),
    check('users_role', 'role empty').notEmpty().isIn([0,1]).withMessage('role must be 0 or 1')
]

exports.loginValidation = [
    check('users_email', 'email empty').notEmpty(),
    check('users_password',"password empty").notEmpty(),
]