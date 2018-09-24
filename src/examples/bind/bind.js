var foo = {
    value:'233',
    getValue: function() {
        console.log(this.value);
        console.log(arguments[0], arguments[1])
    }
}
 

Function.prototype.myBind = function(context) {
    let self = this;
    let args = Array.prototype.slice.call(arguments, 1);

    return () => {
        let bindArgs = Array.prototype.slice.call(arguments);
        self.apply(context, args.concat(bindArgs));
    }
}

Function.prototype.bind2 = function (context) {
    debugger
    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fbound = function () {
        debugger
        // 这个时候的arguments是指bind返回的函数传入的参数
        var bindArgs = Array.prototype.slice.call(arguments);
        //当作为构造函数时，this 指向实例，self 指向绑定函数，因为下面一句 `fbound.prototype = this.prototype;`，
        //已经修改了 fbound.prototype 为 绑定函数的 prototype，此时结果为 true，当结果为 true 的时候，this 指向实例。
        // 当作为普通函数时，this 指向 window，self 指向绑定函数，此时结果为 false，当结果为 false 的时候，this 指向绑定的 context。
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }
    // 修改返回函数的 prototype 为绑定函数的 prototype，实例就可以继承函数的原型中的值
    // 将 fbound.prototype = this.prototype，我们直接修改 fbound.prototype 的时候，也会直接修改函数的 prototype(引用类型)
    fbound.prototype = this.prototype;
    return fbound;
}

Function.prototype.bind3 = function (context) {

    var self = this;
    var args = Array.prototype.slice.call(arguments, 1);

    var fNOP = function () {};

    var fbound = function () {
        var bindArgs = Array.prototype.slice.call(arguments);
        self.apply(this instanceof self ? this : context, args.concat(bindArgs));
    }

    fNOP.prototype = this.prototype;
    fbound.prototype = new fNOP();
    return fbound;
}


// var newGetValue = foo.getValue.myBind(foo, 1);
// newGetValue(2);

var newGetValue = foo.getValue.bind2(foo, 1);
newGetValue(2);

var n1 = new newGetValue();

