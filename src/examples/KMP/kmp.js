/**
 * 1.首先是构建模式字符串指针的下一跳的next数组,这个数组的长度和模式字符串的长度一样.
 * 2.其下标也对应模式字符串的下标,next数组中的值表示.
 * 3.当前下标的字符不匹配时,模式字符串的指针的下一跳位置.
 */

/**
 * 计算返回子串str的next数组
 * */
function getNext(str) {
    const len = str.length,
        next = new Array(len).fill(0); //默认下一跳回到0
    for (let i = 0; i < len; i++) {
        const subStr = str.slice(0, i);
        for (let j = 0; j < i - 1; j++) {
            //判断前缀和后缀的情况，存储当j位不匹配时，
            //下一跳的位置，自动更新保证最大值
            let str1 = subStr.slice(0, j + 1);
            let str2 = subStr.slice(i - j - 1);
            if (str1 === str2) {
                next[i] = j + 1;
            }
        }
    }

    return next;
}

/**
 * @param sourceStr 主字符串
 * @param searchStr 模式字符串
 * */
function KMP(sourceStr, searchStr) {
    const sourceLen = sourceStr.length,
        searchLen = searchStr.length,
        next = getNext(searchStr);
    //i为源字符串的指针，j为目标字符串的指针
    let i = 0,
        j = 0;

    while (i < sourceLen && j < searchLen) {
        let sourStr = sourceStr[i];
        let searStr = searchStr[j];
        if (sourStr === searStr) {
            ++i;
            ++j;
        } else {
            //这里用于判断当前指针的位置，如果指针已经在0了，
            //表示模式字符串的第一位都不匹配，主字符串的指针往后移一位
            if (j === 0) {
                ++i;
                continue;
            }

            j = next[j];
        }
    }

    if (j === searchLen) {
        return i - j;
    } else {
        return -1;
    }
}

//abcdabc
//  字符串              前缀                              后缀                          共有元素长度
//1. a                  null                             null                               0
//2. ab                  [a]                              [b]                               0
//3. abc               [a, ab]                           [bc, c]                            0
//4. abcd            [a, ab, abc]                       [bcd, cd, d]                        0
//5. abcda         [a, ab, abc,abcd]                  [bcda, cda, da, a]                   [a]: 1
//6. abcdab    [a, ab, abc,abcd, abcda]             [bcdab, cdab, dab, ab, b]              [ab]: 2
//7. abcdabc  [a, ab, abc,abcd, abcda,abcdab]   [bcdabc, cdabc, dabc, abc, bc, c]         [abc]: 3


// var s = "BBC ABCDAB ABCDABCDABDE";
// var t = "ABCDABD";

// let r2 = KMP(s, t);
// console.log(r2);

let s1 = 'nnabcdqqabcdabmabcdabc';
let t1 = 'abcdabc';
let r3 = KMP(s1, t1);
console.log(r3);

// let s1 = 'abcdabc';
// let r = getNext1(s1);
// console.log(r);