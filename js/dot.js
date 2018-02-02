//随机大小、随机尺寸
//划分区块？
//var canvas
var canvas = document.getElementById('myCanvas');
var context = canvas.getContext('2d');
var imgMap = new Image();
var showPix;

var ball = function(obj) {
	this.posO = {
		x: obj.x,
		y: obj.y,
		c: obj.c
	};
	this.posE = {}
	this.append();
};
ball.prototype.append = function() {
	this.posE.x = this.posO.x + Math.random() * 15;
	this.posE.y = this.posO.y + Math.random() * 15;
	this.alpha = Math.random() * 0.5 + 0.5;
	this.aSpeed = 0.02 + Math.random() / 50;
	this.r = 0;
	this.rSpeed = Math.random() * 0.3;
}
ball.prototype.update = function() {
	if(this.alpha < 0) this.append();
	this.r += this.rSpeed;
	this.alpha -= this.aSpeed;
}
ball.prototype.draw = function() {
	var _this = this;
	context.beginPath();
	context.arc(_this.posE.x, _this.posE.y, _this.r, 0, 2 * Math.PI, false);
	context.fillStyle = 'rgba(233,84,86,' + _this.alpha + ')';

	context.fill();
}
ball.prototype.gogogo = function() {
	this.update();
	this.draw();
}

//功能区
var s = {
	width: 1400 //地图的宽
		,
	height: 840 //地图的高
		,
	rows: 280 //竖着几行
		,
	cols: 350 //横着每列
		,
	balls: [] //放置点点
};
s.interval = function() {
	s.intevalFn = setInterval(function() {
		context.clearRect(0, 0, canvas.width, canvas.height);
		for(var i = 0; i < s.balls.length; i++) {
			s.balls[i].gogogo();
		}
	}, 1000 / 15)

}
s.imageFn = function() {
	context.clearRect(0, 0, s.width, s.height) //清空图片
	for(var r = 0; r < s.rows; r++) //一行行绘制
	{
		for(var c = 0; c < s.cols; c++) //一列列绘制
		{
			var x = (c * s.wid) + (s.wid / 2);
			var y = (r * s.hei) + (s.hei / 2);
			var pos = (Math.floor(y) * (s.imageData.width * 4)) + (Math.floor(x) * 4);
			if(s.pixels[pos] < 85) {
				var cc = s.pixels[pos];
				var ballsingle = new ball({
					x: x,
					y: y,
					c: cc
				});
				s.balls.push(ballsingle);
			}
		}
	}
	s.interval();
};
s.showPix = function(br) {
	clearInterval(s.intevalFn);
	context.clearRect(0, 0, s.width, s.height);
	for(var r = 0; r < s.rows; r++) //一行行绘制
	{
		for(var c = 0; c < s.cols; c++) //一列列绘制
		{
			var x = (c * s.wid) + (s.wid / 2);
			var y = (r * s.hei) + (s.hei / 2);
			var pos = (Math.floor(y) * (s.imageData.width * 4)) + (Math.floor(x) * 4);
			context.beginPath();
			context.arc(x, y, s.r2, 0, 2 * Math.PI, false);
			if(br) {
				context.beginPath();
				context.arc(x, y, s.r, 0, 2 * Math.PI, false);
				context.fillStyle = 'rgb(' + s.pixels[pos] + ',' + s.pixels[pos + 1] + ',' + s.pixels[pos + 2] + ')';
				context.fill();
			} else {
				if(s.pixels[pos] < 85) {
					context.beginPath();
					context.arc(x, y, s.r, 0, 2 * Math.PI, false);
					context.fillStyle = 'rgb(' + s.pixels[pos] + ',' + s.pixels[pos + 1] + ',' + s.pixels[pos + 2] + ')';
					context.fill();
				}
			}
		}
	}
}

//图片加载
imgMap.onload = function() {
	context.drawImage(imgMap, 0, 0, s.width, s.height);
	s.r = (s.height / s.cols) * 0.6;
	s.imageData = context.getImageData(0, 0, s.width, s.height); //图片信息
	s.pixels = s.imageData.data //写入图片后获取图片的rgba信息
	s.wid = s.imageData.width / s.cols;
	s.hei = s.imageData.height / s.rows;
}
imgMap.src = 'img/test4.jpg';