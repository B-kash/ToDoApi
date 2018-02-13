console.log("Connecting to the app...");
const express = require('express');
let app = express();
const {MongoClient,ObjectID} = require('mongodb');

MongoClient.connect("mongodb://localhost:27017/",(err,db)=>{
	if(err){
		return console.log('Cannot connect to the mongo db sercer');
	}
	console.log('connected to the mongo db server');


	let dbo = db.db('ToDoApp')
	// console.log(dbo);

	// dbo.collection('Todos').insertOne({
	// 	text: 'Todo no 1',
	// 	completed: false
	// },(err,result)=>{
	// 	if(err) return console.log('Error while inserting todo into the database',err);
	// 	console.log(JSON.stringify(result.ops));
	// });
	// dbo.collection('Users').insertOne({
	// 	name: 'User no 1',
	// 	age: 10,
	// 	location:'Swoyambhu'
	// },(err,result)=>{
	// 	if(err) return console.log('Error while inserting Users into the database',err);
	// 	console.log(JSON.stringify(result.ops));
	// });

	// dbo.collection('Todos').find({_id:new ObjectID('5a82f05b998e6a026d3bdd8d')}).toArray().then((docs)=>{
	// 	console.log('Todos: ');
	// 	console.log(docs)
	// },(err)=> console.log('unable to fetch todos',err))

	dbo.collection('Todos').find({completed:false}).count().then((count)=>{
		console.log('Todos count: ',count);
		
	},(err)=> console.log('unable to fetch todos',err))



	db.close();
});


app.listen(3000);