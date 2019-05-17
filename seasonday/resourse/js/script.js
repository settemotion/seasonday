/*
daliy番茄倒计时和todo整理项目
*/

var counting, //判断是否已有计时
    timeProgess,
    textarea,
    writeTitle,  //重写标题
    currentList, //当前记事本编号
    timerShow,   //是否正在显示时钟变量
    timer,       //时钟变量
    s_time,    //已学习时间
    confirm,    //再次确认保存
    check      //倒计时变量
; 

textarea = document.getElementById('text-box');
timeProgess = document.getElementById('timeShower');
cf_box = document.querySelector('.confirm');
counting = false;
confirm = false;
currentList = 1;
timerShow = false;

//+20
document.querySelector('.btn-20').addEventListener('click',function() {
    if (!counting) {
        var time = startTime();
        counting = true;
        check = setInterval(function() { counter(time) }, 500);     
    }
    readData();
    addProgress(20);
});


//Timer按钮
document.getElementById('timer').addEventListener('click',function() {
    if(!timerShow) {
        timerShow = true;
        timer = setInterval(function() { timeCounting() } , 500);
    } else {
        clearInterval(timer);
        document.getElementById('timeSpan').innerHTML = '&nbsp;';
        timerShow = false;
    }
})

//显示时钟
function timeCounting() {
    var now = new Date();
    document.getElementById('timeSpan').innerHTML = now;
}



//改变记事本按钮
document.getElementById('notelist').addEventListener('click',function() {
    switch(currentList)
    {
        case 1: 
            currentList = 2;
            textarea.style.borderTopColor = '#2174c7';
            readData();
            break;
        case 2:
            currentList = 3;
            textarea.style.borderTopColor = '#bf1bbf';
            readData();
            break;
        case 3:
            currentList = 1;
            textarea.style.borderTopColor = '#442233';
            readData();
            break;
    }
           
})


//关闭计时和取消保存按钮
document.getElementById('close').addEventListener('click',function() {
    clearInterval(check);
    document.title = 'seasonday';
    counting = false;
    confirm = false;
    cf_box.innerHTML = "...";
    document.querySelector('.counter').innerHTML = "NaN:NaN";
})


//清空按钮
document.getElementById('clear').addEventListener('click',function() {
    textarea.value = "";
});

//清空学习计时
document.getElementById('cleartime').addEventListener('click',function() {
    s_time = 0;
    timeProgess.value = 0;
    localStorage.setItem('studytime',s_time);
});


//读取按钮
document.getElementById('read').addEventListener('click',readData);

function readData() {
    x = localStorage.getItem(currentList);
    s_time = localStorage.getItem('studytime');
    if(!timeProgess.max) timeProgess.max = 180;
    textarea.value = x;
    timeProgess.value = s_time;
};





//保存按钮
document.getElementById('save').addEventListener('click',function() {
    if (confirm != true) {
        cf_box.innerHTML = 'confirm?';
        confirm = true;
    } else {
        x = textarea.value;
        localStorage.setItem(currentList,x);
        cf_box.innerHTML = 'ok';
        var t = setTimeout(function() {
            cf_box.innerHTML = '...';
        }, 500);
        confirm = false;
    }

});



//加勾按钮
document.getElementById('plus').addEventListener('click',function() {
    textarea.value += "✓"
});


//6hours按钮
document.getElementById('btn-hrs-1').addEventListener('click',function() {
    if(!s_time) s_time = 5;
    timeProgess.max = 360;
    timeProgess.value = s_time;
});

//3hours按钮
document.getElementById('btn-hrs-2').addEventListener('click',function() {
    if(!s_time) s_time = 5;
    timeProgess.max = 180;
    timeProgess.value = s_time;
});


//加20值到进度条
function addProgress(x) {
    s_time = Number(localStorage.getItem('studytime'));
    s_time += 20;
    timeProgess.value = s_time;
    localStorage.setItem('studytime',s_time);
}

//生成当前时间+20分钟的时间
function startTime() {
    var today = new Date();
    var h = today.getHours() + 8;    // 加8时区
    var m = today.getMinutes() + 20; //加20分钟 
    if (m >=60) {
        h += 1;
        m -= 60;
    }
    today.setHours(h,m);
    var x = today.toISOString();      
    x = x.replace("Z", "");// 转换成iso格式
    today = new Date(x);
    return today;
}

//倒计时
function counter(time) {
    var now = new Date();
    var leftTime = time - now;
    //var h = Math.floor(leftTime/1000/60/60%24);
    var m = Math.floor(leftTime/1000/60%60);
    var s = Math.floor(leftTime/1000%60);
    if (leftTime>= -300000) {
        document.getElementById('counter').innerHTML = (m +":"+s);
        document.title = "@" +m +":"+s;
    } else {
        document.title = 'seasonday';
        clearInterval(check);
        counting = false;
    }
}







