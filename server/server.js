const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const path = require('path');

const port = 3000;
const public = path.join(__dirname, '..', 'public')
app.use(express.static(public))

app.listen(port, () => {
    console.log(`Running on Port ${port}`)
});

app.get('/', (req, res) =>{
    res.sendFile(path.join(public, 'index.html'))
});

const userRoutes = require('./routes/userRoutes.js')
app.use('/', (userRoutes))

