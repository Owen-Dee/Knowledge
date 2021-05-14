// link: https://juejin.cn/post/6844904084726628365

/**
 * 编辑距离，又称Levenshtein距离（莱文斯坦距离也叫做Edit Distance），
 * 是指两个字串之间，由一个转成另一个所需的最少编辑操作次数，
 * 如果它们的距离越大，说明它们越是不同。
 * 许可的编辑操作包括将一个字符替换成另一个字符，插入一个字符，删除一个字符
 * (编辑距离)算法过程
    1.str1或str2的长度为0返回另一个字符串的长度。 
    m = str1.length; n = str2.length;
    if(m==0) return n; 
    if(n==0) return m;

    2.初始化m*n的矩阵d，并让第一行和列的值从0开始增长。
    扫描两字符串（m*n级的），
    如果：str1[i] == str2[j]，用temp记录它，为0。否则temp记为1。
    然后在矩阵d[i,j]赋于d[i-1,j]+1 、d[i,j-1]+1、d[i-1,j-1]+temp三者的最小值。

    3.扫描完后，返回矩阵的最后一个值d[m][n]即是它们的距离。
 */

/**
可以使用动态规划的方法去测量LD的值，步骤大致如下：
    1. 初始化一个LD矩阵(M,N)，M和N分别是两个输入字符串的长度。
    2. 矩阵可以从左上角到右下角进行填充，每个水平或垂直跳转分别对应于一个插入或一个删除。
    3. 通过定义每个操作的成本为1，如果两个字符串不匹配，则对角跳转的代价为1，否则为0，简单来说就是：
        a: 如果[i][j]位置的两个字符串相等，则从[i][j]位置左加1，上加1，左上加0，然后从这三个数中取出最小的值填充到[i][j]。
        b: 如果[i][j]位置的两个字符串不相等，则从[i][j]位置左、左上、上三个位置的值中取最小值，这个最小值加1（或者说这三个值都加1然后取最小值），然后填充到[i][j]。
        c: 按照上面规则LD矩阵(M,N)填充完毕后，最终「矩阵右下角的数字」就是两个字符串的LD值
 */

//step1:
/**
 *     l o v e
 *   0 1 2 3 4
 * l 1 
 * o 2
 * e 3
 * v 4
 * 2 5
 */

//step2:
/**
 *     l o v e
 *   0 1 2 3 4
 * l 1 0
 * o 2 1
 * e 3 2
 * v 4 3
 * 2 5 4
 */

//step3:
/**
 *     l o v e
 *   0 1 2 3 4
 * l 1 0 1
 * o 2 1 0
 * e 3 2 1
 * v 4 3 2
 * 2 5 4 3
 */

//step4:
/**
 *     l o v e
 *   0 1 2 3 4
 * l 1 0 1 2 3
 * o 2 1 0 1 2
 * e 3 2 1 1 1
 * v 4 3 2 1 2
 * 2 5 4 3 2 2
 */

function levenshteinDistance(str1, str2) {
    let matrix = new Array();
    let n = str1.length; // str1的长度为二维数据的列
    let m = str2.length; // str2的长度为二维数据的行
    if (n === 0) {
        return m;
    }

    if (m === 0) {
        return n;
    }

    // 初始化二维数组
    for (let i = 0; i <= m; i++) {
        matrix[i] = new Array();
        for (let j = 0; j <= n; j++) {
            if (i === 0) { // 第一行
                matrix[0][j] = j;
            } else if (j === 0) { // 第一列
                matrix[i][0] = i;
            } else {
                matrix[i][j] = undefined;
            }
        }
    }

    for (let i = 1; i <= m; i++) {
        let ch1 = str2[i - 1];
        for (j = 1; j <= n; j++) {
            let ch2 = str1[j - 1];
            let temp;
            if (ch1 === ch2) {
                temp = 0;
            } else {
                temp = 1;
            }

            let leftVal = matrix[i - 1][j] + 1; // 表示增加操作 (左边)
            let upVal = matrix[i][j - 1] + 1; // 表示删除操作 (上边)
            let leftUpVal = matrix[i - 1][j - 1] + temp; // 表示替换操作 (左上)
            matrix[i][j] = lowerOfThree(leftVal, upVal, leftUpVal);
        }
    }

    return matrix[m][n];
}

function lowerOfThree(first, second, third) {
    let min = Math.min(first, second);

    return Math.min(min, third);
}

let str1 = 'love';
let str2 = 'loev2';

let val = levenshteinDistance(str1, str2);
console.log(val);