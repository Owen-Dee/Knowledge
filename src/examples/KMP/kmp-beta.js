// 找出对应的移动为数：移动位数 = 已匹配的字符数 - 对应的部分匹配值
function getNext(searchStr) {
    if (!searchStr || searchStr.length === 0) {
        return [];
    }
    const len = searchStr.length;
    const next = new Array(len).fill(0);
    for (let i = 0; i < len; i++) {
        const subStr = searchStr.slice(0, i + 1);
        for (j = 0; j < i; j++) {
            const prefix = subStr.slice(0, j + 1);
            const suffix = subStr.slice(i - j);
            if (prefix === suffix) {
                next[i] = j + 1;
            }
        }
    }

    return next;
}

function kmp(originalStr, searchStr) {
    if (!originalStr || !searchStr || originalStr.length === 0 || searchStr.length === 0) {
        return -1;
    }

    const originalLen = originalStr.length;
    const searchLen = searchStr.length;
    const next = getNext(searchStr);
    let i = 0; // 源字符串指针
    let j = 0; // 查询字符串指针
    while(i < originalLen && j < searchLen) {
        const oChar = originalStr[i];
        const sChar = searchStr[j];
        if (oChar === sChar) {
            ++i;
            ++j;
        } else {
            if (j === 0) {
                ++i;
                continue;
            }

            j = next[j - 1]; // j = next[j - 1]。此举意味着失配时，模式串 searchStr 相对于文本串 originalStr 向右移动了 j - next [j - 1] 位
        }
    }

    if (j === searchLen) {
        return i - j;
    } else {
        return -1;
    }
}

/**
 * 1. test next
 */
// const searchStr = 'abcabc cd';
// const next = getNext(searchStr);
// console.log('==============next=================');
// console.log(next);

/**
 * 2. test kmp
 */
const oStr = 'mnabcabcgaabcdabcdhkkl';
const sStr = 'abcabcd';
const location = kmp(oStr, sStr);
console.log('location: ' + location);

// let s1 = 'BBC ABCDAB ABCDABCDABDE';
// let t1 = 'ABCDABD';
// let r3 = kmp(s1, t1);
// console.log('location: ' + r3);

