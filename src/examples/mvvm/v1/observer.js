import Dep from './Dep';

// 实现一个监听器Observer，用来劫持并监听所有属性，如果有变动的，就通知订阅者。
class Observer {
    constructor(data) {
        this.data = data;
        this.walk(data);
    }

    walk(data) {
        Object.keys(data).forEach((key) => {
            this.defineReactive(data, key, data[key]);
        });
    }

    defineReactive(data, key, val) {
        let dep = new Dep();
        observe(val);
        Object.defineProperty(data, key, {
            get() {
                if (Dep.target) {
                    dep.addSub(Dep.target);
                }

                return val;
            },
            set(newVal) {
                if (val === newVal) {
                    return;
                }
                val = newVal;
                dep.notify();
            }
        });
    }
}

function observe(val) {
    if (!val || typeof val !== 'object') {
        return;
    }

    return new Observer(val);
}

export default observe;