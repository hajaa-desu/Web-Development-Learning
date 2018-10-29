// setup canvas

var scoreCount = document.querySelector('p');
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min;
  return num;
}

function Shape(x, y, velX, velY, exists) {
	this.x = x;
	this.y = y;
	this.velX = velX;
	this.velY = velY;
	this.exists = exists;
}

function Ball(x, y, velX, velY, color, size, exists) {
	Shape.call(this, x, y, velX, velY, exists);
	
	this.color = color;
	this.size = size;
}

Ball.prototype = Object.create(Shape.prototype);
Ball.prototype.constructor = Ball;

function EvilCircle(x, y, exists) {
	Shape.call(this, x, y, 20, 20, exists); 

	this.color = 'white';
	this.size = 50; 
}

EvilCircle.prototype = Object.create(Shape.prototype);
EvilCircle.prototype.constructor = EvilCircle; 

Ball.prototype.draw = function() {
	ctx.beginPath(); 
	ctx.fillStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
	ctx.fill(); 
}

/*
var balls = [];
for (var i = 0; i < 100; i++) {
	balls.push(new Ball(random(0, width), random(0, height), random(4,10), random(4,10), `rgb( ${random(0, 255)}, ${random(0, 255)}, ${random(0, 255)} )`, random(5,20))); 
	balls[i].draw();
}
*/

Ball.prototype.update = function() {
	if ((this.x + this.size) >= width) {
		this.velX = -(this.velX); 
	}

	if ((this.x - this.size) <= 0) {
		this.velX = -(this.velY); 
	}

	if ((this.y + this.size) >= height) {
		this.velY = -(this.velY); 
	}

	if ((this.y - this.size) <= 0) {
		this.velY = -(this.velY); 
	}

	this.x += this.velX;
	this.y += this.velY; 	
}

Ball.prototype.collisionDetect = function() {
	for (var j = 0; j < balls.length; j++) {
		if (!(this === balls[j])) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y; 
			var distance = Math.sqrt(dx * dx + dy * dy); 

			if (distance < this.size + balls[j].size) {
				balls[j].color = this.color = 'rgb(' + random(0, 255) + ',' + random(0, 255) + ',' + random(0, 255) + ')';
			}
		}
	}
}

EvilCircle.prototype.draw = function() {
	ctx.beginPath(); 
	ctx.linewidth = 3;
	ctx.strokeStyle = this.color;
	ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); 
	ctx.stroke(); 
}


EvilCircle.prototype.checkBounds = function() {
	if ((this.x + this.size) >= width) {
		this.x = this.x - this.size; 
	}

	if ((this.x - this.size) <= 0) {
		this.x = this.x + this.size; 
	}

	if ((this.y + this.size) >= height) {
		this.y = this.y - this.size; 
	}

	if ((this.y - this.size) <= 0) {
		this.y = this.y + this.size; 
	}
}

EvilCircle.prototype.setControls = function() {
	var _this = this; // this is assigned to _this so that in function(e) (next line), the keyword "this" is in the scope of window (e) instead of the EvilCircle object instance, which we want to access instead
	window.onkeydown = function(e) {
		if (e.keyCode === 65) {
			_this.x -= _this.velX; 
		} else if (e.keyCode === 68) {
			_this.x += _this.velX;
		} else if (e.keyCode === 87) {
			_this.y -= _this.velY; 
		} else if (e.keyCode === 83) {
			_this.y += _this.velY; 
		}
	}
}

EvilCircle.prototype.collisionDetect = function() {
	var killcount = 0; 
	for (var j = 0; j < balls.length; j++) {
		if (balls[j].exists) {
			var dx = this.x - balls[j].x;
			var dy = this.y - balls[j].y; 
			var distance = Math.sqrt(dx * dx + dy * dy); 

			if (distance < this.size + balls[j].size) {
				balls[j].exists = false;
				killcount++; 
			}
		}
	}
	return killcount;
}

var balls = [];

while (balls.length < 25) {
	var size = random(10,20);
	var ball = new Ball(
	  // ball position always drawn at least one ball width
	  // away from the edge of the canvas, to avoid drawing errors
	  random(0 + size,width - size),
	  random(0 + size,height - size),
	  random(-7,7),
	  random(-7,7),
	  'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
	  size,
	  true
	);
	balls.push(ball);
}

var evil = new EvilCircle(width/2, width/2, true);
evil.setControls();

var ballCount = balls.length + 1;

function loop() {
  ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
  ctx.fillRect(0, 0, width, height);
  scoreCount.textContent = `Ball count: ${ballCount}`;

  evil.draw();

  for (var i = 0; i < balls.length; i++) {
  	evil.checkBounds();
  	ballCount -= evil.collisionDetect();
  	if (balls[i].exists === true) {
  			balls[i].draw();
    		balls[i].update();
    		balls[i].collisionDetect();
  		}
    }

  requestAnimationFrame(loop);
}

loop();


