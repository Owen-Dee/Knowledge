class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    insert(data) {
        const node = new Node(data);
        if (!this.root) {
            this.root = node;
        } else {
            let currentNode = this.root;
            while(true) {
                if (node.data < currentNode.data) {
                    if (currentNode.left) {
                        currentNode = currentNode.left;
                    } else {
                        currentNode.left = node;
                        break;
                    }
                } else {
                    if (currentNode.right) {
                        currentNode = currentNode.right;
                    } else {
                        currentNode.right = node;
                        break;
                    }
                }
            }
        }
    }
    // 前序遍历
    prevOrder() {
        let node = this.root;
        if (!node) {
            return;
        }

        const prevOrderArray = [];
        const stack = [node];
        while (stack.length > 0) {
            node = stack.pop();
            prevOrderArray.push(node.data);
            if (node.right) {
                stack.push(node.right);
            }

            if (node.left) {
                stack.push(node.left);
            }
        }

        return prevOrderArray;
    }

    // 中序遍历
    inOrder() {
        let node = this.root;
        if (!node) {
            return;
        }

        const inOrderArray = [];
        const stack = [];
        while(stack.length > 0 || node) {
            if (node) {
                stack.push(node);
                node = node.left;
            } else {
                node = stack.pop();
                inOrderArray.push(node.data);
                node = node.right;
            }
        }

        return inOrderArray;
    }

    // 后续遍历
    postOrder() {
        let node = this.root;
        if (!node) {
            return;
        }

        const postOrderArr = [];
        const stack = [node];
        while(stack.length > 0) {
            node = stack.pop();
            postOrderArr.push(node.data);

            if (node.left) {
                stack.push(node.left);
            }

            if (node.right) {
                stack.push(node.left);
            }
        }

        return postOrderArr.reverse();
    }

    delete(data) {
        let node = this.root;
        if (!node) {
            return;
        }
        let isLeft = true;
        let parentNode = node;
        while(node) {
            if (node.data === data) {
                break;
            }
            parentNode = node;
            if (data < node.data) {
                isLeft = true;
                node = node.left;
            } else {
                isLeft = false;
                node = node.right;
            }
        }

        if (!node) {
            return;
        }
        if (!node.left && !node.right) { // 要删除的节点无左右子树
            if (node === this.root) {
                this.root = null;
            } else {
                if (isLeft) {
                    parentNode.left = null;
                } else {
                    parentNode.right = null;
                }
            }
        } else if (node.left && !node.right) { // 删除的节点无右子树
            if (node === this.root) {
                this.root = this.root.left;
            } else {
                if (isLeft) {
                    parentNode.left = node.left;
                } else {
                    parentNode.right = node.left;
                }
            }
        } else if (!node.left && node.right) { // 删除的节点无左子树
            if (node === this.root) {
                this.root = this.root.right;
            } else {
                if (isLeft) {
                    parentNode.left = node.right;
                } else {
                    parentNode.right = node.right;
                }
            }
        } else if (node.left && node.right) { // 删除的节点有左右子树
            const successor = this.getSuccessor(node.right);
            if (isLeft) {
                parentNode.left = successor;
            } else {
                parentNode.right = successor;
            }
            successor.left = node.left;
        }
    }

    getSuccessor(node) {
        let currentNode = node;
        let successor = node;
        let parentSuccessor = node;
        while(currentNode) {
            parentSuccessor = successor;
            successor = currentNode;
            currentNode = currentNode.left;
        }

        if (successor !== node) {
            parentSuccessor.left = successor.right;
            successor.right = node;
        }

        return successor;
    }
}

console.log(`**********1.二叉树初始化***********`);
const bt = new BinaryTree();
const nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7];

nodes.forEach((item) => {
    bt.insert(item);
});

console.log(`**********2.递归:前序遍历***********`);
const res = bt.prevOrder();
console.log(res);

console.log(`**********3.删除3***********`);
bt.delete(3);

console.log(`**********4.递归:前序遍历***********`);
const res2 = bt.prevOrder();
console.log(res2);