const SpecialDay = {
    TwentyNine: 29,
    Thirty: 30,
    ThirtyOne: 31
};

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

function getNextMonthByTwentyNine(cDay, cMonth, cYear) {
    let nDay = 0;
    let nMonth = 0;
    let nYear = 0;
    if (cMonth === 1) { // 当前月为一月
        if (isLeapYear(cYear)) { // 是否为闰年
            nDay = 29;
        } else {
            nDay = 28;
        }
        nMonth = 2;
        nYear = cYear;
    } else if (cMonth === 12) { // 当前月为12月
        nDay = cDay;
        nMonth = 1;
        nYear = cYear + 1;
    } else {
        nDay = cDay;
        nMonth = cMonth + 1;
        nYear = cYear;
    }
    return {
        nDay,
        nMonth,
        nYear
    }
}

function getNextMonthByThirty(cDay, cMonth, cYear) {
    let nDay = 0;
    let nMonth = 0;
    let nYear = 0;
    if (cMonth === 1) { // 当前月为一月
        if (isLeapYear(cYear)) { // 是否为闰年
            nDay = 29;
        } else { // 非闰年
            nDay = 28;
        }
        nMonth = 2;
        nYear = cYear;
    } else if (cMonth === 12) { // 当前月为12月
        nDay = cDay;
        nMonth = 1;
        nYear = cYear + 1;
    } else {
        nDay = cDay;
        nMonth = cMonth + 1;
        nYear = cYear;
    }
    return {
        nDay,
        nMonth,
        nYear
    }
}

function getNextMonthByThirtyOne(cDay, cMonth, cYear) {
    const smallMonth = [4, 6, 9, 11]; // 小月
    let nDay = 0;
    let nMonth = 0;
    let nYear = 0;
    if (cMonth === 1) { // 当前月为一月
        if (isLeapYear(cYear)) { // 是否为闰年
            nDay = 29;
        } else { // 平年
            nDay = 28;
        }
        nMonth = 2;
        nYear = cYear;
    } else if (cMonth === 12) { // 当前月为12月
        nDay = cDay;
        nMonth = 1;
        nYear = cYear + 1;
    } else if (smallMonth.includes(cMonth + 1)) { // 下一个月是小月
        nDay = 30;
        nMonth = cMonth + 1;
        nYear = cYear;
    } else { // 下一个月是大月
        nDay = cDay;
        nMonth = cMonth + 1;
        nYear = cYear;
    }
    return {
        nDay,
        nMonth,
        nYear
    }
}

function getNextMonthByDefault(cDay, cMonth, cYear) {
    let nDay = 0;
    let nMonth = 0;
    let nYear = 0;
    if (cMonth === 12) { // 当前月为12月
        nDay = cDay;
        nMonth = 1;
        nYear = cYear + 1;
    } else {
        nDay = cDay;
        nMonth = cMonth + 1;
        nYear = cYear;
    }
    return {
        nDay,
        nMonth,
        nYear
    }
}

function getNextMonthPeriod(date) {
    if (!date) {
        return null;
    }
    const cDate = new Date(date);
    const cDay = cDate.getDate(); // 当前日期
    const cMonth = cDate.getMonth() + 1; // 当前月份
    const cYear = cDate.getFullYear(); // 当前年份
    let nDateObj;
    switch (cDay) {
        case SpecialDay.TwentyNine:
            nDateObj = getNextMonthByTwentyNine(cDay, cMonth, cYear);
            break;
        case SpecialDay.Thirty:
            nDateObj = getNextMonthByThirty(cDay, cMonth, cYear);
            break;
        case SpecialDay.ThirtyOne:
            nDateObj = getNextMonthByThirtyOne(cDay, cMonth, cYear);
            break;
        default:
            nDateObj = getNextMonthByDefault(cDay, cMonth, cYear);
            break;
    }
    if (!nDateObj) {
        return null;
    }
    const nYear = nDateObj.nYear;
    const nMonth = nDateObj.nMonth < 10 ? `0${nDateObj.nMonth}` : nDateObj.nMonth;
    const nDay = nDateObj.nDay < 10 ? `0${nDateObj.nDay}` : nDateObj.nDay;

    return `${nYear}/${nMonth}/${nDay}`;
};


const nDate = getNextMonthPeriod('2020/8/31');
console.log('Next month: ' + nDate);

window.getNextMonthPeriod = getNextMonthPeriod;