var express = require('express');
var router = express.Router();

// var Products = require('../models/product');

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

/* GET home page. */
router.get('/', isAuthenticated, function(req, res, next) {
  // Products.find(function(err, result){
    res.render('employees', {title: 'Salariers'});
  // });

});


router.get('/add', isAuthenticated, function(req, res, next) {
  // res.send('respond with a resource toto');

  res.render('addemployee', {title: "Salarier"});
});

module.exports = router;
