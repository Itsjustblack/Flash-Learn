const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Display SignUp Page
router.get("/register", (req, res) => {
	res.render("register");
});

// Display Login Page
router.get("/", (req, res) => {
	// const token = req.cookies.authToken;
	res.render("login");
});

// Create User
router.post("/register", async (req, res) => {
	const user = new User({
		username: req.body.username,
		email: req.body.email,
		password: req.body.password,
	});

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist) return res.status(400).send("Email Already Exists");

	try {
		const savedUser = await user.save();
		res.redirect("/auth/login");
	} catch (error) {
		res.status(400).send(error);
	}
});

// Login User
router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(401).send("Email is Invalid");

	const validPass = req.body.password === user.password;
	if (!validPass) return res.status(401).send("Invalid Password");

	const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

	res
		.cookie("authToken", token, { httpOnly: true })
		// .send("Successful Login")
		.redirect("/dashboard");
});

module.exports = router;
