const mongoose = require("mongoose");
const Card = require("./Card");

const deckSchema = new mongoose.Schema({
	title: {
		type: String,
		required: true,
		minlength: 2,
		maxlength: 50,
	},
	cards: [Card.schema],
	createdAt: {
		type: Date,
		default: Date.now(),
	},
	_user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "User",
	},
});

const Deck = mongoose.model("Deck", deckSchema);

module.exports = Deck;
