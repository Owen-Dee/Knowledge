import Node from './Node';

class LinkedList {
    constructor() {
        this.head = null;
        this.count = 0;
    }

    static createNewNode(element) {
        return new Node(element);
    }

    push(element) {
        const node = LinkedList.createNewNode(element);
        let currentNode;
        if (!this.head) {
            this.head = node;
        } else {
            currentNode = this.head;
            while (currentNode.next) {
                currentNode = currentNode.next;
            }
            currentNode.next = node;
        }
        this.count++;
    }

    getElementAt(index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        let currentNode = this.head;
        let i = 1;
        while (i < index) {
            currentNode = currentNode.next;
            i++;
        }

        return currentNode;
    }

    removeAt(index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        let currentNode = this.head;
        if (index === 1) {
            this.head = currentNode.next;
        } else {
            const previousNode = this.getElementAt(index - 1); // 获取要删除节点的前一个节点
            currentNode = previousNode.next;
            previousNode.next = currentNode.next;
        }
        this.count--;
        return currentNode.element;
    }

    insert(element, index) {
        if (index < 1 || index > this.count) {
            return null;
        }

        const node = LinkedList.createNewNode(element);
        if (index === 1) { // 在头部插入数据
            node.next = this.head;
            this.head = node;
        } else {
            const previousNode = this.getElementAt(index - 1);
            node.next = previousNode.next;
            previousNode.next = node;
        }
        this.count++;
    }

    indexOf(element) {
        let currentNode = this.head;
        let i = 1;
        while (i <= this.count) {
            if (currentNode.element === element) {
                break;
            }

            currentNode = currentNode.next;
            i++;
        }

        if (!currentNode) {
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

    size() {
        return this.count;
    }

    isEmpty() {
        return this.size() === 0;
    }

    display() {
        let i = 1;
        let currentNode = this.head;
        while (currentNode) {
            console.log(`node position ${i}: ` + currentNode.element);
            currentNode = currentNode.next;
            i++;
        }
    }
}

console.log(`1.初始化数据`);
const linkedList = new LinkedList();
linkedList.push(10);
linkedList.push(20);
linkedList.push(30);
linkedList.push(40);
linkedList.push(50);
linkedList.push(60);
linkedList.display();

console.log(`2.获取指定下标数据`);
const index = 6;
const node = linkedList.getElementAt(index);
console.log(`position: ${index}: ${node.element}`)

console.log(`3.获取删除指定下标后的数据`);
const v1 = linkedList.removeAt(index);
console.log(`delete position: ${index}: ${v1}`)
linkedList.display();

console.log(`4.获取插入指定下标后的数据`);
linkedList.insert(100, index);
console.log(`insert position: ${index}, value: 100`)
linkedList.display();

console.log(`5.头部插入数据: 0`);
linkedList.insert(0, 1);
linkedList.display();

console.log(`6.查询 60 数据下标`);
const v3 = linkedList.indexOf(60);
console.log(`position: ${v3}`);
linkedList.display();

console.log(`6.删除元素 30`);
linkedList.remove(30);
linkedList.display();
