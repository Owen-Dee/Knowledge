// 1.角色: 
//观察者模式中存在两种角色： 观察者和被观察者， 也可以叫做发布者和订阅者。

//2.详解：
/**
 * 观察者模式中，并不是一个对象调用另一个对象的方法，而是一个对象订阅另一个对象的特定活动并在状态改变后获得通知。
 * 当发生了一个重要的事件时，发布者将会通知所有订阅者并且可能经常以事件对象的形式传递消息。
 */

//3.示例
/**
 * 为了加深理解，让我们来看一个具体的例子，有三个报纸出版社，报社一、报社二、报社三，
 * 有两个订报人，分别是:订阅者1，订阅者2。在这里出版社就是被观察者，订报人就是观察者
 */

//发布者
class Publisher {
    constructor(name) {
        this.name = name;
        this.subscribers = []; //数组中存着所有的订阅者(出版社名单)，数组的元素都是函数类型
    }

    deliver(news) {
        this.subscribers.forEach((item) => {
            //循环subscribers数组中所有的订报人，为他们发布内容。
            item(news, this);
        });
    }
}

//订阅者
class Subscriber {
    constructor(publisher) {
        this.publisher = publisher;
    }

    subscribe() {}
}