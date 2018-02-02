var ball = {
	dom: document.getElementById('ball'),
	x: 10,
	vx: 4,
	y: 50,
	vy: -10,
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
	if(ball.y >= 600){
		ball.y = 600;
		ball.vy = -ball.vy*0.7
	}
}

function move(){
	update();
	draw();
}

setInterval(move,1000/60)

