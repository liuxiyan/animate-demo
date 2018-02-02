var balls = [];
var maxH = 600;

function addBalls() {
	var dom = document.createElement('p');
	dom.className = 'ball ball' + Math.ceil(Math.random() * 6);
	var obj = {
		dom: dom,
		x: 10 + Math.random() * 20,
		vx: 4,
		y: Math.ceil(Math.random() * 200),
		vy: -Math.ceil(Math.random() * 20),
		g: 1
	}
	document.body.appendChild(dom);
	balls.push(obj);
}

document.body.onclick = function(){addBalls()}

function draw() {
	for(var i = 0; i < balls.length; i++) {
		balls[i].dom.style.left = balls[i].x + 'px'
		balls[i].dom.style.top = balls[i].y + 'px'
	}
}

function update() {
	for(var i = 0; i < balls.length; i++) {
		balls[i].x = balls[i].x + balls[i].vx;
		balls[i].y = balls[i].y + balls[i].vy;
		balls[i].vy = balls[i].vy + balls[i].g;
		if(balls[i].y >= maxH) {
			balls[i].y = maxH;
			balls[i].vy = -balls[i].vy * 0.7
		}
	}
}

function move() {
	update();
	draw();
}

setInterval(move, 1000 / 60)


