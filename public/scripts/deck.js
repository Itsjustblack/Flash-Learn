const deleteButton = document.querySelector("#delete-card");

deleteButton.addEventListener("click", async (e) => {
	e.preventDefault();
	const currentCard = deleteButton.dataset.currentcard;

	try {
		await fetch(`/decks/${currentCard}`, {
			method: "delete",
			headers: { "Content-Type": "application/json" },
		});
		setTimeout(() => (document.location.href = "/dashboard"), 500);
	} catch (error) {
		console.log(error);
	}
});
