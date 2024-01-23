const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectToDB = require("./config/db");
const cardRoute = require("./routes/card");
const authRoute = require("./routes/auth");
const verfiyToken = require("./middleware/verifyToken");
const cookies = require("cookie-parser");

const app = express();

dotenv.config();

const PORT = 5000;

// Setup EJS
app.set("view engine", "ejs");

// Default Use
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use(cookies());
app.use(express.static("public"));

connectToDB();

// Auth Routes
app.use("/auth", authRoute);

// Card Routes
app.use("/", verfiyToken, cardRoute);

app.listen(PORT, (req, res) => {
	console.log(`Listening on Port ${PORT}`);
});
