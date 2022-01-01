const Customer = require("../Model/Customer");


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
      const extCustomer = await Customer.findOne({
        $or: [{ email: req.body.email }, { phone: req.body.phone }],
      });
  
      if (!extCustomer) {
        await Customer.create(req.body)
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

  