// routes/user.routes.js
const express = require("express");
const session = require('express-session');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.get('/', function (req, res) {
    res.render('/regist', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null
    ;
});

router.post('/create-user',
    [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name is required'),
        check('email', 'Email is required')
            .isEmail(),
        check('password', 'Password is requried')
            .isLength({ min: 8 }).withMessage('Password Must Be at Least 8 Characters')
            .matches('[0-9]').withMessage('Password Must Contain a Number')
            .matches('[A-Z]').withMessage('Password Must Contain an Uppercase Letter')
            .custom((val, { req, loc, path }) => {
                if (val !== req.body.confirm_password) {
                    throw new Error("Passwords don't match");
                } else {
                    return value;
                }
            }),
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/regist');
        } else {
            req.session.success = true;
            res.redirect('/regist');
        }
    });



module.exports = router;