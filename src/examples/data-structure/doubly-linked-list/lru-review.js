class Node {
    constructor(key, data) {
        this.key = key;
        this.data = data;
        this.prev = null;
        this.next = null;
    }
}

class LRU {
    constructor(limit) {
        if (limit <= 0) {
            console.error('lru size should be greater than 0!')
            return;
        }
        this.limit = limit;
        this.map = new Map();
        this.head = null;
        this.tail = null;
        this.count = 0;
    }

    set(key, data) {
        const keyNode = this.map.get(key);
        if (keyNode) { // 查找到数据
            keyNode.data = data;
            this.markAsUsed(keyNode);
            return;
        }

        const node = new Node(key, data);
        if (!this.head) { // 还不存在头结点
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }
        this.map.set(key, node);
        this.count++;
        if (this.count > this.limit) {
            this.shift();
        }
    }

    get(key) {
        const keyNode = this.map.get(key);
        if (keyNode) {
            this.markAsUsed(keyNode);
            return keyNode.data;
        } else {
            return null;
        }
    }

    delete(key) {
        const keyNode = this.map.get(key);
        if (!keyNode) {
            return false;
        }

        if (this.head === keyNode && this.tail === keyNode) {
            this.head = null;
            this.tail = null;
        } else if (this.head === keyNode && this.tail !== keyNode) {
            this.head = this.head.next;
            this.head.prev = null;
        } else if (this.head !== keyNode && this.tail === keyNode) {
            this.tail = this.tail.prev;
            this.tail.next = null;
        } else {
            keyNode.prev.next = keyNode.next;
            keyNode.next.prev = keyNode.prev;
        }
        this.count--;
        this.map.delete(key);
    }

    markAsUsed(node) {
        if (this.tail === node) {
            return;
        } else if (this.head === node) {
            this.head = this.head.next;
            this.head.prev = null;
            this.tail.next = node;
            node.prev = this.tail;
            node.next = null;
            this.tail = node;
        } else {
            node.prev.next = node.next;
            node.next.prev = node.prev;
            this.tail.next = node;
            node.prev = this.tail;
            node.next = null;
            this.tail = node;
        }
    }

    shift() {
        const key = this.head.key;
        this.head = this.head.next;
        this.head.prev = null;
        this.count--;
        this.map.delete(key);
    }

    show() {
        let node = this.head;
        if (!node) {
            console.log('node data');
            return;
        }

        while(node) {
            console.log(node.data);
            node = node.next;
        }
    }
}

const lru = new LRU(5);
lru.set('a', 1);
lru.set('b', 2);
lru.set('c', 3);
lru.set('d', 4);
lru.set('e', 5);
lru.set('f', 6);
lru.show();
console.log('+++++++++++++++++++++++++');
// lru.get('b');

lru.delete('e');
debugger
lru.set('t', 8);
lru.show();
