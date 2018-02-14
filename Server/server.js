const {mongoose} = require('./db/mongoose');
const express = require('express');
const bodyParser = require('body-parser');

let {Todo} = require('./models/Todo');
let {User} = require('./models/User');

let app = express();

app.use(bodyParser.json());

app.get('/',(req,res)=>{
	res.send('hello World');
});

app.post('/todos',(req,res)=>{
	let newTodo = new Todo({
		text: req.body.text
	});
	newTodo.save().then(
		(doc)=>{
			res.status(200).send({
				message: 'Todo Saved ',
				data: doc
			});
		},(err)=>{
			res.status(400).send({
				message: 'Error',
				data: err
			})
		});
});

app.get('/todos',(req,res)=>{
	Todo.find().then(
		(todos)=>{
			res.status(200).send({
				message: 'Success',
				data: todos
			});
		},(err)=>{
			res.status(500).send({
				message: 'Error',
				data: err
			})
		})
})

app.listen(3000,()=>{
	console.log('app started on 3000 port');
});
