function deepClone(currentObj, newObj) {
    debugger
    const obj = currentObj || {};
    for (let key in newObj) {
        if (typeof newObj[key] === 'object') {
            if (currentObj[key] instanceof Array) {
                obj[key] = [];
            } else {
                obj[key] = {};
            }
            deepClone(obj[key], newObj[key]);
        } else {
            obj[key] = newObj[key];
        }
    }
}

const obj1 = { 
    a: 1,
    b: [2,3,4],
    c: function() {},
    d: {
        m: 3,
        n: [1,2,3]
    }
};

const obj2 = {
    a: 3,
    x: {
        dd: 'asd'
    },
    n: [1,2,3]
};

const res = deepClone(obj1, obj2);