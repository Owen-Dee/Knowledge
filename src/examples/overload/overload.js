// 函数重载
function overload(obj, name, fn) {
    //1.保存原有的函数,因为调用的时候可能不匹配传入的参数个数
    let old = obj[name];
    //2.创建一个新匿名函数作为新方法
    obj[name] = function() {
        if (fn.length === arguments.length) { //3.如果匿名函数的形参个数和实参个数匹配，调用该函数
            return fn.apply(this, arguments);
        } else if (typeof old === 'function') { //4.如果匿名函数的形参个数和实参个数不匹配，调用原有的参数
            return old.apply(this, arguments);
        }
    }
}

let obj = {};
overload(obj, 'add', function() {
    console.log('no params');
});

overload(obj, 'add', function(a) {
    console.log('one params:' + a);
});

overload(obj, 'add', function(a, b) {
    console.log('two params:' + a);
    console.log('two params:' + b);
});

obj.add();
obj.add(2);
obj.add(2, 3);
