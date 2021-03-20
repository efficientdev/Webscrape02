const express = require('express');
const bodyParser = require("body-parser");

const app = express()
const port = 3033;

const mongo = require('mongodb');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
// Connection URL
const url = 'mongodb://localhost:27017';
// Database Name
const dbName = 'myScraper';

const moment = require("moment");


//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// set the view engine to ejs
app.set('view engine', 'ejs');
app.use(express.static('public'))

// index page
app.get('/', function(req, res) {
    res.render('pages/dashboard');
});

//getFromBet9jaStore
//app

const rar=(text)=>{
    var wordSplited = text.split(/\s+/);
    let filter = [];
    wordSplited.map((item,i) => {

        filter.push({}); 
        filter[i][item] = {
            $regex: regToMatch
        }
        //,  $options: 'i'
    });

}


const makeTextFilter = (text,searchFieldArray) => {
    var wordSplited = text.split(/\s+/);
    /** Regex generation for words */
    var regToMatch = new RegExp(wordSplited.join("|"), 'gi');
    let filter = [];
    searchFieldArray.map((item,i) => {
        filter.push({}); 
        filter[i][item] = {
            $regex: regToMatch
        }
        //,  $options: 'i'
    });

    console.log(filter);

    return filter;
}
const makeSingleFilter = (text,searchFieldArray) => {
     
    /** Regex generation for words */
    //var regToMatch = new RegExp(wordSplited.join("|"), 'gi');
    var regToMatch = new RegExp(text, 'gi');
    let filter = [];
    searchFieldArray.map((item,i) => {
        filter.push({}); 
        filter[i][item] = {
            $regex: regToMatch
        }
        //,  $options: 'i'
    });

    console.log(filter);

    return filter;
}

//eventTime

app.post('/getFromForebetStore', async (req, res) => {
	//console.log(req.body);

	const {filterDate,z} = req.body;

	var dateObj = new Date(filterDate); 
	var momentObj = moment(dateObj); 
	var momentString2 = momentObj.format('D/M/YYYY'); // 2016-07-15 
	console.log(momentString2);


	await MongoClient.connect(url,async (dberr,dbclient)=>{
    	//dberr=err;dbclient=client
	    if (dberr) {}else{
	    	console.log("no connection error");
	    	var dbo = dbclient.db("myScraper"); 
				//...query,
				//await 
	    		//let query = { $or: makeTextFilter(obj1.hTeam,searchFieldArray)};
	    		//let query = makeTextFilter(obj1.hTeam,searchFieldArray);
	    		//let query0 = makeTextFilter(obj1.aTeam,searchFieldArray);

				let searchFieldArray=['eventTime'];
	    		let query = makeSingleFilter(momentString2,searchFieldArray);


				let searchFieldArray1=['home'];
	    		let query1 = makeTextFilter(z.teamName,searchFieldArray1);
	    		//find({ $and: [query[0],query0[0]]})
	    		await dbo.collection("foreBet").find({ $and: [query[0],query1[0]]}).toArray(async (err, result)=> {
				    //if (err) throw err;
				    /*
					console.log(obj1);
				    */
				    //console.log(err);
		    		await dbclient.close();
				    if(err){ 
						await res.send({out:{[z['_id']]:[],key:[z['_id']]}});
				    }else{
				    	//console.log(result);
						await res.send({out:{[z['_id']]:result,key:z['_id']}});
				    }
				    
				    
				}); 
	    }
    });

});

app.post('/investigate', async (req, res) => {
	const {filterDate,d,word,z} = req.body;

	const {_id}=z;

	var dateObj = new Date(filterDate); 
	var momentObj = moment(dateObj); 
	var momentString2 = momentObj.format('YYYY-MM-DD'); // 2016-07-15 
	console.log(momentString2);


	await MongoClient.connect(url,async (dberr,dbclient)=>{

	    if (dberr) {}else{
	    	console.log("no connection error");
	    	var dbo = dbclient.db("myScraper");   



				let searchFieldArray1=[d];
	    		let query1 = makeTextFilter(word,searchFieldArray1);

	    	 
	    	//console.log(lex);
    		await dbo.collection("liveScore").find({$and:[query1[0],{eventDate:momentString2}]}).toArray(async (err, result)=> {
			    
			    await console.log(result);
	    		await dbclient.close();
			    if(err){ 
					await res.send([]);
			    }else{
			    	//console.log(result);
					await res.send({result,_id});
			    } 
			    
			}); 
	    }
    });

});


app.post('/getFromForebetStore/all', async (req, res) => {
	//console.log(req.body);

	const {filterDate,z} = req.body;

	var dateObj = new Date(filterDate); 
	var momentObj = moment(dateObj); 
	var momentString2 = momentObj.format('D/M/YYYY'); // 2016-07-15 
	console.log(momentString2);


	await MongoClient.connect(url,async (dberr,dbclient)=>{
    	//dberr=err;dbclient=client
	    if (dberr) {}else{
	    	console.log("no connection error");
	    	var dbo = dbclient.db("myScraper"); 
				//...query,
				//await 
	    		//let query = { $or: makeTextFilter(obj1.hTeam,searchFieldArray)};
	    		//let query = makeTextFilter(obj1.hTeam,searchFieldArray);
	    		//let query0 = makeTextFilter(obj1.aTeam,searchFieldArray);

				let searchFieldArray=['eventTime'];
	    		let query = makeSingleFilter(momentString2,searchFieldArray);


				let searchFieldArray1=['home'];
	    		let query1 = makeTextFilter(z.teamName,searchFieldArray1);
	    		//find({ $and: [query[0],query0[0]]})
	    		await dbo.collection("foreBet").find(query[0]).toArray(async (err, result)=> {
				    //if (err) throw err;
				    /*
					console.log(obj1);
				    */
				    //console.log(err);
		    		await dbclient.close();
				    if(err){ 
						await res.send({out:{[z['_id']]:[],key:[z['_id']]}});
				    }else{
				    	//console.log(result);
						await res.send({out:{[z['_id']]:result,key:z['_id']}});
				    }
				    
				    
				}); 
	    }
    });

});

app.post('/getFromBet9jaStore', async (req, res) => {
	console.log(req.body);

	const {filterDate} = req.body;

	var dateObj = new Date(filterDate); 
	var momentObj = moment(dateObj);
	//var momentString = momentObj.format('YYYY-MM-DD'); // 2016-07-15
	var momentString2 = momentObj.format('DD MMM'); // 2016-07-15

	//console.log(momentString);
	console.log(momentString2);

	await MongoClient.connect(url,async (dberr,dbclient)=>{
    	//dberr=err;dbclient=client
	    if (dberr) {}else{
	    	console.log("no connection error");
	    	var dbo = dbclient.db("myScraper"); 
				//...query,
				//await 
				let searchFieldArray=['eventTimeOdd'];
	    		//let query = { $or: makeTextFilter(obj1.hTeam,searchFieldArray)};
	    		//let query = makeTextFilter(obj1.hTeam,searchFieldArray);
	    		//let query0 = makeTextFilter(obj1.aTeam,searchFieldArray);
	    		let query = makeSingleFilter(momentString2,searchFieldArray);
	    		//find({ $and: [query[0],query0[0]]})
	    		await dbo.collection("bet9ja").find(query[0]).toArray(async (err, result)=> {
				    //if (err) throw err;
				    /*
					console.log(obj1);
				    */
				    console.log(err);
				    console.log(result);
		    		await dbclient.close();
					await res.send(result);
				    
				}); 
	    }
    });

});


app.get('/above50', (req, res) => {

	MongoClient.connect(url, async(err, client)=> {
	    assert.equal(null, err);
	    console.log("Connected successfully to server");

	    const db = client.db(dbName);
	    const collection_name="foreBet";

		try{
			let dd={"$expr": { "$gt": [{ "$toInt": "$over_prob" }, 50]}};
			//{over_prob: { $gt: 50 }}
			  await db.collection("foreBet").find(dd).toArray(function(err, result) {
			    if (err) {
			    	console.log(err);
			    }
			    	//throw err;
		   		console.log(result);
		   		//.status(200)
		   		client.close();

			  	res.send(result);	 
			    //db.close();
			  });
		}catch(ew){
			console.log(ew);
		  	res.send("result");	 
		}

	      
	    //res.send('Hello World!')
	});
});



app.post('/api', (req, res) => {

	MongoClient.connect(url, async(err, client)=> {
	    assert.equal(null, err);
	    console.log("Connected successfully to server");

	    const db = client.db(dbName);
	    const collection_name="bet9ja";

		try{
			  await db.collection("bet9ja").find({}).toArray(function(err, result) {
			    if (err) {
			    	console.log(err);
			    }
			    	//throw err;
		   		console.log(result);
		   		//.status(200)
		   		client.close();

			  	res.send(result);	 
			    //db.close();
			  });
		}catch(ew){
			console.log(ew);
		  	res.send("result");	 
		}

	      
	    //res.send('Hello World!')
	});
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
});