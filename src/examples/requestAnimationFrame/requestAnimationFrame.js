// 1. 简单版本 https://juejin.im/post/6844903782359236615
/**
 * rAF并不能保证提供60FPS的动画效果，这只是一种避免丢帧以及提高效率的方法，从而帮助获取更多的FPS值
 */
let element = document.querySelector('#box');
let left = 0;
let rafId = 0;

const move = () => {
    element.style.marginLeft = (++left) + `px`;
    if (left == 60) {
        cancelAnimationFrame(rafId);
    } else {
        rafId = requestAnimationFrame(move);
    }
}

rafId = requestAnimationFrame(move);


// 2.
// var element = document.getElementById('box');
// var startTime;
// var duration = 1000; // 1 second or 1000ms
// var distance = 60; // 60FPS

// var rAFCallback = function( timestamp ){
//     console.log('timestamp: ' + timestamp);
// 	startTime = startTime || timestamp; // set startTime is null

//   var timeElapsedSinceStart = timestamp - startTime;
//   var progress = timeElapsedSinceStart / 1000;

//   var safeProgress = Math.min( progress.toFixed(2), 1 ); // 2 decimal points

//   var newPosition = safeProgress * distance;

//   element.style.transform = 'translateX('+ newPosition + 'px)';

//   // we need to progress to reach 100%
//   if( safeProgress != 1 ){
//   	requestAnimationFrame( rAFCallback );
//   }
// }

// // request animation frame on render
// requestAnimationFrame( rAFCallback );
