
//动画准备
var startBtn=document.getElementById('startBtn')
var endBtn=document.getElementById('endBtn')
//暂停判断
var ani=true;
startBtn.onclick=function(){ani=true}
endBtn.onclick=function(){ani=false}
//var canvas
var canvas=document.getElementById('snow');
var context=canvas.getContext('2d');

var cliW=canvas.width;
var cliH=canvas.height;
var len=canvas.width/5;
var balls=[];


var ball=function()
{
	this.pos={};
	this.append();
}
ball.prototype.append=function()
{
	this.pos.x=cliW*Math.random();
	this.pos.y=-Math.random()*300;
    var big=Math.random();
    if(big>0.7){//大雪花，大一点，白一点，向下速度快一点<----视差效果
        this.r= 4+Math.random()*4;
        this.speed=-(0.5+Math.random()*2);
        this.alpha =0.5+Math.random()*0.2;
    }
    else{//小雪花，小一点，颜色淡一点，向下速度慢一点
        this.r= 2+Math.random()*2;
        this.speed=-(0.2+Math.random());
        this.alpha =0.4+Math.random()*0.1;
    }
	this.speedA=0.0006+Math.random()*0.001;//透明度降低的速度
	this.speedX=Math.random()>0.5?Math.random()*0.7:-Math.random()*0.7;//横向随机飘动的速度
}
ball.prototype.update=function()
{
	if(this.alpha<0||this.pos.x<-200||this.pos.x>2200||this.pos.y<-300) this.append();//看不到了就重新开始飘
	this.alpha-=this.speedA;
	this.pos.y-=this.speed;
	this.pos.x+=this.speedX;
}
ball.prototype.draw=function()
{
	var _this=this;
	context.beginPath();
	context.arc(_this.pos.x, _this.pos.y, _this.r, 0, 2 * Math.PI, false);
	context.fillStyle = 'rgba(255,255,255,'+ _this.alpha+')';
	context.fill();
}
ball.prototype.gogogo=function()
{
	this.update();
	this.draw();
}


//开始了
for(var i=0;i<len;i++)
{
		var b=new ball();//新建小气泡
		balls.push(b);//把气泡放到balls数组里
}
setInterval(function(){
	if(ani)
	{
		context.clearRect(0,0,cliW,cliH);//把画布擦干净
		for(var i=0;i<balls.length;i++)
		{
			balls[i].gogogo();//绘制所有小气泡
		}
	}
},1000/30)
