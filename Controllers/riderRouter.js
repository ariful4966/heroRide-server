const Rider = require("../Model/Rider");
const fs = require("fs-extra");
const imageToBase64 = require("image-to-base64");
const { response } = require("express");

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

    function imgBase64(file) {
      const newImg = file.data;
      const encImg = newImg.toString("base64");
      const mainImg = `data:${file.mimetype};base64,`+ encImg

      // const image = {
      //   contentType: file.mimetype,
      //   size: file.size,
      //   img: Buffer.from(encImg, "base64"),
      // };

      return mainImg;
    }

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
    await Rider.find({})
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
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};
