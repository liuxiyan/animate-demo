var ball = {
	dom: document.getElementById('ball'),
	x: 10,
	vx: 4,
	y: 50,
	vy: 0,
	g: 1
}

function draw(){
	ball.dom.style.left = ball.x + 'px'
	ball.dom.style.top = ball.y + 'px'
}

function update(){
	ball.x = ball.x + ball.vx;
	ball.y = ball.y + ball.vy;
	ball.vy = ball.vy + ball.g;
}

function move(){
	update();
	draw();
}

setInterval(move,1000/60)

