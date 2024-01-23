function toggleForm(formId) {
	document.getElementById("loginForm").style.display =
		formId === "loginForm" ? "flex" : "none";
	document.getElementById("signupForm").style.display =
		formId === "signupForm" ? "flex" : "none";
}
