const express = require('express');
const router = express.router();
const path = require('path')
const { PrismaClient } = require('@prisma/client')
const prisma = new PrismaClient()

router.get('/dashboard', (req, res) => {
    if (req.session.user)
        return res.json({ user: req.session.user})
    
});
