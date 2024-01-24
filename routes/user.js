const router = require("express").Router();
const User = require("../models/User");

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
