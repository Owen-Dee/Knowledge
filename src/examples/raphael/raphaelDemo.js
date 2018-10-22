//在my-canvas节点上面创建画布
var paper = Raphael("my-canvas", 500, 300);
//在(20,20)位置创建一个宽100，高60的直角矩形
var rect = paper.rect(20, 20, 100, 60);
//在(140,20)位置创建一个宽100，高60，圆角半径10的圆角矩形
var rectR = paper.rect(160, 20, 100, 60, 10);
//在(50,150)位置绘制一个半径为40的圆形
var cir = paper.circle(50, 150, 40);
//在(150,150)绘制一个横向半径50，竖向半径35的椭圆
var ellipse = paper.ellipse(150, 150, 50, 35);
//位置提示
var tip = paper.text(5, 20, "(10,20)");
var tipR = paper.text(145, 20, "(160,20)");
var tipC = paper.text(50, 150, "(100,50)");
var tipE = paper.text(150, 150, "(100,140)");