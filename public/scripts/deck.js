const deleteButton = document.querySelector("#delete-card");

const sliderButtons = document.querySelectorAll("[data-slider-button]");
const slides = document.querySelector("[data-slides]");

sliderButtons.forEach((button) => {
	slides.children[0].dataset.active = "active";
	DisableNextButton(button);
	button.addEventListener("click", (e) => {
		const offset = button.dataset.sliderButton === "next" ? 1 : -1;
		const activeSlide = slides.querySelector(`[data-active="active"]`);
		let newIndex = [...slides.children].indexOf(activeSlide) + offset;

		if (newIndex < 1) newIndex = slides.children.length - 1;

		if (newIndex > slides.children.length - 1) newIndex = 0;

		[...slides.children][newIndex].dataset.active = "active";
		activeSlide.dataset.active = "not-active";
	});
});

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

function DisableNextButton(button) {
	if (button.dataset.sliderButton) {
		if (slides.children.length <= 1) button.disabled = true;
	}
}
