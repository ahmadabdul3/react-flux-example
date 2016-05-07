var express = require('express');
var router = express.Router();
require('node-jsx').install();
var React = require('react');
var ReactDom = require('react-dom/server');
var passwordManager = require('../my-modules/password-manager/password-manager.js');
var LoginForm = React.createFactory(
    require('../react-components/login-form/jsx/login-form.jsx')
);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', 
  { 
    loginForm: ReactDom.renderToString(LoginForm())
  });
});

router.post('/checkStrength', function(req, res, next) {
    var password = Object.keys(req.body)[0];
    passwordManager.checkStrength(password, function(err, response) {
        if(err){return next(err);}
        res.json(response);
    });
});

module.exports = router;
