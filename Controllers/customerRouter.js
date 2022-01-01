const decode = require("jwt-decode");
const Admin = require("../Model/Admin");
const Customer = require("../Model/Customer");
const { imgBase64 } = require("../utilities/imageBase64");
const jwt = require("jsonwebtoken");

module.exports.allCustomerGetController = async (req, res) => {
  try {
    const token = req.query.token;
    const { data } = decode(token);
    await Admin.findOne({ email: data.email })
      .then(async (result) => {
        if (result) {
          await Customer.find({})
            .then((result) => {
              res.send({
                result: result,
                message: "Your All driving Lesson Lerner data is here",
              });
            })
            .catch((error) => {
              res.send({
                error: error.message,
              });
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
      error: error.message,
    });
  }
};

module.exports.createNewCustomerController = async (req, res) => {
  try {
    const profilePic = req.files.profilePic;
    const nidPic = req.files.nidPic;

    const { name, email, age, phone, address, password,carType } = req.body;

    const extCustomer = await Customer.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (!extCustomer) {
      const newCustomer = {
        profilePic: imgBase64(profilePic),
        nidPic: imgBase64(nidPic),
        name,
        email,
        age,
        phone,
        address,
        vihicalType: carType,
        password,
      };
      await Customer.create(newCustomer)
        .then((result) => {
          res.send({
            result: result,
            message: "Create Driving Lesson Learner Account Successfully",
          });
        })
        .catch((error) => {
          res.send({
            error: error.message,
          });
        });
    } else {
      res.send({
        error: "Driving Lesson Learner Already Exist",
      });
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports.customerLoginController = async (req, res) => {
  try {
    const user = req.body;

    const extCustomer = await Customer.findOne({ email: user.email });

    if (extCustomer) {
      extCustomer.then((result) => {
        const genToken = {
          name: result.name,
          email: result.email,
        };
        const token = jwt.sign(
          {
            exp: Math.floor(Date.now() / 1000) + 60 * 60 * 12,
            data: genToken,
          },
          process.env.JWT_SECRET
        );
        res.send({
          message: "Your are login Successfull",
          data: token,
        });
      });
    } else {
      res.send({
        error: "Sorry You are not our existing user",
      });
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};
