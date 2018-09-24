/*
* 对象的深拷贝与浅拷贝的区别如下：
     浅拷贝：仅仅复制对象的引用，而不是对象本身；
     深拷贝：把复制的对象所引用的全部对象都复制一遍。
* **/

let deepClone = function(current, copyObj) {
    debugger
    let obj = current || {};
    for (let key in copyObj) {
        if (obj === copyObj[key]) {
            continue;
        }

        if (typeof copyObj[key] === 'object') {
            obj[key] = copyObj[key] instanceof Array ? [] : {};
            deepClone(obj[key], copyObj[key]);
        } else {
            obj[key] = copyObj[key];
        }
    }

    return obj;
}

function deepClone3(newObj, oldObj) {
    var obj = newObj || {};
    for (var key in oldObj){
        var temp = oldObj[key];
        if (obj === temp){
            continue;
        }
        if (typeof oldObj[key] === 'object'){
            obj[key] = (oldObj[key].constructor === Array) ? [] : {};
            deepClone3(obj[key], oldObj[key]);
        } else {
            obj[key] = oldObj[key];
        }
    }

    return obj;
}

let obj1 = {
    a: 2,
    b: function() {},
}

let obj2 = {
    c: [1,2,3],
    d: obj1,
    e: 'asd',
    f: {
        g: 2
    }
}

let result = deepClone(obj1, obj2);
console.log(result);