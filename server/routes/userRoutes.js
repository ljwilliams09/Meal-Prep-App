const express = require('express');
const router = express.Router();
const path = require('path')


router.post('/login', (req, res) => {
    res.sendFile(path.join(__dirname,'..','..','public', 'login.html'))
});

router.post('/register', (req, res) => {
    res.sendFile(path.join(__dirname, '..', '..', 'public', 'signup'))
});

module.exports = router;