const express = require('express')
const mongoose = require('mongoose');
const heroRouter = require('./Router/router')

const app = express();


app.use(express.json());
app.use(heroRouter)


mongoose.connect('mongodb://localhost:27017/heroRide',()=>{
    console.log(`Database Coonnection Successfully`)

    
});


app.listen(4000, ()=>{
    console.log('Server is Running on port 4000');
})