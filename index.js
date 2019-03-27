// implement your API here
const express = require('express');

const db = require('./data/db');

const server = express();

server.use(express.json());

// CRUD Operations

server.post('/users', (req, res) => {
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({error: 'Please provide name and bio for the user'});
    }
    db
        .insert({
             name,
             bio
        })
        .then(user => {
            res.status(201).json(user);
        })          
        .catch(error => {
            res.status(500).json({error: 'There was an error while saving the user to the database'})
        })
})

server.get('/users', (req, res) => {
    db
    .find()
    .then(user => {
        res.status(200).json(user)
    })
    .catch(error => {
        res.status(500).json({message: 'The user with the specified ID does not exist.'})
    })
});

server.get('/users/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id)
        .then((id) => {
            if(id){
                res.status(200).json(id)
            } else {
                res.status(404).json({message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({error: 'the user information could not be retrieved'})
        })
})

server.delete('/users/:id', (req, res) => {
    const id = req.params.id;
    db.remove(id)
        .then((id) => {
            if(id){
                res.status(200).json(id)
            } else {
                res.status(404).json({message: 'The user with the specified ID does not exist.'})
            }
        })
        .catch(error => {
            res.status(500).json({error: 'the user information could not be removed'})
        })
})

server.put('/users/:id', (req, res) => {
    const {id} = req.params;
    // const changes = req.body;
    const { name, bio } = req.body;
    if(!name || !bio) {
        res.status(400).json({errorMessage: "Please provide name and bio for the user."});
    }
    db.update(id, { name, bio}).then(updated => {
        if(updated) {
            res.status(200).json(updated);
        } else {
            res.status(404).json({message: "The user with the specified ID does not exist."})
        }
    })
    .catch(error => {
        res.status(500).json({error: "The user information could not be modified."})
    })
})

server.listen(4000, () => {
    console.log('API up and running');
});