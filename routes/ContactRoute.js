const express = require("express");
const router = express.Router();
const {getCont, getContone, createCont, updateCont, delCont} = require("../controllers/ContactControllers");
const ValidToken = require("../errors/authenticate");

router.use(ValidToken);

router.route("/").get(getCont).post(createCont);

router.route("/:id").get(getContone).put(updateCont).delete(delCont);

module.exports = router;