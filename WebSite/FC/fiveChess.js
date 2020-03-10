//创建了一个二维数组存储棋盘上落子情况
var chessBoard=[];
for (var i=0;i<15;i++){
  chessBoard[i]=[];
  for (var j=0;j<15;j++){
    chessBoard[i][j]=0;
  }
}

var me = true;
var over =false;
var wins=[]; //赢法数组

//赢法的统计数组
var myWin=[];
var rivalWin=[];
//创建了一个赢法二维数组
for (var i =0;i<15;i++){
  wins[i]=[];
  for (var j=0;j<15;j++){
    wins[i][j]=[];
  }
}

var count=0;//所有赢法数量
//所有横着的赢法
for(var i=0;i<15;i++){
  for (var j=0;j<11;j++){
    for (var k=0;k<5;k++){
      wins[i][j+k][count]=true;
    }
    count++;
  }
}
//所有竖着的赢法
for(var i=0;i<15;i++){
  for (var j=0;j<11;j++){
    for (var k=0;k<5;k++){
      wins[j+k][i][count]=true;
    }
    count++;
  }
}
//所有正斜着的赢法
for(var i=0;i<11;i++){
  for (var j=0;j<11;j++){
    for (var k=0;k<5;k++){
      wins[i+k][j+k][count]=true;
    }
    count++;
  }
}
//所有反斜线的赢法
for(var i=0;i<11;i++){
  for (var j=14;j>3;j--){
    for (var k=0;k<5;k++){
      wins[i+k][j-k][count]=true;
    }
    count++;
  }
}
console.log(count);
for (var i=0;i<count;i++){
  myWin[i]=0;
  rivalWin[i]=0;
}




var chess = document.getElementById('chess');
var context = chess.getContext('2d');//画一个二维图

context.strokeStyle="#bfbfbf";
var logo =new Image();
logo.src="../img/CC.png";
 logo.onload = function () {
   context.drawImage(logo, 0,0,450,450);
    drawChessBoard();
}

var drawChessBoard=function () {
  for (var i = 0;i<15;i++){
    //画竖线
    context.moveTo(15+i*30,15);
    context.lineTo(15+i*30,435);
    context.stroke();//用来描边画线
    //画横线
    context.moveTo(15,15+i*30);
    context.lineTo(435,15+i*30);
    context.stroke();//用来描边
  }
}
//画棋子
var oneStep= function (i,j,me) { // i,j在棋盘中的索引（位置） me是代表是否黑白棋
  context.beginPath();
  context.arc(15+i*30,15+j*30,13,0,2*Math.PI);//画扇形，画曲线，这里画圆
  context.closePath();
  //返回一个渐变颜色的对象
  var gradient = context.createRadialGradient(15+i*30+2,15+j*30-2,13,15+i*30+2,15+j*30-2,0);
  if(me){
    gradient.addColorStop(0,"#0A0A0A");
    gradient.addColorStop(1,"#636766");
  }else {
    gradient.addColorStop(0,"#D1D1D1");
    gradient.addColorStop(1,"#F9F9F9");
  }

  context.fillStyle=gradient;
  context.fill();//填充整个圆（棋子）的颜色
}

//落子事件
chess.onclick=function (e) {
   if (over){
     return;
   }
  //获取棋盘索引
  var x = e.offsetX;
  var y = e.offsetY;
  var i = Math.floor(x/30);
  var j = Math.floor(y/30);
  if(chessBoard[i][j]==0){
    oneStep(i, j, me);
    if (me){
      chessBoard[i][j]=1;
    } else {
      chessBoard[i][j]=2;
    }
    me = !me;
    for (var k=0;k<count;k++){
      if (wins[i][j][k]){
        if(chessBoard[i][j]==1){
          myWin[k]++;
          rivalWin[k]=6;
          if (myWin[k] == 5){
            window.alert(" 你赢了");
            over = true;
          }
        }else {
          myWin[k]=6;
          rivalWin[k]++;
          if (rivalWin[k]==5){
            window.alert("对手赢了");
            over=true;
          }
        }
      }
    }
  }
}



