const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");
// const { getAboutPage } = require("../controllers/aboutController");

// router.get("/", getAboutPage);
router.get("/about", aboutController.getAboutPage);

module.exports = router;