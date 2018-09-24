Function.prototype.myCall = function(context) {
    debugger
    let ctx = context || window;
    ctx.fn = this;
    let args = [...arguments].slice(1);
    let result = ctx.fn(...args);
    delete ctx.fn;

    return result;
}


Function.prototype.myApply = function(context) {
    debugger
    let ctx = context || window;
    ctx.fn = this;
    let result;
    if (arguments[1]) {
        result = ctx.fn(...arguments[1]);
    } else {
        result = ctx.fn();
    }

    delete ctx.fn;
    return result;
}

var obj = {
    value: 3
}

function demo(name) {
    console.log(this.value);
    console.log(name);
}

demo.myCall(obj, 'asd');
demo.myApply(obj, ['qwe']);