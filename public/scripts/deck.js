const deleteButton = document.querySelector("#delete-card");
const sliderButtons = document.querySelectorAll("[data-slider-button]");
const slides = document.querySelector("[data-slides]");
const cards = document.querySelectorAll(".slide");

const counter = document.querySelector("#current-slide");

UpdateCurrentSlide(1);

cards.forEach((card) => {
	card.addEventListener("click", (e) => {
		const isFlipped = card.dataset.flipped === "true";
		card.dataset.flipped = isFlipped ? "false" : "true";
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

const slideWidth = slides.clientWidth;
let currentSlide = 0;

function changeSlide(direction) {
	currentSlide += direction;
	if (currentSlide < 0) {
		currentSlide = slides.children.length - 1;
	} else if (currentSlide >= slides.children.length) {
		currentSlide = 0;
	}
	UpdateCurrentSlide(currentSlide + 1);
	updateSlider();
	cards.forEach((card) => {
		card.dataset.flipped = false;
	});
}

function updateSlider() {
	const translateX = -currentSlide * slideWidth;
	slides.style.transform = `translateX(${translateX}px)`;
}

function UpdateCurrentSlide(slide) {
	let slideCount = slides.children.length;
	counter.innerHTML = `${slide} / ${slideCount}`;
}
