// https://juejin.im/post/59093b1fa0bb9f006517b906

/**
 * bind() 方法会创建一个新函数。当这个新函数被调用时，
 * bind() 的第一个参数将作为它运行时的 this，之后的一序列参数将会在传递的实参前传入作为它的参数
 */

/*
Array.prototype.slice = function(start,end){
    var result = new Array();
    start = start || 0;
    end = end || this.length; // this指向调用的对象，当用了call后，能够改变this的指向，也就是指向传进来的对象，这是关键
  
    for(var i = start; i < end; i++)
    {
         result.push(this[i]);
    }

    return result;
}
*/

/*
Array.prototype.slice.call(arguments)

理解第一步: 其中，arguments是一个具有length属性的对象, 通过call 这个方法，
            把arguments 指向了Array.prototype.slice方法的作用域，也就是说通过call方法，
            让Array.prototype.slice对arguments对象进行操作

理解第二步: Array.prototype.slice就是对该对象使用Array类的slice方法。但是呢arguments它又不是个Array对象
*/

var foo = {
    value: 233,
    getValue: function () {
        debugger
        console.log(this.value);
        console.log(arguments[0]);
        console.log(arguments[1]);
    }
}


Function.prototype.bind1 = function (context) {
    debugger
    let self = this;
    // 获取bind2函数从第二个参数到最后一个参数
    let args = Array.prototype.slice.call(arguments, 1);

    /**
     * 如果这里使用的是 箭头 函数的写法，这种写法的 arguments的参数是不对的
     * 因为此时的返回 func函数里的 this， 它的指向依然是 外部的 this。
     * 箭头函数里的 this，是继承 外部函数的this
     */
    // const func = () => {
    //     debugger
    //     console.log(this);  // getValue() {
    //                         //     debugger;
    //                         //     console.log(this.value);
    //                         //     console.log(arguments[0]);
    //                         //     console.log(arguments[1]);
    //                         // }

    //     // 这个时候的arguments是指bind返回的函数传入的参数
    //     let bindArgs = Array.prototype.slice.call(arguments);
    //     self.apply(context, args.concat(bindArgs));
    // }

    const func = function () {
        let args1 = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(args1));
    }

    return func;
}


Function.prototype.bind2 = function (context) {
    debugger
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {
        debugger
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);

        //1. 当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，
        //   已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，this 指向实例。

        //2. 当作为普通函数时，调用该普通函数，类似于: window.xxxx(); this 指向 window，self 指向绑定函数，
        //   此时结果为 false，this 指向绑定的 context。
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }

    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数原型中的值
    // 缺点: 将 fbound.prototype = this.prototype,我们直接修改 fbound.prototype 的时候, 也会直接修改函数的 prototype(引用类型)
    fbound.prototype = this.prototype;
    return fbound;
}

Function.prototype.bind3 = function (context) {
    debugger
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);
    // 通过一个空函数来进行中转
    var fNOP = function () { };

    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;
}

Function.prototype.bind4 = function (context) {
    if (typeof this !== "function") {
        throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
    }

    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    let f = function () { }

    const fbind = function () {
        let args1 = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(args1));
    }

    f.prototype = this.prototype;
    fbind.prototype = new f();

    return fbind;
}



console.log(/***************bind1********************/);
var newGetValue = foo.getValue.bind1(foo, 1);
newGetValue(2);

console.log(/***************bind2********************/);
// var newGetValue2 = foo.getValue.bind2(foo, 1);
// newGetValue2(2);

// var v = new newGetValue2(4);

console.log(/***************bind3********************/);
// var newGetValue3 = foo.getValue.bind3(foo, 1);
// newGetValue3(2);

// var v = new newGetValue3(4);
console.log(/***************bind4********************/);
// var newGetValue4 = foo.getValue.bind4(foo, 1);
// newGetValue4(2);
// var v = new newGetValue4(4);


/*
// 当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效

var value = 2;

var foo = {
    value: 1
};

function bar(name, age) {
    debugger
    this.habit = 'shopping';
    console.log(this.value);
    console.log(name);
    console.log(age);
}

var f = new bar('Alice', 12);

bar.prototype.friend = 'kevin';

var bindFoo = bar.bind(foo, 'daisy');

当 bind 返回的函数作为构造函数的时候，bind 时指定的 this 值会失效，但传入的参数依然生效
var obj = new bindFoo('18');
// undefined
// daisy
// 18
console.log(obj.habit);
console.log(obj.friend);
// shopping
// kevin
*/