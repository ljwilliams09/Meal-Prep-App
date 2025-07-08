const express = require('express');
const app = express();

app.listen(3000)

app.get('/', (res, req) =>{
    console.log('Here')
    res.send('/Users/lucawilliams/Desktop/Meal-Prep-App/public/login.html')
})

app.listen(3000)