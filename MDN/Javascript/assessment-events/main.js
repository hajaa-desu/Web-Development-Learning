var displayedImage = document.querySelector('.displayed-img');
var thumbBar = document.querySelector('.thumb-bar');

var btn = document.querySelector('button');
var overlay = document.querySelector('.overlay');

/* Looping through images */

for (var i = 0; i < 5; i++) {
  var newImage = document.createElement('img');
  var srcDir = ['images', 'pic' + (i+1) + '.jpg'].join('/');
  //console.log(srcDir);
  newImage.setAttribute('src', srcDir);
  newImage.setAttribute('alt', srcDir);
  newImage.addEventListener('click', function(e) {
  	displayedImage.setAttribute('src', e.target.getAttribute('src'));
  });
  thumbBar.appendChild(newImage);
}

/* Wiring up the Darken/Lighten button */
var overlaySwitch = 0; 
btn.addEventListener('click', function() {
	if (overlaySwitch === 0) {
		btn.textContent = 'Lighten';
		overlay.style.opacity = 0.5; 
		overlaySwitch = 1;
	}
	else {
		btn.textContent = 'Darken';
		overlay.style.opacity = 0.0;
		overlaySwitch = 0;
	}
});
