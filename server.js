var express = require("express");
var bodyParser = require("body-parser");
var contactService = require('./ContactService.js');

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool.
var db;

// Load local config
var config = require("./config/app.js");

contactService.start({}, function(err) {
  if(err) {
    contactService.logError("Error starting Contact Service: " + err);
  } else {
    contactService.logInfo("Contact Service started.");

    // Initialize the express app.
    var server = app.listen(process.env.PORT || 8080, function() {
      var port = server.address().port;
      console.log("App now running on port ", port);
    });   
  }
})
