// 去重

const arr = [1, 2, 3, 1, 2, 3, '1', '2', '3', {value: 1}, {value: 2}];

let unique1 = function(arr) {
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        let flag= false;
        for (let j = i + 1; j < arr.length; j++) {
            if (arr[i] === arr[j]) {
                flag = true;
                break;
            }
        }

        if (!flag) {
            newArr.push(arr[i]);
        }
    }

    return newArr;
}
//有缺陷 
let unique2 = function(arr) {
    let hasMap = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!hasMap[arr[i]]) {
            newArr.push(arr[i]);
            hasMap[arr[i]] = true;
        }
    }

    return newArr;
}

let unique3 = function(arr) {
    return arr.filter((ele, index, arr) => {
        return arr.indexOf(ele) === index;
    });
}

//比如 {value: 1} 和 {value: 2}，因为 typeof item + item 的结果都会是 object[object Object]
// typeof arr[9] + arr[9] === typeof arr[10] + arr[10] (object[object Object])
function unique4(arr) {
    let hashMap = {};
    return arr.filter((item, index, array) => {
        return hashMap.hasOwnProperty(typeof item + item) 
            ? false
            : (hashMap[typeof item + item] = true);
    });   
}

//比如 {value: 1} 和 {value: 2}，因为 typeof item + item 的结果都会是 object[object Object]
let unique5 = function() {
    let hasMap = {};
    let newArr = [];
    for (let i = 0; i < arr.length; i++) {
        if (!hasMap.hasOwnProperty(typeof arr[i] + arr[i])) {
            newArr.push(arr[i]);
            hasMap[typeof arr[i] + arr[i]] = true;
        }
    }

    return newArr;
}

// let unique6 = function() {
//     let hasMap = {};
//     let newArr = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (!hasMap.hasOwnProperty(typeof arr[i] + JSON.stringify(arr[i]))) {
//             newArr.push(arr[i]);
//             hasMap[typeof arr[i] + JSON.stringify(arr[i])] = true;
//         }
//     }

//     return newArr;
// }

const unique6 = (arr) => {
    if (!arr || arr.length === 0) {
        return;
    }

    const res = [];
    const hasMap = {};
    arr.forEach(item => {
        if (!hasMap[typeof item + JSON.stringify(item)]) {
            res.push(item);
            hasMap[typeof item + JSON.stringify(item)] = true;
        }
    });

    return res;
}

let r1 = unique1(arr);
let r2 = unique2(arr);
let r3 = unique3(arr);
let r4 = unique4(arr);
let r5 = unique5(arr);
let r6 = unique6(arr);
console.log('unique1:' + r1);
console.log('unique2:' + r2);
console.log('unique3:' + r3);
console.log('unique4:' + r4);
console.log('unique5:' + r5);
console.log('unique6:' + r6);
