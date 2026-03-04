const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");
const connectDB = require("./config/db");
const errorHandler = require("./middleware/errorHandler");

dotenv.config();
connectDB();

const app = express();

// ✅ EJS setup
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

app.use(cors());
app.use(express.json());

// API Routes
app.use("/api/auth", require("./routes/auth.route"));
app.use("/api/orders", require("./routes/orderRoutes"));
app.use("/about", require("./routes/aboutRoutes")); // ✅ added

// ✅ Home page route — serves home.ejs
app.get("/home", (req, res) => {
  res.render("home");
});

// Health check
app.get("/", (req, res) => {
  res.json({ message: "Canteen API is running 🍽️" });
});

app.use(errorHandler);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});