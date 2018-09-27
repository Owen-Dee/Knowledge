/**
 * “依赖收集”的响应式原理:
 * 1.主要针对一个对象中的 "计算属性"。eg: obj1.A 中的A属性为 计算属性。
 * 2.该 计算属性(obj1.A) 依赖于 某个对象中的 属性值 的变化 eg: obj2.B。
 * 3.当obj2.B的值发生变化后,obj1.A的值会自动被通知。
 * 4. 实现思路:
 *  a:当一个可观测对象的属性(obj2.B)被读写时，会触发它的getter/setter方法。
 *  b:可以在可观测对象的getter/setter里面，去执行监听器(监听obj1.A)里面的 属性更新方法,
 *  让对象主动发出通知的功能.
 */

//依赖收集
const Dep = {
    target: null
};

//使数据对象变得“可观测”
function observable(obj) {
    const keys = Object.keys(obj);
    keys.forEach((key) => {
        defineReactive(obj, key, obj[key]);
    });

    return obj;
}

function defineReactive(obj, key, value) {
    // deps是一个数组而不是一个变量，
    //是因为可能同一个属性会被多个计算属性所依赖,也就是存在多个Dep.target
    // eg: 组件A, B, C 中分别有个计算属性 C1, 依赖store(vuex)中的 M值,
    // 当M值发生变化后,对应组件A, B, C中的计算属性C1都会接收到M值的变化
    let deps = [];
    Object.defineProperty(obj, key, {
        get() {
            console.log(`我的${key}属性被读取了！`)
            if (Dep.target && deps.indexOf(Dep.target) === -1) {
                deps.push(Dep.target);
            }

            return value;
        },
        set(newVal) {
            console.log(`我的${key}属性被修改了！`);
            value = newVal;
            deps.forEach((dep) => {
                dep();
            });
        }
    });
}

function watcher(obj, key, callback) {
    const onDepUpdated = () => {
        let val = callback();
        onComputedUpdate(val);
    }
    Object.defineProperty(obj, key, {
        get() {
            Dep.target = onDepUpdated;
            let val = callback();
            // 执行callback()的过程中会用到Dep.target，
            // 当callback()执行完了就重置Dep.target为null
            Dep.target = null;
            return val;
        },
        set() {
            console.error('计算属性无法被赋值！')
        }
    })
}

function onComputedUpdate(val) {
    console.log(`我的类型是：${val}`);
}

const hero = {
    health: 3000,
    IQ: 150
};

observable(hero);
watcher(hero, 'type', () => {
    return hero.health > 4000 ? '坦克' : '脆皮'
})

watcher(hero, 'identity', () => {
    return hero.health > 4000 ? '伯爵' : '知县'
})

console.log(hero.type);
console.log(hero.identity);
hero.health = 5000;