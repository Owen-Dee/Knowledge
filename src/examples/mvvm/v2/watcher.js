import Dep from './Dep';

//实现一个订阅者Watcher，可以收到属性的变化通知并执行相应的函数，从而更新视图。
class Watcher {
    constructor(vm, exp, cb) {
        this.vm = vm;
        this.exp = exp;
        this.cb = cb;
        this.value = this.get(); // 将自己添加到订阅器的操作
    }

    update() {
        this.run();
    }

    run() {
        let value = this.vm.data[this.exp];
        let oldValue = this.value;
        if (value !== oldValue) {
            this.value = value;
            this.cb.call(this.vm, value, oldValue);
        }
    }

    get() {
        Dep.target = this; // 缓存自己,保存被监听对象的值以及回调函数
        let value = this.vm.data[this.exp]; // 强制执行监听器里的get函数
        Dep.target = null; // 释放自己

        return value;
    }
}

export default Watcher;