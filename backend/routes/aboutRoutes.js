const express = require("express");
const router = express.Router();
const aboutController = require("../controllers/aboutController");

// ✅ Fixed: should be "/" not "/about"
// because it's mounted at /about in server.js
router.get("/", aboutController.getAboutPage);

module.exports = router;