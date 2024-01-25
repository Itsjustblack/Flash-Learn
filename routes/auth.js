const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

// Display SignUp Page
router.get("/register", (req, res) => {
	res.render("register");
});

// Display Login Page
router.get("/", (req, res) => {
	res.render("login");
});

// Create User
router.post("/register", async (req, res) => {
	const user = new User({
		email: req.body.email,
		password: req.body.password,
	});

	const emailExist = await User.findOne({ email: req.body.email });
	if (emailExist)
		return res
			.status(400)
			.send(JSON.stringify({ message: "Email Already Exists" }));

	try {
		const savedUser = await user.save();
		res.send(JSON.stringify({ message: "User Created Successfully" }));
	} catch (error) {
		res.status(400).send(error);
	}
});

// Login User
router.post("/login", async (req, res) => {
	const user = await User.findOne({ email: req.body.email });
	if (!user)
		return res
			.status(401)
			.send(JSON.stringify({ message: "Email is Invalid" }));

	const validPass = req.body.password === user.password;
	if (!validPass)
		return res
			.status(401)
			.send(JSON.stringify({ message: "Invalid Password" }));

	const token = jwt.sign({ _id: user.id }, process.env.TOKEN_SECRET);

	res
		.cookie("authToken", token, { httpOnly: true })
		// .redirect("/dashboard")
		.send(JSON.stringify({ message: "Login Successful" }));
});

module.exports = router;
