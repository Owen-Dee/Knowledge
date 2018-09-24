//所谓节流，就是指连续触发事件但是在 n 秒中只执行一次函数。
//节流会稀释函数的执行频率
function throttle(func, wait) {
    let prev = 0;

    return function() {
        let context = this;
        let now = Date.now();
        let args = arguments;
        if (now - prev > wait) {
            func.apply(context, args);
            prev = now;
        }
    }
}

var num = 1;
var content = document.getElementById('content');

function count() {
    content.innerHTML = num++;
};

content.onmousemove = throttle(count, 1000);