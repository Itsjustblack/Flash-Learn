const cardHolder = document.querySelector("#card-holder");
const addCardButton = document.querySelector("#add-card");

async function handleSubmit(e) {
	e.preventDefault();
	try {
		// const id = e.currentTarget.dataset.currentcard;
		const payload = GetFormData(e.currentTarget);
		console.log(payload);
		// const res = await fetch(`/decks/edit/${id}`, {
		// 	method: "post",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(payload),
		// });
		// const data = await res.json();
		// setTimeout(() => (document.location.href = `/decks/${data.id}`), 500);
	} catch (error) {
		console.log(error);
	}
}

addCardButton.addEventListener("click", (e) => {
	let cardNumber = cardHolder.childElementCount;
	const newCard = document.createElement("div");
	newCard.id = `card-${++cardNumber}`;
	newCard.innerHTML = `<div class="rounded-lg w-full bg-[#2e3856] text-white">
							<div
								class="w-full px-5 py-4 flex justify-between border-b-2 border-black"
							>
								<span class="text-sm font-bold">${cardNumber}</span>
								<button
									type="button"
									id="delete-card"
									data-cardnumber="${cardNumber}"
								>
									<img
										class="w-5 h-5 object-cover"
										src="/assets/delete.svg"
										alt=""
									/>
								</button>
							</div>
							<div class="py-5 px-5 flex gap-x-10 justify-center">
								<div class="w-full">
									<input
										type="text"
										name="question${cardNumber}"
										class="text-sm block w-full border-b-4 pb-2 border-gray-600 placeholder-gray-400 bg-[#2e3856] text-white focus:outline-none focus:border-white focus:bg-[#2e3856] question"
										placeholder="Enter Your Question"
										required
									/>
									<p class="text-sm font-bold tracking-tight mt-2">Question</p>
								</div>
								<div class="w-full">
									<input
										type="text"
										name="answer${cardNumber}"
										class="text-sm block w-full border-b-4 pb-2 border-gray-600 placeholder-gray-400 bg-[#2e3856] text-white focus:outline-none focus:border-white focus:bg-[#2e3856] answer"
										placeholder="Enter Your Question"
										required
									/>
									<p class="text-sm font-bold tracking-tight mt-2">Question</p>
								</div>
							</div>
						</div>`;
	cardHolder.append(newCard);
	AddDeleteButton();
});

function ConvertToDeck(input) {
	const cards = [];
	if (!hasQuestionAnswerPairs(input))
		throw new Error("Please Enter a New Card");

	const { title, ...qaPairs } = input;
	for (let i = 1; i <= Object.keys(qaPairs).length; i++) {
		const questionKey = `question${i}`;
		const answerKey = `answer${i}`;

		// Check if both question and answer keys exist
		if (qaPairs[questionKey] && qaPairs[answerKey]) {
			cards.push({
				question: qaPairs[questionKey],
				answer: qaPairs[answerKey],
			});
		}
	}
	return { title, cards };
}

function hasQuestionAnswerPairs(obj) {
	console.log(obj);
	for (const key in obj) {
		if (obj.hasOwnProperty(key) && /^question\d+$/.test(key)) {
			const correspondingAnswerKey = `answer${key.slice(8)}`;
			if (!obj.hasOwnProperty(correspondingAnswerKey)) {
				return false;
			}
		}
	}
	return true;
}

function AddDeleteButton() {
	const deleteCardButtons = document.querySelectorAll("#delete-card");
	deleteCardButtons.forEach((button) => {
		button.addEventListener("click", (e) => {
			const currentCardNumber = button.dataset.cardnumber;
			const currentCard = document.querySelector(`#card-${currentCardNumber}`);
			currentCard.remove();
		});
	});
}

function GetFormData(target) {
	const form = new FormData(target);
	const formData = Object.fromEntries(form.entries());
	return ConvertToDeck(formData);
}

AddDeleteButton();
