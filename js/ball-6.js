var balls = [],
	maxH = 600,
	maxW = 1000,
	br = true;

function addBalls() {
	var dom = document.createElement('p');
	dom.className = 'ball ball' + Math.ceil(Math.random() * 6);
	var obj = {
		dom: dom,
		x: 10 + Math.random() * 20,
		vx: 6 + 6 * Math.random(),
		y: Math.ceil(Math.random() * 200),
		vy: -Math.ceil(Math.random() * 20),
		g: 1,
		xback: br //是否触及右边界反弹的开关
	}
	document.body.appendChild(dom);
	balls.push(obj);
}


function draw() {
	for(var i = 0; i < balls.length; i++) {
		balls[i].dom.style.left = balls[i].x + 'px'
		balls[i].dom.style.top = balls[i].y + 'px'
	}
}

function update() {
	for(var i = 0; i < balls.length; i++) {
		//基础计算
		balls[i].x = balls[i].x + balls[i].vx;
		balls[i].y = balls[i].y + balls[i].vy;
		balls[i].vy = balls[i].vy + balls[i].g;

		//触底反弹
		if(balls[i].y >= maxH) {
			balls[i].y = maxH;
			balls[i].vy = -balls[i].vy * 0.7
		}

		//触及右边界反弹
		if(balls[i].xback) {
			if(balls[i].x >= maxW) {
				balls[i].x = maxW;
				balls[i].vx = -balls[i].vx
			}
		}

	}
}

function deleteBall(){
	for(var i=balls.length-1; i>=0; i-- ){
		if(balls[i].x <= -200 || balls[i].x > 2000){
			document.body.removeChild(balls[i].dom);
			balls.splice(i,1);
		}
	}
}


function move() {
	draw();
	update();
	deleteBall();
}

function changeBr(){
	if(br) br=false;
	else br=true;
	for(var i=0; i<balls.length;i++){
		balls[i].xback = br;
	}
}

setInterval(move, 1000 / 60)
setInterval(addBalls, 500)