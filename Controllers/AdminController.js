const Admin = require("../Model/Admin");
const jwt = require('jsonwebtoken')

module.exports.adminGetController = async (req, res) => {
  try {
    const mainAdmin = await Admin.findOne({ email: req.headers.email });

    if (mainAdmin && mainAdmin.adminType === "admin") {
      await Admin.find({})
        .then((result) => {
          res.send({
            result: result,
            message: "All Admin is here",
          });
        })
        .catch((error) => {
          res.send({
            error: error.message,
          });
        });
    } else {
      await Admin.findOne({ email: req.headers.email })
        .then((result) => {
          res.send({
            result: result,
            message: "Your Information is Here",
          });
        })
        .catch((error2) => {
          res.send({
            error: error2.message,
          });
        });
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports.createNewAdmin = async (req, res) => {
  try {
    const heroAdmin = "admin@admin.com";
    const extAdmin = await Admin.findOne({ email: req.body.email });

    if (!extAdmin) {
      if (heroAdmin === req.body.email) {
        await Admin.create(req.body)
          .then((result) => {
            res.send({
              result: result,
              message: "Create Admin account successfully",
            });
          })
          .catch((error) => {
            res.send({
              error: error.message,
            });
          });
      }else{
          res.send({
              error: "Sorry Your Are not Admin This site"
          })
      }
    } else {
      res.send({
        error: "Admin Already exist",
      });
    }
  } catch (err) {
    res.send({
      error: err.message,
    });
  }
};

module.exports.adminLoginCoroller = async(req, res)=>{
    
  try{
    const extAdmin = Admin.findOne({email: req.body.email})
      if(extAdmin){
        extAdmin.then(result=>{
          const genToken = {
            name:result.name,
            email:result.email
          }
         const token=  jwt.sign({
            exp: Math.floor(Date.now() / 1000) + (60 * 60*12),
            data: genToken
          }, process.env.JWT_SECRET);
  
          res.send({
            message: 'Successfully Login',
            token: token
          })
        })
        .catch(error=>{
          res.send({
            error: error.message
          })
        })
       

      }else{
        res.send({
          error: 'Sorry your are not valid user'
        })
      }
  }catch (err) {
    res.send({
      error: err.message,
    });
  }
}
