const Customer = require("../Model/Customer");
const Rider = require("../Model/Rider");
const { createNewAdmin, adminGetController } = require("./AdminController");
const { createNewCustomerController, allCustomerGetController } = require("./customerRouter");
const { riderCreateController, allRiderGetController } = require("./riderRouter");

const router = require("express").Router();

router.get("/", (req, res) => {
  res.send("This is your home page");
});

router.get("/rider", allRiderGetController)
router.post("/rider", riderCreateController );


router.get("/customer", allCustomerGetController)
router.post("/customer", createNewCustomerController);

router.get("/admin", adminGetController)

router.post("/admin", createNewAdmin)

module.exports = router;
