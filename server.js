const express = require('express');
const app = express();
app.use(express.urlencoded({
    extended: true
}))
const cors = require('cors');
app.use(cors());
const {MongoClient} = require('mongodb');

const uri = "mongodb+srv://peter:secret1000@mycluster.atz1r.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";
let usersCollection;

MongoClient.connect(uri)
    .then(client => {
        const db = client.db('users_test')
        usersCollection = db.collection('users');
    });

app.use(express.static('public'))

app.get('/', function(req, res) {
    res.send("hello user.  Try using the api endpoints to get some data");
});

app.get('/api/users', (req, res) => {
    usersCollection.find().toArray()
        .then(result => {
            console.log('result sent');
            res.send(result); 
        });
});

app.get('/api/users/:email', (req, res) => {
    usersCollection.findOne({email: req.params.email})
        .then(result => {
            //console.log('finding your user by email');
            res.send(result);
        })    
});

app.post('/submit-form', (req, res) => {
    const email = req.body.email;
    usersCollection.findOne({email: email})
        .then(result => {
            console.log('finding your user by email');
            res.send(result);
        });
});

app.post('/api/users/:name/:email/:password/:balance', (req, res) => {
    // See this URL for help with POST https://youtu.be/pKd0Rpw7O48?t=2076
    usersCollection.insertOne({
        name: req.params.name,
        email: req.params.email,
        password: req.params.password,
        balance: req.params.balance
    });
    console.log(`added new user ${req.params.name}`);
    res.send(`added new user ${req.params.name}`);
});

app.put('/api/users/:email/:balance', (req, res) => {
    usersCollection.updateOne(
        {email: req.params.email},
        {$set: {balance: req.params.balance}}
    )
    res.send(`updated ${req.params.email}'s balance to be ${req.params.balance}'`);
});

var listener = app.listen(8081, function() {
    console.log('I am express server running on port 8081.  Send me some requests, and I will respond.');
});
