import Node from './Node';

class DoublyLinkedList {
    constructor() {
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    static createNewNode(element) {
        return new Node(element);
    }

    push(element) {
        const node = DoublyLinkedList.createNewNode(element);
        if (!this.head) { // 链表头部为空，头部和尾部都指向node
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.count++;
    }

    getElementAt(index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        let current = this.head;
        let i = 1;
        while (i < index) {
            current = current.next;
            i++;
        }

        return current;
    }

    insert(element, index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        const node = DoublyLinkedList.createNewNode(element);
        if (index === 1) { // 头部插入
            if (!this.head) {
                this.push(element);
            } else {
                node.next = this.head;
                this.head.prev = node;
                this.head = node;
            }
        } else if (index === this.count) { // 尾部插入
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        } else { // 其他位置插入
            const current = this.getElementAt(index);
            node.next = current;
            node.prev = current.prev;
            current.prev.next = node;
            current.prev = node;
        }

        this.count++;
    }

    removeAt(index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        if (index === 1) { // 删除头部
            if (this.count === 1) { // 只有一个元素
                this.head = null;
                this.tail = null;
            } else {
                const node = this.head.next;
                this.head = node;
                this.head.prev = null;
            }
        } else if (index === this.count) { // 删除尾部
            const node = this.tail.prev;
            this.tail = node;
            this.tail.next = null;
        } else { // 删除中间数据
            let current = this.getElementAt(index);
            current.prev.next = current.next;
            current.next.prev = current.prev;
            current = null;
        }

        this.count--;
    }

    indexOf(element) {
        let current = this.head;
        let i = 1;
        while (i <= this.count) {
            if (current.element === element) {
                break;
            }
            current = current.next;
            i++;
        }

        if (!current) {
            console.error(`${element} is not exist.`)
            return -1;
        } else {
            return i;
        }
    }

    remove(element) {
        const index = this.indexOf(element);
        if (index < 1) {
            return;
        }

        this.removeAt(index);
    }

    getSize() {
        return this.count;
    }

    isEmpty() {
        return this.getSize() === 0;
    }

    display() {
        let current = this.head;
        let i = 1;
        while (current) {
            console.log(`Node position ${i}: ${current.element}`);
            current = current.next;
            i++;
        }
    }
}

console.log('*******1.初始化双向链表*******');
const dls = new DoublyLinkedList();
dls.push(10);
dls.push(20);
dls.push(30);
dls.push(40);
dls.push(50);
dls.push(60);
let size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

const index = 6;
console.log(`*******2.获取第${index}节点数据*******`);
const node = dls.getElementAt(index);
console.log(`Position ${index}: ` + node.element);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

const index2 = 4;
const ele1 = 100;
console.log(`*******3.向第${index2}节点插入数据: ${ele1} *******`);
dls.insert(ele1, index2);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

const index3 = 4;
console.log(`*******4.删除第${index3}个节点数据*******`);
dls.removeAt(4);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

console.log('*******5.删除第1个节点数据*******');
dls.removeAt(1);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

const ele = 50;
console.log(`*******6.获取${ele}所在的下标*******`);
const i = dls.indexOf(ele);
console.log(`${ele} at position ${i}`);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();

const ele3 = 50;
console.log(`*******7.删除元素${ele3}*******`);
dls.remove(ele3);
size = dls.getSize();
console.log(`双链表长度: ${size}, 遍历如下:`);
dls.display();
