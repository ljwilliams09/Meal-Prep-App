// Import Dependencies
const express = require('express');
const session = requre('express-session')
const app = express();
const bodyParser = require('body-parser')
const path = require('path');
const userRoutes = require('./routes/userRoutes.js')
const dotenv = require('dotenv').config()

// Constants
const port = process.env.PORT || 3000;
const public = path.join(__dirname, '..', 'public')

// Use
app.use(express.static(public))
app.use('/', (userRoutes))
app.use(
    session({
        secret: process.env.sessionSecret
    })
)

// Main Routes
app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(public, 'index.html'))
});


