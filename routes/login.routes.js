// routes/user.routes.js
const express = require("express");
const session = require('express-session');
const router = express.Router();
const { check, validationResult } = require('express-validator');

router.post('/login-user',
    [
        check('name')
            .not()
            .isEmpty()
            .withMessage('Name is required')
            .matches(/^[A-Za-z0-9\s]+$/).withMessage('Special character is not allowed')
            ,
        check('password')
            .isEmpty().withMessage('Password is required')
            ,
    ], (req, res) => {
        var errors = validationResult(req).array();
        if (errors) {
            req.session.errors = errors;
            req.session.success = false;
            res.redirect('/login');
        } else {
            req.session.success = true;
            res.redirect('/login');
        }
    });
router.get('/', function (req, res) {
    res.render('login', {
        success: req.session.success,
        errors: req.session.errors
    });
    req.session.errors = null;
});

module.exports = router;