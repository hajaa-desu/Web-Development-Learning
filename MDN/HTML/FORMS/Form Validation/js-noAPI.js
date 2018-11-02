var form = document.getElementsByTagName('form')[0];
var email = document.getElementById('mail');

var error = email;
while ((error = error.nextSibling).nodeType != 1); 

var emailRegExp = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

function addEvent(element, event, callback) {
	var previousEventCallBack = element["on" + event];
	element["on"+event] = function(e) {
		var output = callback(e);

		if (output == false) return false;

		if (typeof previousEventCallBack === 'function') {
			output = previousEventCallBack(e); 
			if (output === false) return false;
		}
	}
};

addEvent(window, "load", function() {
	var test = email.value.length === 0 || emailRegExp.test(email.value); 

	email.className = test? "valid" : "invalid";
});

addEvent(email, "input", function() {
	var test = email.value.length === 0 || emailRegExp.test(email.value);
	if (test) {
		email.className = "valid";
		error.innerHTML = "";
		error.className = "error";
	} else {
		email.className = "invalid"; 
	}
});

addEvent(form, "submit", function() {
	var test = email.value.length === 0 || emailRegExp.test(email.value);

	if (!test) {
		email.className = "invalid";
		error.innerHTML = "I expect an e-mail! e.g. JohnDoe@email.com";
		error.className = "error active";

		return false;
	} else {
		email.className = "valid";
		error.innerHTML = "";
		error.className = "error";
	}
})