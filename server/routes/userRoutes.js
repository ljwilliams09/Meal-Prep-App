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
    // Validations
    if (!username || !password){
        res.status(401).json({ error: 'Invalid Credentials' })
    }
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
            return res.status(401).json({ error: 'Invalid credentials.' });
        }

        // Validate password
        const verified = await argon2.verify(user.password, password)
        if (!verified)
            return res.status(401).json({ error: 'Invalid credentials.' })

        // Start session
        req.session.user = {
            id: user.id,
            username: user.username,
            email: user.email
        };

        // Confirmation
        res.status(200).json({ message: 'Login successful '})
    }
    catch (err){
        return res.status(500).json({error: 'Something went wrong on our end.' });
    }

    res.redirect('/dashboard');
});

router.post('/authRegister', async (req, res) => {
    const { first, last, email, username, password } = req.body;


    // Basic validation
    if (!first || !last || !email || !username || !password){
        res.status(401).json({ error: 'Missing user info'});
        return;
    }

    // Check whether the username or email exists within the database
    const exists = await prisma.user.findFirst({
        where: {
            OR: [
                { username : username},
                { email : email}
            ]
        }
    });
    if (exists){
        res.status(401).json({ error: 'Email or username in use'})
        return;
    }

    // Hash password
    const hashedPW = await argon2.hash(password);

    // Create the user
    try{
        await prisma.user.create({
            data: {
                first,
                last,
                email,
                username,
                password: hashedPW 
            }
        });
    }
    catch{
        res.status(501).json({ error: 'Could not create user'})
        return;
    }
    
    // Confirmation
    res.status(200).json({ error: 'Login Successful'})

})
module.exports = router;