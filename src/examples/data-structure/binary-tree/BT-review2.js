class Node{
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

class BT2 {
    constructor() {
        this.root = null;
    }

    insert(value) {
        const node = new Node(value);
        if (!this.root) {
            this.root = node;
            return;
        }
        
        this.insertNode(node, this.root);
    }

    insertNode(node, treeNode) {
        if (node.value < treeNode.value) { // 插入左子树
            if(treeNode.left) {
                this.insertNode(node, treeNode.left);
            } else {
                treeNode.left = node;
            }
        } else { // 插入右子树
            if (treeNode.right) {
                this.insertNode(node, treeNode.right);
            } else {
                treeNode.right = node;
            }
        }
    }

    // 前序遍历: 根节点->左子树->右子树
    prevOrder() {
        if (!this.root) {
            return;
        }

        const stack = [this.root];
        const arr = [];
        while(stack.length > 0) { // 利用栈的先进后出
            const node = stack.pop();
            arr.push(node.value);
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }
        }

        return arr;
    }

    // 后序遍历：先左子树->右子树->根节点
    postOrder() {
        if (!this.root) {
            return;
        }

        const stack = [this.root];
        const arr = [];
        while(stack.length > 0) { // arr的结果: 根节点->右子树->左子树
            const node = stack.pop();
            arr.push(node.value);
            if (node.left) {
                stack.push(node.left);
            }
            if (node.right) {
                stack.push(node.right);
            }
        }

        return arr.reverse(); // 返回数组的倒叙
    }

    inOrder() {
        if (!this.root) {
            return;
        }
        const arr = [];
        const stack = [];
        let node = this.root;
        while(node || stack.length > 0) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                arr.push(node.value);
                node = node.right;
            }
        }

        return arr;
    }
}

const data = [9, 5, 4, 12, 14, 8, 22, 20, 3, 10, 7];
const bt = new BT2();
for(let i = 0; i < data.length; i++) {
    bt.insert(data[i]);
}

const res = bt.prevOrder();
console.log(res);

const postRes = bt.postOrder();
console.log(postRes);

const inRes = bt.inOrder();
console.log(inRes);