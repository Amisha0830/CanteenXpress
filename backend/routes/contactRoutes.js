const express = require("express");
const router = express.Router();
const contactController = require("../controllers/contactController");

// Page route
router.get("/contact", contactController.getContactPage);

// Form submission API
router.post("/api/contact", contactController.submitContact);

module.exports = router;