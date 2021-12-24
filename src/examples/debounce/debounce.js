//所谓防抖，就是指触发事件后,在 n 秒内函数只能执行一次，
//如果在 n 秒内又触发了事件，则会重新计算函数执行时间。
let i = 0;
function debounce(func, wait){
    let timer = null;
    return function() {
        let context = this;
        let args = arguments;
        i++;
        console.log('activing..........:' + i);
        if (timer) {
            console.log('timer is cleared');
            clearTimeout(timer);
            console.log(timer);
        } else {
            console.log('timer is null');
        }

        timer = setTimeout(function() {
            func.apply(context, args);
        }, wait);
    }
}

var num = 1;
var content = document.getElementById('content');

function count() {
    content.innerHTML = num++;
};

content.onmousemove = debounce(count, 2000);


// function debounce1(func,wait,immediate) {
//     var timeout;

//     return function () {
//         var context = this;
//         var args = arguments;

//         if (timeout) clearTimeout(timeout);
//         if (immediate) {
//             var callNow = !timeout;
//             timeout = setTimeout(function(){
//                 timeout = null;
//             }, wait)
//             if (callNow) func.apply(context, args)
//         }
//         else {
//             timeout = setTimeout(function(){
//                 func.apply(context, args)
//             }, wait);
//         }
//     }
// }
