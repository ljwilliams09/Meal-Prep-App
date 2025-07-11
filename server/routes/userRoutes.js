const express = require('express');
const router = express.Router();
const path = require('path');
const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const argon2 = require('argon2');

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

    // Lookup user
    try {
        const user = await prisma.user.findFirst({
            where: {
                OR: [
                    { username: username},
                    { email : username }
                ]
            }
        });

        if (!user){
            return res.status(401).json({ error: 'Invalid creditials.' });
        }
    }
    catch (err){
        return res.status(501).json({error: 'Something went wrong on our end.' });
    }
    // Validate password
    const verified = await argon.verify(user.password, password)
    if (!verified)
        return res.status()

});

module.exports = router;