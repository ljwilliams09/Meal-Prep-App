const express = require('express');
const router = express.Router();
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const public = path.join(__dirname, '..', '..', 'public')

router.get('/login', (req, res) => {
    res.sendFile(path.join(public, 'login.html'))
});

router.get('/register', (req, res) => {
    res.sendFile(path.join(public, 'register.html'))
});

router.post('/authLogin', async (req, res) =>{
    const { username, password } = req.body;
    // validate here

    // lookup in database
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username},
                    { email : username }
                ]
            }
        })
    }
    catch (err){

    }
});

module.exports = router;