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


let source = [1, [2],{}, [3, [[4]]]];
let result = steamroller(source);
console.log(result);



function flatten(arr) {
    return arr.reduce(function(prev, next){
        return prev.concat(Array.isArray(next) ? flatten(next) : next)
    }, [])
}

console.log(flatten(source))