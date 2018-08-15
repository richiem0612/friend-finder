// Dependencies
var express = require("express");
var app = express();
var bodyParser = require("body-parser");
var path = require("path");


var PORT = process.env.PORT || 8080;

// ==================================================================

//parse apllication/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: true }))
// parse various different custom JSON types as JSON
app.use(bodyParser.json({ type: 'application/*+json' }))
// parse some custom types into a BUFFER
app.use(bodyParser.raw({ type: 'application/vnd.custom-type' }))
// parse an HTML body into a string
app.use(bodyParser.text({ type: 'text/html' }))

// ==================================================================

//ROUTES
// API route file
require("./app/routing/apiRoutes.js")(app);
// HTML route file
require("./app/routing/htmlRoutes.js")(app);
// ==================================================================

// Listener
app.listen(PORT, function(){
	console.log("App listening on Port:" + PORT);
});