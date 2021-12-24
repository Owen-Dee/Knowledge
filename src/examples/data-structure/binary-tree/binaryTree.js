// http://foreverz.cn/2016/10/19/%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8EJavaScript/
// https://www.pianshen.com/article/9828153025/   二叉树的高度和深度的区别
// https://zhuanlan.zhihu.com/p/56066942 二叉搜索树

class Node {
    constructor(data) {
        this.data = data;                       // 保存的数据
        this.left = null;                       // 左子树
        this.right = null;                      // 右子树
    }
}

class BinaryTree {
    constructor() {
        this.root = null;
    }

    // 递归插入数据
    insert(data) {
        const node = new Node(data);
        if (!this.root) { // 根节点为空
            this.root = node;
        } else {
            this.insertNode(this.root, node);
        }
    }

    insertNode(treeNode, node) {
        if (node.data <= treeNode.data) {
            if (treeNode.left) {
                this.insertNode(treeNode.left, node)
            } else { // 左子树不存在
                treeNode.left = node;
            }
        } else {
            if (treeNode.right) {
                this.insertNode(treeNode.right, node);
            } else {
                treeNode.right = node;
            }
        }
    }

    // 非递归插入数据
    insert2(data) {
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

    /**
     * 前序遍历:递归
     */
    prevOrder(node) {
        if (!node) {
            return;
        }

        console.log(`Node : ${node.data}`);
        this.prevOrder(node.left);
        this.prevOrder(node.right);
    }
    /**
     * 前序遍历:非递归
     * 前序非递归遍历是利用了栈，将根结点放入栈中，然后再取出来，将值放入结果数组，
     * 然后如果存在右子树，将右子树压入栈，如果存在左子树，将左子树压入栈，然后循环判断栈是否为空，重复上述步骤
     */
    prevOrderUnrecursion() {
        const prevOrderArray = [];
        if (!this.root) {
            return prevOrderArray;
        }

        // 利用栈的特性，数据 先进后出
        const stack = [this.root];
        while (stack.length >= 1) {
            const pop = stack.pop();  // 从栈中取出一个结点
            prevOrderArray.push(pop.data);
            if (pop.right) { //如果存在右子树，将右子树压入栈
                stack.push(pop.right);
            }

            if (pop.left) { //如果存在左子树，将左子树压入栈
                stack.push(pop.left);
            }
        }

        return prevOrderArray;
    }
    /**
     * 递归：中序遍历
     */
    inOrder(node) {
        if (!node) {
            return;
        }

        this.inOrder(node.left);
        console.log(`Node: ${node.data}`);
        this.inOrder(node.right);
    }
    /**
     * 非递归: 中序遍历
     */
    inOrderUnrecursion() {
        const inOrderArray = [];
        if (!this.root) {
            return inOrderArray;
        }

        const stack = [];
        let node = this.root;
        while (stack.length !== 0 || node) {
            if (node) { // 如果当前节点不为空
                stack.push(node); //将结点压入栈
                node = node.left; //将左子树作为当前结点
            } else { //左子树为空，即没有左子树的情况
                node = stack.pop(); //将结点取出来
                inOrderArray.push(node.data); //将取出结点的值存入数组中
                node = node.right; //将右结点作为当前结点
            }
        }

        return inOrderArray;
    }
    /**
     * 递归: 后序遍历
     */
    postOrder(node) {
        if (!node) {
            return;
        }

        this.postOrder(node.left);
        this.postOrder(node.right);
        console.log(`Node: ${node.data}`);
    }
    /**
     * 非递归: 后序遍历
     * 算法: 先遍历根节点，再遍历 右子树，最后 左子树。然后把遍历的结果 reverse
     */
    postOrderUnrecursion() {
        const postOrderArr = [];
        if (!this.root) {
            return postOrderArr;
        }

        let node = this.root;
        const stack = [node];
        while (stack.length !== 0) {
            node = stack.pop();
            postOrderArr.push(node.data);
            if (node.left) {
                stack.push(node.left);
            }

            if (node.right) {
                stack.push(node.right);
            }
        }

        return postOrderArr.reverse();
    }
    /**
     * 广度遍历
     * 算法: 采用队列的思想，先进先出，逐层遍历
     */
    traverseByBreadth() {
        const breadthArr = [];
        if (!this.root) {
            return breadthArr;
        }

        let node = this.root;
        const queue = [node];
        while (queue.length !== 0) {
            node = queue.shift();
            breadthArr.push(node.data);
            if (node.left) {
                queue.push(node.left);
            }

            if (node.right) {
                queue.push(node.right);
            }
        }

        return breadthArr;
    }
    /**
     * 查询指定的节点
     */
    findNode(data) {
        let node = this.root;
        while (node) {
            if (data < node.data) {
                node = node.left;
            } else if (data > node.data) {
                node = node.right;
            } else {
                break;
            }
        }

        return node;
    }

    findMinNode(node) {
        while (node) {
            if (!node.left) {
                break;
            }

            if (node.left) {
                node = node.left;
            } else if (node.right) {
                node = node.right;
            }
        }

        return node;
    }

    findMaxNode(node) {
        while (node) {
            if (!node.right) {
                break;
            }

            if (node.right) {
                node = node.right;
            } else if (node.left) {
                node = node.left;
            }
        }

        return node;
    }

    /**
     * 删除节点存在 3 种情况：
     *1.没有左右子节点，可以直接删除
     *2.存在左节点或者右节点，删除后需要对子节点移动
     *3.同时存在左右子节点，不能简单的删除，但是可以通过和后继节点交换后转换为前两种情况
     *  https://www.cnblogs.com/xfgnongmin/p/10860492.html
     */
    deleteNode(data) {
        let node = this.root; // 保存当前要删除的节点
        let parentNode = this.root; // 保存当前要删除节点的父节点
        let isLeft = true; // 记录被删除的节点，处于父节点的左子树还是右子树，默认在左子树
        while (node) {
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

        if (!node) { // 没查到要删除的节点
            return null;
        }

        if (!node.left && !node.right) { // 1.没有左右子节点，可以直接删除
            if (node === this.root) { // 删除的是根节点 
                this.root = null;
            } else {
                this.removeNode(parentNode, null, isLeft);
            }
        } else if (node.left && !node.right) { // 2.删除的节点只有左节点
            if (node === this.root) { // 删除的是根节点 
                this.root = this.root.left;
            } else {
                this.removeNode(parentNode, node.left, isLeft);
            }
        } else if (!node.left && node.right) { // 3.删除的节点只有右节点
            if (node === this.root) { // 删除的是根节点 
                this.root = this.root.right;
            } else {
                this.removeNode(parentNode, node.right, isLeft);
            }
        } else if (node.left && node.right) { // 4.同时存在左右子节点,找到右子树的最小节点
            const successor = this.getSuccessor(node);
            if (node === this.root) {
                this.root = successor;
            } else {
                this.removeNode(parentNode, successor, isLeft);
            }
            successor.left = node.left;
        }

        return true;
    }

    removeNode(parentNode, node, isLeft) {
        if (isLeft) {
            parentNode.left = node;
        } else {
            parentNode.right = node;
        }
    }

    /**
     * 寻找右子树最左边的叶子节点，即为: 中序后继节点
     */
    getSuccessor(node) {
        let curr = node.right; // 定义当前的节点
        let successor = curr; // 记录中序后继节点
        let successorParent = null; // 中序后继节点的父节点
        while (curr) { // 寻找右子树最左边的叶子节点，即为: 中序后继节点
            successorParent = successor;
            successor = curr;
            curr = curr.left;
        }
        if (successor !== node.right) { // 要删除节点的右节点是一棵树，不是叶子节点
            successorParent.left = successor.right;
            successor.right = node.right;
        }

        return successor;
    }
}


console.log(`**********1.二叉树初始化***********`);
const bt = new BinaryTree();
const nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7];

// 递归插入数据
// nodes.forEach((item) => {
//     bt.insert(item);
// });
// 非递归插入数据
nodes.forEach((item) => {
    bt.insert2(item);
});

/**
                8
              /   \
             3     9
            / \     \
           2   6     11
              / \
             4   7 
              \
               5      
*/

/**
 *   前序遍历：访问根–>遍历左子树–>遍历右子树;
 *   中序遍历：遍历左子树–>访问根–>遍历右子树;
 *   后序遍历：遍历左子树–>遍历右子树–>访问根;
 *   广度遍历：按照层次一层层遍历;
 * 
 *   前序、中序、后序:这里的 序 针对根节点而言.
 *   前序: 根节点优先遍历，中序: 根节点次之遍历; 后序: 根节点最后遍历。 其他是先左子树 后右子树
 */
console.log(`**********2.递归:前序遍历***********`);
bt.prevOrder(bt.root);

console.log(`**********3.非递归:前序遍历***********`);
const prevData = bt.prevOrderUnrecursion();
console.log(prevData);

console.log(`**********4.递归:中序遍历***********`);
bt.inOrder(bt.root);

console.log(`**********5.非递归:中序遍历***********`);
const inOrderData = bt.inOrderUnrecursion();
console.log(inOrderData);

console.log(`**********6.递归:后序遍历***********`);
bt.postOrder(bt.root);

console.log(`**********7.非递归:后序遍历***********`);
const postOrderArr = bt.postOrderUnrecursion();
console.log(postOrderArr);

console.log(`**********8.广度优先遍历***********`);
const bd = bt.traverseByBreadth();
console.log(bd);

console.log(`**********9.查找节点***********`);
const node = bt.findNode(3);
console.log(node);

console.log(`**********10.查找最小节点***********`);
const node1 = bt.findMinNode(bt.root);
console.log(node1);

console.log(`**********11.查找最大节点***********`);
const node2 = bt.findMaxNode(bt.root);
console.log(node2);

const data = 3;
console.log(`**********12.删除节点${data}***********`);
const flag = bt.deleteNode(data);
console.log(`删除节点${data}${flag ? '成功' : '失败'}`);
/**
                8
              /   \
             4     9
            / \     \
           2   6     11
              / \
             5   7      
*/

console.log(`**********非递归:前序遍历***********`);
const prevData1 = bt.prevOrderUnrecursion();
console.log(prevData1);