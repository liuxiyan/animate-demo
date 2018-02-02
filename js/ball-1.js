var ball = {
	dom: document.getElementById('ball'),
	x: 10,
	vx: 4
}

function draw(){
	ball.dom.style.left = ball.x + 'px'
}

function update(){
	ball.x = ball.x + ball.vx;
}

function move(){
	update();
	draw();
}

setInterval(move,1000/30)

