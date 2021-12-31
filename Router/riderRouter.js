const Rider = require("../Model/Rider");

module.exports.riderCreateController = async (req, res) => {
  try {
    const extRider = await Rider.findOne({
      $or: [{ email: req.body.email }, { phone: req.body.phone }],
    });

    if (!extRider) {
      await Rider.create(req.body)
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
