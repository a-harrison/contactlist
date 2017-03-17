var express = require("express");
var bodyParser = require("body-parser");
var mongodb = require("mongodb");
var ObjectID = mongodb.ObjectID;

var CONTACTS_COLLECTION = "contacts";

var app = express();
app.use(bodyParser.json());

var distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// Create a database variable outside of the database connection callback to reuse the connection pool.
var db;

// Load local config
var config = require("./config/app.js");

// Connect to the database before the app server.
mongodb.MongoClient.connect(process.env.MONGODB_URI || config.MONGODB_URI, function(err, database) {
    if(err) {
	console.log(err);
	process.exit(1);
    }

    // Save the db object from the callback for reuse.
    db = database;
    console.log("Successfully connected.");

    // Initialize the app.
    var server = app.listen(process.env.PORT || 8080, function() {
	var port = server.address().port;
	console.log("App now running on port ", port);
    });

    // ROUTES BELOW
})
