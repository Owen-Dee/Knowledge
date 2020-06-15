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