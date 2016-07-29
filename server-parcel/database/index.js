/**
  * Database Interface
*/
// Connections
var pg = require('pg');
// var conString =  process.env.CONNECT_STRING || "postgres://parceladmin:8w3547xi$gU#e0c@parceldatabase.cz841ql8q8my.us-west-2.rds.amazonaws.com:5432/urbinsight";
var prodConString = "postgres://parceladmin:8w3547xi$gU#e0c@parceldatabase.cz841ql8q8my.us-west-2.rds.amazonaws.com:5432/urbinsight";
var devConString = "postgres://shokishoki:shadow1@localhost/urbinsight";

var pgClient;
// If we're in development...
if (process.env.NODE_ENV === 'development') {
  // set our database to the development one
  // connect to it via mongoose
   pgClient = new pg.Client(devConString);
   console.log('pg connected');
}

// If we're in production...
if (process.env.NODE_ENV === 'production') {
   pgClient = new pg.Client(prodConString);
   console.log('pg connected');
}

exports.pgClient = pgClient;
exports.devConString = devConString;
exports.prodConString = prodConString;
