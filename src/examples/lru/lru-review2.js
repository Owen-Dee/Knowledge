class Node {
    constructor(key, value) {
        this.prev = null;
        this.next = null;
        this.key = key;
        this.value = value;
    }
}

class Lru {
    constructor(limit) {
        this.size = 0;
        this.limit = limit;
        this.hashMap = new Map();
        this.head = null;
        this.tail = null;
    }

    set(key, value) {
        debugger
        let node = this.hashMap.get(key);
        if (node) { // 通过key找到了对应的node
            node.value = value;
            this.markNodeAsUsed(node);
            return;
        }

        node = new Node(key, value);
        this.hashMap.set(key, node);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.size++;
        if (this.size > this.limit) {
            this.shift();
        }
    }

    get(key) {
        const node = this.hashMap.get(key);
        if (!node) {
            return null;
        }

        this.markNodeAsUsed(node);
        return node.value;
    }

    shift() {
        const node = this.head;
        if (!node) {
            return;
        }

        if (this.head.next) {
            this.head = this.head.next;
            this.head.prev = null;
        }

        node.next = node.prev =  null;
        this.hashMap.delete(node.key);
        this.size--;
    }

    markNodeAsUsed(node) {
        if (node === this.tail) {
            return;
        }

        if (node.next) {
            if (node === this.head) {
                this.head = this.head.next;
                this.head.prev = null;
            }

            node.next.prev = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        this.tail.next = node;
        node.prev = this.tail;
        node.next = null;
        this.tail = node;
    }

    show() {
        let node = this.head;
        if (!node) {
            console.error('Lru is not init...');
            return;
        }

        while(node) {
            console.log(`key: ${node.key}; value: ${node.value}`);
            node = node.next;
        }
    }
}

const limit = 5;
const lruCache = new Lru(limit);
lruCache.set('a', 1);
lruCache.set('b', 2);
lruCache.set('c', 3);
lruCache.set('d', 4);
lruCache.set('e', 5);

lruCache.show();

window.lruCache = lruCache;
