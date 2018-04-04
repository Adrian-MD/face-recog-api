const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register.js');
const signin = require('./controllers/signin.js');
const profile = require('./controllers/profile.js');
const image = require('./controllers/image');

const db = knex({
    client: 'pg',
    connection: {
        host : '127.0.0.1',
        user : 'adrian',
        password : 'RaspBoot7305',
        database : 'smart-brain'
    }
});

// db.select('*').from('users').then(data => {
//     console.log(data);
// });



const app = express();
app.use(bodyParser.json());
app.use(cors());


// Check that root is working
app.get('/', (req, res) => {
    res.send(database.users);
});

// Signin page
app.post('/signin', (req, res) => { signin.handleSignIn(req, res, db, bcrypt) })

// Register
app.post('/register', (req, res) => { register.handleRegister(req, res, db, bcrypt) })

// Profile
app.get('/profile/:id', (req, res) => { profile.handleProfileGet(req, res, db) })

// Image
app.put('/image', (req, res) => { image.handleImage(req, res, db) })
app.post('/imageurl', (req, res) => { image.handleApiCall(req, res) })



 



const PORT = process.env.PORT
app.listen(3000, () => {
    console.log(`App is running on port 3000`);
});

/*

/ >>> res = this is working
/signin >>> POST = success/failure
/register >>> POST = new user obj
/profile/:userId >>> GET = user
/image >>> PUT >>> user & count
/signout >>> POST = success


*/