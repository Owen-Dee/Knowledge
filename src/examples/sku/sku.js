/**
 * SKU: Stock Keeping Unit（最小存货单位),定义为保存库存控制的最小可用单位;
 */

const types = ['en_US', 'ja_JP', 'zh_CN', 'kr_KO'];
const colors = ['Gray', 'Gold', 'Pink'];
const cpus = ['8G', '16G', '32G', '64G'];

/**
 * n个数组进行组合
 * @param  {...any} chunks: 数组
 */
function combines(...chunks) {
    const result = [];
    const length = chunks.length;
    const func = (index, prev) => {
        const chunk = chunks[index];
        chunk.forEach((item) => {
            let val = prev.concat(item);
            if (index === length - 1) {
                result.push(val);
            } else {
                func(index + 1, val);
            }
        });
    };

    func(0, []);

    return result;
}

const val1 = combines(types, colors, cpus);
console.log(val1);


function cartesianProductOf() {
    return Array.prototype.reduce.call(arguments, function(a, b) {
        debugger
        var ret = [];
        a.forEach(function(a) {
            b.forEach(function(b) {
                ret.push(a.concat([b]));
            });
        });
        return ret;
    }, [[]]);
}

// const data = [types, colors, cpus];
// const res = cartesianProductOf(...data);
// console.log(res);


const skuCombine = (...skus) => {
    if (!skus || skus.length < 2) {
        return skus;
    }

    return skus.reduce((prev, next) => {
        let res = [];
        prev.forEach((p) => {
            next.forEach((n) => {
                res.push(p.concat(n));
            })
        });
        return res;
    }, [[]]);
}

// const data = [types, colors, cpus];
// const res = skuCombine(...data);
// console.log(res);