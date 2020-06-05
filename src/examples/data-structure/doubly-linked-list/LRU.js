/**
 * 双链表的应用: lru: 最近最少使用
 * lru: 采用哈希链表实现该算法。
 * 在哈希链表当中，这些Key-Value不再是彼此无关的存在，而是被一个链条串了起来。
 * 每一个Key-Value都具有它的前驱Key-Value、后继Key-Value，就像双向链表中的节点一样
 * https://juejin.im/post/5c0392656fb9a049fb4366fa
 */
/**
 * LRU: 是Least recently used的简写，主要原理是根据历史访问记录来淘汰数据，
 * 说白了就是这个算法认为如果数据被访问过，那么将来被访问的几率也高。
 * 其存储结构是一个双链表，最近被访问到的放在双链表的尾部，头部放的就是最早被访问到数据
 *       entry             entry             entry             entry
 * 
 *       key1              key2              key3              key4
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */

class Node {
    constructor(key, element) {
        this.key = key;
        this.element = element;
        this.prev = null;
        this.next = null;
    }
}

class LRU {
    /**
     * @param {*} limit: 最大缓存数目
     */
    constructor(limit) {
        this.limit = limit;
        this.size = 0;
        this.map = new Map();
        this.head = null;
        this.tail = null;
    }

    set(key, value) {
        let node = this.map.get(key);
        if (node) { // 数据已存在
            node.element = value;
            this.markAsUsed(node);
            return;
        }

        node = new Node(key, value);
        if (!this.head) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            node.prev = this.tail;
            this.tail = node;
        }

        this.map.set(key, node);
        this.size++;
        if (this.size > this.limit) {
            this.shift();
        }
    }

    get(key) {
        const node = this.map.get(key);
        if (node) {
            this.markAsUsed(node);
            return node.element;
        } else {
            return null;
        }
    }

    markAsUsed(node) {
        if (node === this.tail) { // 当前节点为尾节点
            return;
        }

        if (node === this.head) { // 当前节点为头节点
            this.head = this.head.next;
            this.head.prev = null;
        } else if (node.prev && node.next) { // 获取的是中间节点
            node.next.prev = node.prev;
            node.prev.next = node.next;
        }

        this.tail.next = node;
        node.prev = this.tail;
        node.next = null;
        this.tail = node;
    }

    shift() {
        let node = this.head;
        if (!this.head) {
            return;
        }

        this.head = this.head.next;
        this.head.prev = null;
        this.size--;
        this.map.delete(node.key);
    }

    getSize() {
        return this.size;
    }

    display() {
        let node = this.tail;
        console.log(`从尾节点往前遍历:`);
        while (node) {
            console.log(`${node.key}: ${node.element}`);
            node = node.prev;
        }
    }
}

console.log('*****1.初始化数据*******');
const lru = new LRU(5);
for (let i = 1; i < 6; i++) {
    let key = `key_${i}`;
    lru.set(key, i);
}
let size = lru.getSize();
console.log(`Size: ${size}`);
lru.display();

const key = 'key_1'
console.log(`*****2.获取${key}对应的数据*******`);
const v1 = lru.get(key);
console.log('value: ' + v1);
lru.display();

const key1 = 'shanke';
const value = 'demo';
console.log(`*****3.插入数据: key->${key1}; value->${value}*******`);
lru.set(key1, value);
lru.display();