var express = require('express');
var router = express.Router();
require('node-jsx').install();
var React = require('react');
var ReactDom = require('react-dom/server');
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

module.exports = router;
