const Rider = require("../Model/Rider");
const  decode  =require('jwt-decode');
const fs = require("fs-extra");
const imageToBase64 = require("image-to-base64");
const { response } = require("express");
const { imgBase64 } = require("../utilities/imageBase64");
const Admin = require("../Model/Admin");
const jwt = require('jsonwebtoken')


module.exports.riderCreateController = async (req, res) => {
  try {
    const profilePic = req.files.profilePic;
    const nidPic = req.files.nidPic;
    const carNumberPlate = req.files.carNumberPlate;
    const drLCpic = req.files.drLCpic;

    const {
      name,
      email,
      age,
      phone,
      address,
      area,
      carName,
      carModel,
      carType,
      password,
    } = req.body;

    

    const extRider = await Rider.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });
    const newRider = {
      profilePic: imgBase64(profilePic),
      nidPic: imgBase64(nidPic),
      
      drivingLCPic: imgBase64(drLCpic),
      name,
      email,
      age,
      phone,
      address,
      area,
      carInfo:{
        name: carName,
        model: carModel,
        namePlatePic: imgBase64(carNumberPlate),
      },
      vihicalType:carType,
      password,
    };



    if (!extRider) {
      await Rider.create(newRider)
        .then((result) => {
          res.send({
            result: result,
            message: "Create New Rider Successfully",
          });
        })
        .catch((error) => {
          res.send({
            error: error.message,
          });
        });
    } else {
      res.send({
        error: "Reader Already Exist",
      });
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports.allRiderGetController = async (req, res) => {
  try {
    const token = req.query.token
    const {data} = decode(token)
    await Admin.findOne({email: data.email})
    .then(result=>{
      if(result ){
        Rider.find({})
        .then((result) => {
          if (result && result.length > 0) {
            res.send({
              result: result,
              message: "Your Rider data is here ",
            });
          } else {
            res.send({
              error: "Sorry You Have No Data Here",
            });
          }
        })
        .catch((error) => {
          res.send({
            error: error.message,
          });
        });
      }else{
        res.send({
          error: 'Your are not admin this site'
        })
      }
    })
    

    
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports.riderLoginController= async(req, res)=>{
  try{
    const user = req.body;
    await Rider.findOne({email: user.email})
    .then(result=>{
      const genToken = {
        name: result.name,
        email: result.email
      }
      const token =jwt.sign({
        exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: genToken
      }, process.env.JWT_SECRET);
      res.send({
        message: 'Your are login Successfull',
        token: token
      })
    })
    .catch((error) => {
      res.send({
        error: error.message,
      });
    });
  }
  catch (err) {
    res.send({
      error: err.message,
    });
  }


}
