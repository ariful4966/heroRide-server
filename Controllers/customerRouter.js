const Customer = require("../Model/Customer");
const { imgBase64 } = require("../utilities/imageBase64");


module.exports.allCustomerGetController=async(req, res)=>{
    try{
        await Customer.find({})
        .then(result=>{
            res.send({
                result: result,
                message: "Your All driving Lesson Lerner data is here"
            })
        }).catch(error=>{
            res.send({
                error: error.message
            })
        })
    }catch(err){
        res.send({
            error: error.message
        })
    }
}

module.exports.createNewCustomerController = async(req, res)=>{


    try {

      const profilePic = req.files.profilePic;
      const nidPic = req.files.nidPic;
  
      const {
        name,
        email,
        age,
        phone,
        address,
        area,
        password,
      } = req.body;

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
          vihicalType:carType,
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
      }else{
          res.send({
              error: "Driving Lesson Learner Already Exist"
          })
      }
    } catch (err) {
      res.send({
        error: err.message,
      });
    }
  }

  