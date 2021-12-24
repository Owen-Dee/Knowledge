// 1
let steamroller = function(arr) {
    if (!(arr instanceof Array)) {
        return;
    }

    let newArr = [];

    for (let i = 0; i < arr.length; i++) {
        if (arr[i] instanceof Array) {
            // 如果是数组，调用(递归)steamroller 将其扁平化
            // 然后再 push 到 newArr 中
            //apply的第二个参数是数组,
            // 将steamroller(arr[i])所得数组结果中的值都push到一开始的newArr中
            newArr.push.apply(newArr, steamroller(arr[i]));
        } else {
            newArr.push(arr[i]);
        }
    }

    return newArr;
}


let source = [1, [2], {},
    [3, [
        [4]
    ]]
];
// let result = steamroller(source);
// console.log(result);


// 2.
function flatten(arr) {
    return arr.reduce(function(prev, next) {
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, []);
}

// console.log(flatten(source))


// 3.
var arr1 = [1,2,3,[1,2,3,4, [2,3,4]]];

function flatDeep(arr, d = 1) {
    // if (!arr || arr.length === 0) {
    //     return;
    // }

    if (d > 0) {
        return arr.reduce((prev, next) => {
            if (next instanceof Array) {
                debugger
                const res = flatDeep(next, d - 1);
                console.log('res');
                console.log(res);
                return prev.concat(res);
            } else {
                return prev.concat(next);
            }
        }, []);
    } else {
        return arr.slice();
    }
//     debugger
//    return d > 0 ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flatDeep(val, d - 1) : val), [])
//                 : arr.slice();
};

const res = flatDeep(arr1, Infinity);
console.log(res);



const bianPing = (arr) => {
    if (!arr) {
        return;
    }

    return arr.reduce((prev, next) => {
        debugger
        if (next instanceof Array) {
            return prev.concat(bianPing(next));
        } else {
            return prev.concat(next);
        }
    }, []);
}
// const arr2 = [1];
// const res = bianPing(arr2);
// console.log(res);