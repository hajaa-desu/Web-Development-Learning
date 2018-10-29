var btn = document.querySelector('button');

btn.onclick = function(){
	var name = prompt("Qu'est-ce-que ton nom?"); 
	alert('Bonjour Monsieur ' + name + ', vous tres beau aujourd\'hui!');
}