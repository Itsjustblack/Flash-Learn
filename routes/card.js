const express = require("express");
const Deck = require("../models/Deck");

const router = express.Router();

// Display Dashboard & Display All User Decks
router.get("/dashboard", async (req, res) => {
	try {
		const decks = await Deck.find({ _user: req.user._id });
		res.render("dashboard", { decks });
	} catch (error) {
		res.status(400).send(error);
	}
});

// Display Create Deck Page
router.get("/decks/create", (req, res) => {
	res.render("create");
});

// Display a Deck by ID
router.get("/decks/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const currentDeck = await Deck.findById(id);
		res.render("deck", { currentDeck });
	} catch (error) {
		res.status(400).send(error);
	}
});

// Create New Deck
router.post("/decks/create", async (req, res) => {
	const deck = new Deck({
		title: req.body.title,
		cards: req.body.cards,
		_user: req.user._id,
	});
	try {
		const savedDeck = await deck.save();
		res.send({ id: savedDeck._id });
	} catch (error) {
		res.status(400).send(error);
	}
});

// Delete Deck by ID
router.delete("/decks/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const currentDeck = await Deck.findByIdAndDelete(id);
		res.send(JSON.stringify({ id: currentDeck.id }));
	} catch (error) {
		res.status(400).send(error);
	}
});

module.exports = router;
