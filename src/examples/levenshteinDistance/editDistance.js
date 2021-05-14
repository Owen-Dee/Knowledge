function minValue(leftVal, leftUpVal, topVal) {
    return Math.min(Math.min(leftVal, leftUpVal), topVal);
}

function editDistance(sourceStr, targetStr) {
    const sourceLen = sourceStr.length;
    const targetLen = targetStr.length;
    if (sourceStr === 0) {
        return targetLen;
    }

    if (targetLen === 0) {
        return sourceLen;
    }

    const matrix = [];
    for (let i = 0; i <= sourceLen; i++) {
        matrix[i] = [];
        for (let j = 0; j <= targetLen; j++) {
            if (i === 0) {
                matrix[i][j] = j;
            } else if (j === 0) {
                matrix[i][j] = i;
            } else {
                matrix[i][j] = null;
            }
        }
    }

    let temp = 0;
    for (let i = 1; i <= sourceLen; i++) {
        for (let j = 1; j <= targetLen; j++) {
            if (sourceStr[i - 1] === targetStr[j -1]) {
                temp = 0;
            } else {
                temp = 1;
            }

            const leftVal = matrix[i - 1][j] + 1;
            const leftUpVal = matrix[i - 1][j - 1] + temp;
            const topVal = matrix[i][j - 1] + 1;
            const minVal = minValue(leftVal, leftUpVal, topVal);
            matrix[i][j] = minVal;
        }
    }

    return matrix;
}

const s1 = 'project23';
const t1 = 'prkjemt3';
const ed = editDistance(s1, t1);
console.log(ed);