// 插入十万条数据
let total = 100000;
// 一次插入 20 条，如果觉得性能不好就减少
let once = 20;
// 渲染数据总共需要几次
let loopCount = total / once;
let renderCount = 0;
let ul = document.querySelector('#ulControl');
let add = function() {
    //引入createDocumentFragment()方法，它的作用是创建一个文档碎片，
    //把要插入的新节点先附加在它上面，然后再一次性添加到document中
    // 因为文档片段存在于内存中，并不在DOM树中，
    //所以将子元素插入到文档片段时不会引起页面回流
    let fragment = document.createDocumentFragment();
    for (let i = 0; i < once; i++) {
        let li = document.createElement('li');
        li.innerHTML = Math.floor(Math.random() * total);
        fragment.appendChild(li);
    }
    ul.appendChild(fragment);
    renderCount++;
    loop();
}

let loop = function() {
    if (renderCount < loopCount) {
        window.requestAnimationFrame(add);
    }
}

loop();

ul.addEventListener('click', (e) => {
    alert(e.target.innerHTML);
});



// let start = Date.now();
// let fragment = document.createDocumentFragment();
// for (let i = 0; i < total; i++) {
//     let li = document.createElement('li');
//     li.innerHTML = Math.floor(Math.random() * total);
//     fragment.appendChild(li); 
// }
// ul.appendChild(fragment);

// let end = Date.now();
// console.log(end - start);
