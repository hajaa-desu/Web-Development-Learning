let output = document.querySelector('.output');
output.innerHTML = '';

let i = 10;
while (i>0) {
  const para = document.createElement('p');
  para.textContent = (i == 10)? 'Countdown 10' : function(){(i == 0)? 'Blast off!' : i;};
  output.appendChild(para);
  i--;
}
   
