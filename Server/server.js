const {
    mongoose
} = require('./db/mongoose');
const {ObjectID} = require('mongodb');
const express = require('express');
const bodyParser = require('body-parser');
const {
    Todo
} = require('./models/Todo');
const {
    User
} = require('./models/User');
let app = express();
app.use(bodyParser.json());
app.get('/', (req, res) => {
    res.send('hello World');
});
app.post('/todos', (req, res) => {
    let newTodo = new Todo({
        text: req.body.text
    });
    newTodo.save().then(
        (doc) => {
            res.status(200).send({
                message: 'Todo Saved ',
                data: doc
            });
        }, (err) => {
            res.status(400).send({
                message: 'Error',
                data: err
            })
        });
});
app.get('/todos', (req, res) => {
    Todo.find().then(
        (todos) => {
            res.status(200).send({
                message: 'Success',
                data: todos
            });
        }, (err) => {
            res.status(500).send({
                message: 'Error',
                data: err
            })
        })
});
app.get('/todos/:id', (req, res) => {
    let todoId = req.params.id;
    if(ObjectID.isValid(todoId)){
    	    Todo.findById(todoId).then(
        (todo) => {
            if (todo) {
                console.log("Todo Found", todo);
                res.send({
                    message: 'Success',
                    data: todo
                })
            } else {
                console.log('TODO not found');
                res.status(404).send({
                    message: 'TODO Not Found',
                    data: null
                })
            }
        }, (err) => {
            console.log("Error while fetching By Id")
            res.status(500).send({
                message: 'Internal Server Error ' + err.message,
                data: err
            })
        })
    
    }else{
    	res.status(400).send({
    		    message: 'Bad Request, Invalid ID ' ,
                data: null
    	})
    }

})
app.get('/user', (req, res) => {
    User.findById('5a8479b12836ee0394de79d2').then(
        (u) => {
            if (u) {
                console.log('User found', u);
                res.send({
                    message: 'Success',
                    data: u
                });
            } else {
                console.log('User not found');
                res.status(404).send({
                    message: 'Not Found',
                    data: null
                })
            }
        }).catch((error) => {
        console.log("error getting user");
        res.status(500).send({
            message: 'Internal Server Error ' + error.message,
            data: error
        })
    })
});
app.listen(3000, () => {
    console.log('app started on 3000 port');
});