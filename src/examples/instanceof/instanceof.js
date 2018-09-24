let instanceOf = function(left, right) {
    let prototype = right.prototype;
    let __proto__ = left.__proto__;
    while(true) {
        if (__proto__ === null) {
            return false;
        }

        if (__proto__ === prototype) {
            return true;
        }

        __proto__ = __proto__.__proto__;
    }
}

var a = [];
console.log(instanceOf(a, Array));

var b = function(){};
console.log(instanceOf(b, Object));