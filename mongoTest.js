//mongoTest.js
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

// Connection URL
const url = 'mongodb://localhost:27017';

// Database Name
const dbName = 'myScraper';

// Use connect method to connect to the server
MongoClient.connect(url, function(err, client) {
  assert.equal(null, err);
  console.log("Connected successfully to server");

  const db = client.db(dbName);
  try{
	  db.createCollection("customers", function(err, res) {
	    //if (err) throw err;
	    //assert.equal(null, err);
	    console.log("Collection created!");
	    //client.close();
	  });
  }
  catch(ew){
  	//collection already exists
  }

  try{

  	var myobj = { name: "Company Inc", address: "Highway 37" };
  	db.collection("customers").insertOne(myobj, function(err, res) {
	    //if (err) throw err;
  		//assert.equal(null, err);
	    console.log("1 document inserted");
	    //client.close();
	});
  }catch(eq){

  }
/*
  try{
  	db.collection("customers").insertMany(myobj, function(err, res) {
	    if (err) throw err;
	    console.log("Number of documents inserted: " + res.insertedCount);
	    client.close();
	});
  }catch(ywu){

  }
*/


  client.close();
});
