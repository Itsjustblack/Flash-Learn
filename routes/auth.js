const router = require("express").Router();
const jwt = require("jsonwebtoken");
const User = require("../models/User");

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
		res.send({ id: savedUser.id });
	} catch (error) {
		res.status(400).send(error);
	}
});

// Display Login Page
router.get("/login", (req, res) => {
	res.render("login");
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

// Get User by ID
router.post("/users", async (req, res) => {
	try {
		const user = await User.findById(req.body.id);
		if (!user) throw new Error();
		return res.send(user);
	} catch (error) {
		res.status(400).send("User Not Found");
	}
});

// Get User by Email
router.post("/users", async (req, res) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) throw new Error();
		return res.send(user);
	} catch (error) {
		res.status(400).send("User Not Found");
	}
});

// Delete User by Email
router.delete("/users", async (req, res) => {
	try {
		const deletedUser = await User.findOne({ email: req.body.email });
		if (!deletedUser) throw new Error();
		return res.send(deletedUser);
	} catch (error) {
		res.status(400).send("User not found");
	}
});

module.exports = router;
