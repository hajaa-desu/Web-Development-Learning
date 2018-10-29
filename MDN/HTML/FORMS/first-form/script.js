var formInput = document.querySelectorAll('form input:not([value=""])'); 

var initVal = {}; 
for (var i = 0; i < formInput.length; i++) {
	initVal[formInput[i].id] = formInput[i].value;
	formInput[i].addEventListener('click', 
		function(e) {
			e.target.value = "";
		});	
	formInput[i].addEventListener('blur', 
		function(e) {
			if (e.target.value === "")
			e.target.value = initVal[e.target.id];
		});
}
