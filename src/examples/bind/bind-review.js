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

bar.prototype.friend = 'shanke';

var bindFoo = bar.bind(foo, 'Alice');
var b1 = new bindFoo(18);