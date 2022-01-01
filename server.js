require('dotenv').config();
const express = require('express')
const mongoose = require('mongoose');
const fileUpload = require('express-fileupload')
const cors = require('cors')
const fs = require('fs');
const { riderCreateController, allRiderGetController } = require('./Controllers/riderRouter');
const { allCustomerGetController, createNewCustomerController } = require('./Controllers/customerRouter');
const { adminGetController, createNewAdmin, adminLoginCoroller } = require('./Controllers/AdminController');


const app = express();


app.use(express.json());
app.use(express.urlencoded({extended: true}))
app.use(cors())
// app.use(heroRouter)
app.use(express.static('uploads'))
app.use(fileUpload())

const MongoDB =`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.2rcqo.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`;


mongoose.connect(MongoDB,()=>{
    console.log(`Database Coonnection Successfully`)

    
});


app.get("/", (req, res) => {
    res.send("This is your home page");
  });
  app.post('/rider', riderCreateController)
  app.get("/rider", allRiderGetController)
  app.post("/rider/login",(req, res)=>{
    console.log(req.body);
  })
  

  
  
  app.get("/customer", allCustomerGetController)
  app.post("/customer", createNewCustomerController);
  app.post("/customer/login", (req, res)=>{
      console.log(req.body);
})
  
  app.get("/admin", adminGetController)
  
  app.post("/admin", createNewAdmin)
  app.post("/admin/login", adminLoginCoroller )


app.listen(process.env.PORT, ()=>{
    console.log('Server is Running on port '+ process.env.PORT);
})