// Import Dependencies
const express = require('express');
const session = require('express-session');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
const userRoutes = require('./routes/userRoutes.js');
const dotenv = require('dotenv').config();

// Constants
const port = process.env.PORT || 3000;
const public = path.join(__dirname, '..', 'public');
const sessionAge = 60000 * 60;

// Use
app.use(express.json());
app.use(express.static(public));
app.use(
    session({
        secret: process.env.SESSION_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            secure: false,
            httpOnly: true,
            maxAge: sessionAge
        }
    })
);
app.use('/', (userRoutes));


// Main Routes
app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(public, 'dashboard.html'))
});

