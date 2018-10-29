var ranButton = document.querySelector("#gen-num");
var ranSpace = document.querySelector("#rand-num-space");

var randomRange = function(min, max) {
	if ((min > max) || (min === max)) {
		console.log('Invalid parameters: min must be less and not equal to max!');
		return;
	}
	return Math.round(Math.random() * (max - min + 1) + min);
}

ranButton.addEventListener("click", function() {
	var ranNum = randomRange(1, 100);
	ranSpace.textContent = ranNum;
});

var rangeSlide = document.querySelector('input[type="range"]');
var sliderValue = document.querySelector('#range-val span');

sliderValue.textContent = rangeSlide.value;

rangeSlide.addEventListener("change", function(e) {
	sliderValue.textContent = e.target.value;
});

var beans = document.querySelector('#beans');
var count = document.querySelector('.beancount');

count.textContent = beans.value;

beans.oninput = function() {
  count.textContent = beans.value;
}
