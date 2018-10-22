import { isObject } from "util";

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
    for (var key in oldObj) {
        var temp = oldObj[key];
        if (obj === temp) {
            continue;
        }
        if (typeof oldObj[key] === 'object') {
            obj[key] = (oldObj[key].constructor === Array) ? [] : {};
            deepClone3(obj[key], oldObj[key]);
        } else {
            obj[key] = oldObj[key];
        }
    }

    return obj;
}

function cloneLoop(x) {
    debugger
    const root = {};

    // 栈
    const loopList = [{
        parent: root,
        key: undefined,
        data: x,
    }];

    while (loopList.length) {
        // 深度优先
        const node = loopList.pop();
        const parent = node.parent;
        const key = node.key;
        const data = node.data;

        // 初始化赋值目标，key为undefined则拷贝到父元素，否则拷贝到子元素
        let res = parent;
        if (typeof key !== 'undefined') {
            res = parent[key] = {};
        }

        for (let k in data) {
            if (data.hasOwnProperty(k)) {
                if (typeof data[k] === 'object') {
                    // 下一次循环
                    loopList.push({
                        parent: res,
                        key: k,
                        data: data[k],
                    });
                } else {
                    res[k] = data[k];
                }
            }
        }
    }

    return root;
}

let obj1 = {
    a: 2,
    b: function() {},
}

let obj2 = {
    c: [1, 2, 3],
    d: obj1,
    e: 'asd',
    f: {
        g: 2
    }
}

// let result = deepClone4(obj1, obj2);
// console.log(result);

// ====================================


// cloneLoop(a);

/**==========function============= */

let deepClone4 = function(newObj, oldObj) {
    if (!(typeof oldObj === 'object')) {
        return;
    }

    let root = newObj || {};
    let stackList = [{
        parent: root,
        key: undefined,
        data: oldObj
    }];

    while (stackList.length) {
        let node = stackList.pop();
        let parent = node.parent;
        let key = node.key;
        let data = node.data;

        if (root === data) {
            continue;
        }

        let res = parent;
        if (!typeof key === undefined) {
            res[key] = parent[key] = data instanceof Array ? [] : {};
        }

        for (let k in data) {
            if (typeof data[k] === 'object') {
                stackList.push({
                    parent: res,
                    key: k,
                    data: data[k]
                });
            } else {
                res[k] = data[k];
            }
        }
    }

    return root;
}

var nObj = {
    x: 3,
    m: 8
};

var a = {
    a1: 1,
    a2: {
        b1: 1,
        b2: {
            c1: 1
        }
    },
    a3: [1, 2, 3, 4],
    n: nObj,
}

/**
 * 把数据横过来看就是一棵树
    a
  /   \
 a1   a2        
 |    / \         
 1   b1 b2     
     |   |        
     1  c1
         |
         1       

 */

let r = deepClone3(nObj, a);
console.log(r);