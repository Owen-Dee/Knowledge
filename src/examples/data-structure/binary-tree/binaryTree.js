// http://foreverz.cn/2016/10/19/%E4%BA%8C%E5%8F%89%E6%A0%91%E4%B8%8EJavaScript/

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
     * 先序非递归遍历是利用了栈，将根结点放入栈中，然后再取出来，将值放入结果数组，
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
}


console.log(`**********1.二叉树初始化***********`);
const bt = new BinaryTree();
const nodes = [8, 3, 6, 4, 9, 11, 2, 5, 7];
nodes.forEach((item) => {
    bt.insert(item);
});

/**
                8
              /   \
             3      9
            / \      \
           2   6      11
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