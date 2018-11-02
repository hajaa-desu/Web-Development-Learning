var email = document.getElementById("t2");

email.addEventListener("input", function(e) {
	var email = e.target;
	if (email.validity.typeMismatch) {
		email.setCustomValidity("Sweetheart, I expect an email! That's not it.");
	} else {
		email.setCustomValidity("");
	}
});