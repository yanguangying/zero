// 交互
// 用户点击数字
    // 1. 判断当前方块是否可以移动，移动之后判断是否完成拼图
// 用户点击开始/暂停
    // 开始计时，完成拼图结束计时提示完成
// 用户点击重来
    // 开始一个新的拼图，打乱原来的顺序并开始计时

// 保存定时时间
var time = 0;
// 是否暂停，true为暂停
var pause = true;
// 定时器
var set_timer;
// 可以移动的位置，索引为位置，值为可以移动的方向
var d_direct = new Array(
    [0],
    [2,4],
    [1,3,5],
    [2,6],
    [1,5,7],
    [2,4,6,8],
    [3,5,9],
    [4,8],
    [5,7,9],
    [6,8]
    );
// 移动的坐标
var d_posXY = new Array(
    [0],
    [0,0],
    [150,0],
    [300,0],
    [0,150],
    [150,150],
    [300,150],
    [0,300],
    [150,300],
    [300,300],
    );
// 保存编号，索引为位置，值为方块上的数字
var d = new Array(10);
d[1] = 1;
d[2] = 2;
d[3] = 3;
d[4] = 4;
d[5] = 5;
d[6] = 6;
d[7] = 7;
d[8] = 8;
d[9] = 0;

window.onload = function(){
    reset();
}

function reset() {
    time = 0;
    random_d();
    if(pause){
        start();
    }
}

// 将数字乱序排列
function random_d() {
    for(var i = 9;i>1;--i){
        // 随机一个目的位置
        var to = parseInt(Math.random()*(i-1)+1);
        if(d[i]!=0){
            document.getElementById("d"+d[i]).style.left = d_posXY[to][0]+"px";
            document.getElementById("d"+d[i]).style.top = d_posXY[to][1]+"px";
        }
        if(d[to]!=0){
            document.getElementById("d"+d[to]).style.left = d_posXY[i][0]+"px";
            document.getElementById("d"+d[to]).style.top = d_posXY[i][1]+"px";
        }
        // 更改d中的数字顺序
        var tem = d[to];
        d[to] = d[i];
        d[i] = tem;
    }
}

function start() {
    if(pause){
        document.getElementById("start").innerHTML="暂停";
        pause = false;
        set_timer = setInterval(timer,1000);
    }else{
        document.getElementById("start").innerHTML="开始";
        pause = true;
        clearInterval(set_timer);
    }
}

function timer(){
    time +=1;
    var min = parseInt(time/60);
    var sec = time%60;
    document.getElementById("timer").innerHTML = min+"分"+sec+"秒";
}

function move(id){
    debugger
    var i = 1;
    for(i= 1;i<10;++i){
        if(d[i] == id){
            console.log(i);
            
            break;
        }
    }
    var target_d = 0;
    target_d = whereCanTo(i);
    if(target_d != 0){
        // 能动将索引位置的值改变，并调整样式移动数字
        d[i] = 0;
        d[target_d] = id;
        document.getElementById("d"+id).style.left = d_posXY[target_d][0]+"px";
        document.getElementById("d"+id).style.top = d_posXY[target_d][1]+"px";
    }
    var finish_flag = true;
    for(var k =1;k<9;++k){
        if(d[k]!= k){
            finish_flag = false;
            break;
        }
    }
    if(finish_flag == true){
        if(!pause){
            start();
            alert("congratulation");
        }
    }
}

function whereCanTo(cur_div){
    var j = 0;
    var move_flag = false;
    for(j = 0;j<d_direct[cur_div].length;++j){
        if(d[d_direct[cur_div][j]] == 0){
            move_flag = true;
            break;
        }
    }
    // 判断能否移动，能动返回目标位置索引，不能动返回0
    if(move_flag == true){
        return d_direct[cur_div][j];
    }else{
        return 0;
    }
}