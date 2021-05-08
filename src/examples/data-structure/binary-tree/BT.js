class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BT {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const node = new Node(data);
        if (!this.root) { // 根节点不存在
            this.root = node;
        } else {
            this.insetNode(this.root, node);
        }
    }

    insetNode(treeNode, node) {
        if (node.data < treeNode.data) { // 插入的节点小于当前节点,插入左子树
            if (treeNode.left) { // 当前节点有左子树
                this.insetNode(treeNode.left, node);
            } else { // 当前节点无左子树
                treeNode.left = node;
            }
        } else { // 插入的节点大于当前节点，插入右子树
            if (treeNode.right) {
                this.insetNode(treeNode.right, node);
            } else {
                treeNode.right = node;
            }
        }
    }

    // 前序遍历
    preOrder() {
        const orderData = [];
        if (!this.root) {
            return orderData;
        }

        let stack = [this.root];
        while(stack.length >= 1) {
            const node = stack.pop();
            orderData.push(node.data);
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }
        }

        return orderData;
    }
    // 后序遍历
    postOrder() {
        const orderData = [];
        if (!this.root) {
            return orderData;
        }

        let stack = [this.root];
        while(stack.length >=1) {
            const node = stack.pop();
            orderData.push(node.data);
            if (node.left) {
                stack.push(node.left);
            }

            if (node.right) {
                stack.push(node.right);
            }
        }

        return orderData.reverse();
    }

    // 中序遍历
    inOrder() {
        const orderData = [];
        if (!this.root) {
            return orderData;
        }

        let stack = [];
        let node = this.root;
        while(node || stack.length > 0) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                orderData.push(node.data);
                node = node.right;
            }
        }

        return orderData;
    }

    // 广度优先遍历
    breadthOrder() {
        const orderData = [];
        if (!this.root) {
            return;
        }

        let stack = [this.root];
        while(stack.length > 0) {
            const arr = [...stack];
            const arr2 = [];
            for (let i = 0; i < arr.length; i++) {
                const node = arr[i];
                orderData.push(node.data);
                if (node.left) {
                    arr2.push(node.left);
                }
    
                if (node.right) {
                    arr2.push(node.right);
                }
            }
            stack = [...arr2];
        }

        return orderData;
    }

    // 广度优先遍历
    breadthOrder2() {
        const orderData = [];
        if (!this.root) {
            return;
        }

        let queue = [this.root];
        while(queue.length > 0) {
            const node = queue.shift();
            orderData.push(node.data);
            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return orderData;
    }

    show() {
        console.log(this.root);
    }
}

const data = [9, 5, 4, 12, 14, 8, 22, 20, 3, 10, 7];
const bt = new BT();
for(let i = 0; i < data.length; i++) {
    bt.insert(data[i]);
}

bt.show();
/**
                     9
                 /      \
                5        12
              /   \     /   \
            4      8   10   14
          /       /           \
         3       7            22
                             /
                            20  
*/        

console.log("1.前序遍历");
const preOrderData = bt.preOrder();
console.log(preOrderData);                  // [9, 5, 4, 3, 8, 7, 12, 10, 14, 22, 20]
console.log("2.后序遍历");
const postOrderData = bt.postOrder(); 
console.log(postOrderData);                 // [3, 4, 7, 8, 5, 10, 20, 22, 14, 12, 9]
console.log("3.中序遍历");
const inOrderData = bt.inOrder();
console.log(inOrderData);                   // [3, 4, 5, 7, 8, 9, 10, 12, 14, 20, 22]
console.log("4.广度遍历");
const breadthOrderData = bt.breadthOrder();
console.log(breadthOrderData);              // [9, 5, 12, 4, 8, 10, 14, 3, 7, 22, 20]
console.log("5.广度遍历2");
const breadthOrderData2 = bt.breadthOrder2();
console.log(breadthOrderData2);             // [9, 5, 12, 4, 8, 10, 14, 3, 7, 22, 20]