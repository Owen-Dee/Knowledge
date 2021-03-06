// https://baijiahao.baidu.com/s?id=1659735837100760934&wfr=spider&for=pc
// https://www.ruanyifeng.com/blog/2013/05/Knuth%E2%80%93Morris%E2%80%93Pratt_algorithm.html

/**
 * 计算返回子串str的next数组
 * 1.首先是构建模式字符串指针的下一跳的next数组,这个数组的长度和模式字符串的长度一样.
 * 2.其下标也对应模式字符串的下标,next数组中的值表示.当前下标的字符不匹配时,模式字符串的指针的下一跳位置.
 * */
function getNext(str) {
    debugger
    const len = str.length;
    const next = new Array(len).fill(0); //默认下一跳回到0
    for (let i = 0; i < len; i++) {
        const subStr = str.slice(0, i + 1);
        for (let j = 0; j < i; j++) {
            //判断前缀和后缀的情况，存储当j位不匹配时，
            //下一跳的位置，自动更新保证最大值
            let str1 = subStr.slice(0, j + 1);
            let str2 = subStr.slice(i - j);
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
    const sourceLen = sourceStr.length;
    const searchLen = searchStr.length;
    const next = getNext(searchStr);
    console.log('===========next============');
    console.log(next);
    //i为源字符串的指针，j为目标字符串的指针
    let i = 0;
    let j = 0;

    while (i < sourceLen && j < searchLen) {
        let sourStr = sourceStr[i];
        let searStr = searchStr[j];
        console.log(`源字符串的指针i: ${i}; value: ${sourceStr[i]}`);
        console.log(`目标字符串的指针j: ${j}; value: ${searchStr[j]}`);
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

            j = next[j - 1];
        }
    }

    if (j === searchLen) {
        return i - j;
    } else {
        return -1;
    }
}

//abcdabc
//   长度  字符串              前缀                              后缀                          共有元素长度
//    1.   a                  null                             null                               0
//    2.   ab                  [a]                              [b]                               0
//    3.   abc               [a, ab]                           [bc, c]                            0
//    4.   abcd            [a, ab, abc]                       [bcd, cd, d]                        0
//    5.   abcda         [a, ab, abc,abcd]                  [bcda, cda, da, a]                   [a]: 1
//    6.   abcdab    [a, ab, abc,abcd, abcda]             [bcdab, cdab, dab, ab, b]              [ab]: 2
//    7.   abcdabc  [a, ab, abc,abcd, abcda,abcdab]   [bcdabc, cdabc, dabc, abc, bc, c]         [abc]: 3

/**
 * eg1
 */
var s = "BBC ABCDAB ABCDABCDABDE";
var t = "ABCDABD";

let r2 = KMP(s, t);
console.log(r2);

/**
 * eg2
 */
// let s1 = 'nnabcdqqabcdabmabcdabcabcdabc';
// let t1 = 'abcdabc';
// let r3 = KMP(s1, t1);
// console.log(r3);


// nnabcdqqabcdabmabcdabc
// abcdabc
//  abcdabc
//   abcdabc
//       abcdabc
//        abcdabc
//         abcdabc
//           abcdabc
//               abcdabc
//                abcdabc

/**
 * eg3
 */
//移动位数 = 已匹配的字符数 - 对应的部分匹配值
// let s1 = 'abababmmnabababccc';
// let t1 = 'abababc';
// let r3 = KMP(s1, t1);
// console.log(r3);