async function handleSubmit(e) {
	e.preventDefault();
	try {
		const form = new FormData(e.currentTarget);
		const formData = Object.fromEntries(form.entries());
		console.log(formData);
		const res = await fetch("/login", {
			method: "post",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(formData),
		});
		const data = await res.json();
		alert(data.message);
		if (res.status == 200)
			setTimeout(() => (document.location.href = "/dashboard"), 100);
	} catch (error) {
		console.log(error);
	}
}
