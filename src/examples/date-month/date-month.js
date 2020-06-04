function nextMonthDate(date) {
    if (!date) {
        return;
    }

    const smallMonth = [4, 6, 9, 11]; // 小月
    const cDate = new Date(date);
    const cDay = cDate.getDate(); // 当前日期
    const cMonth = cDate.getMonth() + 1; // 当前月份
    const cYear = cDate.getFullYear(); // 当前年份
    let nDay = 0;
    let nMonth = 0;
    let nYear = 0;
    if (cDay <= 28) { // 当前日期小于等于28号
        if (cMonth === 12) { // 当前月为12月
            nDay = cDay < 10 ? `0${cDay}` : cDay;
            nMonth = '01';
            nYear = cYear + 1;
        } else {
            nDay = cDay < 10 ? `0${cDay}` : cDay;
            nMonth = (cMonth + 1) < 10 ? `0${cMonth + 1}` : cMonth + 1;
            nYear = cYear;
        }
        return `${nYear}/${nMonth}/${nDay}`;
    } else if (cDay === 29) {
        if (cMonth === 1) { // 当前月为一月
            if ((cYear % 4 === 0 && cYear % 100 !== 0) || cYear % 400 === 0) { // 是否为闰年
                nDay = 29;
            } else {
                nDay = 28;
            }
            nMonth = '02';
            nYear = cYear;
        } else if (cMonth === 12) { // 当前月为12月
            nDay = cDay;
            nMonth = '01';
            nYear = cYear + 1;
        } else {
            nDay = cDay;
            nMonth = (cMonth + 1) < 10 ? `0${cMonth + 1}` : cMonth + 1;
            nYear = cYear;
        }
        return `${nYear}/${nMonth}/${nDay}`;
    } else if (cDay === 30) {
        if (cMonth === 1) { // 当前月为一月
            if ((cYear % 4 === 0 && cYear % 100 !== 0) || cYear % 400 === 0) { // 是否为闰年
                nDay = 29;
            } else { // 非闰年
                nDay = 28;
            }
            nMonth = '02';
            nYear = cYear;
        } else if (cMonth === 12) { // 当前月为12月
            nDay = cDay;
            nMonth = '01';
            nYear = cYear + 1;
        } else {
            nDay = cDay;
            nMonth = (cMonth + 1) < 10 ? `0${cMonth + 1}` : cMonth + 1;
            nYear = cYear;
        }
        return `${nYear}/${nMonth}/${nDay}`;
    } else if (cDay === 31) {
        if (cMonth === 1) { // 当前月为一月
            if ((cYear % 4 === 0 && cYear % 100 !== 0) || cYear % 400 === 0) { // 是否为闰年
                nDay = 29;
            } else { // 平年
                nDay = 28;
            }
            nMonth = '02';
            nYear = cYear;
        } else if (cMonth === 12) { // 当前月为12月
            nDay = cDay;
            nMonth = '01';
            nYear = cYear + 1;
        } else if (smallMonth.includes(cMonth + 1)) { // 下一个月是小月
            nDay = 30;
            nMonth = (cMonth + 1) < 10 ? `0${cMonth + 1}` : cMonth + 1;
            nYear = cYear;
        } else { // 下一个月是大月
            nDay = cDay;
            nMonth = (cMonth + 1) < 10 ? `0${cMonth + 1}` : cMonth + 1;
            nYear = cYear;
        }
        return `${nYear}/${nMonth}/${nDay}`;
    }
}

const nDate = nextMonthDate(1587368942000);
console.log('Next month: ' + nDate);

window.nextMonthDate = nextMonthDate;