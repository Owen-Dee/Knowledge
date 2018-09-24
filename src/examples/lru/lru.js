/**
 * LRU: 是Least recently used的简写，主要原理是根据历史访问记录来淘汰数据，
 * 说白了就是这个算法认为如果数据被访问过，那么将来被访问的几率也高。
 * 其存储结构是一个双链表，最近被访问到的放在双链表的尾部，
 * 头部放的就是最早被访问到数据
 *       entry             entry             entry             entry
 *       ______            ______            ______            ______
 *      | head |.newer => |      |.newer => |      |.newer => | tail |
 *      |  A   |          |  B   |          |  C   |          |  D   |
 *      |______| <= older.|______| <= older.|______| <= older.|______|
 *
 *  removed  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  <--  added
 */

 /*
class Node {
    constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
    }
 }

class LRU {
    constructor(limit) {
        this.size = 0;
        this.limit = limit;
        this.keyMap = new Map();
        this.head = null;
        this.tail = null;
    }

    get(key) {
        let node = this.keyMap.get(key);
        if (!node) {
            return;
        }

        this.markNodeAsUsed(node);

        return node.value;
    }

    set(key, value) {
        let node = this.keyMap.get(key);
        if (node) {
            node.value = value;
            this.markNodeAsUsed(node);

            return;
        }

        node = new Node(key, value);
        this.keyMap.set(key, node);
        if (this.tail) { // 未结点存在
            this.tail.next = node;
            node.prev = this.tail;
        } else {
            this.head = node;
        }

        this.tail = node;
        this.size++;
        if (this.size > this.limit) {
            this.shift();
        }
    }

    shift() {
       let node = this.head;
       if (!node) {
           return;
       }
       
       if (node.next) {
           this.head = this.head.next;
           this.head.prev = null;
       } else {
           this.head = null;
       }

       node.prev = node.next = null;
       this.keyMap.delete(node.key);
       this.size--;
    }

    markNodeAsUsed(node) {
        if (node === this.tail) {
            return;
        }

        if (node.next) {
            if (node === this.head) {
                this.head = this.head.next;
            }
            node.next.prev = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        node.next = null;
        node.prev = this.tail;
        if (this.tail) {
            this.tail.next = node;
        }
        this.tail = node;
    }
 }


 let demo = new LRU(4);
 demo.set('a', 1);
 demo.set('b', 2);
 demo.set('c', 3);
 demo.set('d', 4);

 console.log(demo.get('d'));
 */

 class Node {
     constructor(key, value) {
        this.key = key;
        this.value = value;
        this.prev = null;
        this.next = null;
     }
 }

 class LRUMap {
     constructor(limit) {
        this.limit = limit;
        this.size = 0;
        this.keyMap = new Map();
        this.head = null;
        this.tail = null;
     }

     set(key, value) {
         let node = this.keyMap.get(key);
         if (node) {
            node.value = value;
            this.markNodeAsUsed(node);

             return;
         }

        node = new Node(key, value);
        this.keyMap.set(key, node);
         if (this.tail) {
             this.tail.next = node;
             node.prev = this.tail;
         } else {
             this.head = node;
         }

         this.tail = node;
         this.size++;
         if (this.size > this.limit) {
             this.shift();
         }
     }

     get(key) {
         let node = this.keyMap.get(key);
         if (node) {
             this.markNodeAsUsed(node);
         }

         return node.value;
     }

     markNodeAsUsed(node) {
        if (node === this.tail) {
            return;
        }

        if (node.next) {
            if (node === this.head) {
                this.head = this.head.next;
            }

            node.next.prev = node.prev;
        }

        if (node.prev) {
            node.prev.next = node.next;
        }

        node.next = null;
        this.tail.next = node;
        node.prev = this.tail;
        this.tail = node;
     }

     show() {
        let node = this.head;
        while(node) {
            console.log(node.value);
            node = node.next;
        }
     }

     shift() {
         let node = this.head;
         if (!node) {
             return;
         }

         if (node.next) {
             this.head = this.head.next;
             this.head.prev = null;
         }

         node.prev = node.next = null;
         this.size--;
         this.keyMap.delete(node.key);
     }
 }

 let lru1 = new LRUMap(5);
 lru1.set('a1', 121);
 lru1.set('a2', 122);
 lru1.set('a3', 123);
 lru1.set('a4', 124);
 lru1.set('a5', 125);
 lru1.set('a6', 126);

 lru1.show();
 lru1.get('a3');
 lru1.show();


