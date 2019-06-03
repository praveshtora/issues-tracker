const MongoClient = require('mongodb').MongoClient;

// Connection URL
const url = 'mongodb://localhost:27017';
 
// Database Name
const dbName = 'temp-issues-tracker';
 
// Use connect method to connect to the server

let db;

const connect = MongoClient.connect(url, function(err, client) {
  if (err) {
    console.log("error connectiong mongo");
    process.exit(1);
  }
  console.log("Connected successfully to mongo");
 
  db = client.db(dbName);
 });

 module.exports = {connect, db}