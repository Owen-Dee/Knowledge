const SpecialDay = {
    TwentyEight: 28,
    TwentyNine: 29,
    Thirty: 30,
    ThirtyOne: 31
};

function isLeapYear(year) {
    return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * 
 * @param {*} registerDate: C类账号的注册日期 
 */
function getContractExtensionDate(registerDate, currentDate) {
    if (!registerDate) {
        return;
    }

    const smallMonth = [4, 6, 9, 11]; // 小月
    const regDate = new Date(registerDate); // 用户注册日期
    let curDate;
    if (currentDate) {
        curDate = new Date(currentDate);
    } else {
        curDate = new Date(); // 当前日期
    }
    const regDay = regDate.getDate(); // 注册的日期
    const curDay = curDate.getDate(); // 当前天数
    const curMonth = curDate.getMonth() + 1; // 当前月份
    const curYear = curDate.getFullYear(); // 当前年份
    let ceStartDate = { // 续约起始日期
        day: 0,
        month: 0,
        year: 0
    };
    let ceEndDate = { // 续约结束日期
        day: 0,
        month: 0,
        year: 0
    };
    if (regDay <= SpecialDay.TwentyEight) {
        if (curDay <= regDay) {
            if (curMonth === 1) { // 当前月为一月
                ceStartDate = {
                    day: regDay,
                    month: 12,
                    year: curYear - 1
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            }
        } else {
            if (curMonth === 12) {
                ceStartDate = {
                    day: regDay,
                    month: 12,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: 1,
                    year: curYear + 1
                };
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth + 1,
                    year: curYear
                };
            }
        }
    } else if (regDay === SpecialDay.TwentyNine) {
        if (curDay <= regDay) {
            if (curMonth === 1) {
                ceStartDate = {
                    day: regDay,
                    month: 12,
                    year: curYear - 1
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            } else if (curMonth === 2) {
                if (isLeapYear(curYear)) { // 闰年
                    ceStartDate = {
                        day: regDay,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: regDay,
                        month: curMonth,
                        year: curYear
                    };
                } else { // 平年
                    ceStartDate = {
                        day: regDay,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: 28,
                        month: curMonth,
                        year: curYear
                    };
                }
            } else if (curMonth === 3) {
                if (isLeapYear(curYear)) { // 闰年
                    ceStartDate = {
                        day: regDay,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: regDay,
                        month: curMonth,
                        year: curYear
                    };
                } else { // 平年
                    ceStartDate = {
                        day: 28,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: regDay,
                        month: curMonth,
                        year: curYear
                    };
                }
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            }
        } else {
            if (curMonth === 12) {
                ceStartDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: 1,
                    year: curYear + 1
                };
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth + 1,
                    year: curYear
                };
            }
        }
    } else if (regDay === SpecialDay.Thirty) { // 注册日期30号
        if (curDay <= regDay) {
            if (curMonth === 1) {
                ceStartDate = {
                    day: regDay,
                    month: 12,
                    year: curYear - 1
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            } else if (curMonth === 2) {
                if (isLeapYear(curYear)) { // 闰年
                    ceStartDate = {
                        day: regDay,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: 29,
                        month: curMonth,
                        year: curYear
                    };
                } else { // 平年
                    ceStartDate = {
                        day: regDay,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: 28,
                        month: curMonth,
                        year: curYear
                    };
                }
            } else if (curMonth === 3) {
                if (isLeapYear(curYear)) { // 闰年
                    ceStartDate = {
                        day: 29,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: regDay,
                        month: curMonth,
                        year: curYear
                    };
                } else { // 平年
                    ceStartDate = {
                        day: 28,
                        month: curMonth - 1,
                        year: curYear
                    };
                    ceEndDate = {
                        day: regDay,
                        month: curMonth,
                        year: curYear
                    };
                }
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            }
        } else {
            if (curMonth === 12) {
                ceStartDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: 1,
                    year: curYear + 1
                };
            } else {
                ceStartDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth + 1,
                    year: curYear
                };
            }
        }
    } else if (regDay === SpecialDay.ThirtyOne) { // 注册日期31号
        if (curMonth === 1) {
            ceStartDate = {
                day: regDay,
                month: 12,
                year: curYear - 1
            };
            ceEndDate = {
                day: regDay,
                month: curMonth,
                year: curYear
            };
        } else if (curMonth === 2) {
            if (isLeapYear(curYear)) { // 闰年
                ceStartDate = {
                    day: regDay,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: 29,
                    month: curMonth,
                    year: curYear
                };
            } else { // 平年
                ceStartDate = {
                    day: regDay,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: 28,
                    month: curMonth,
                    year: curYear
                };
            }
        } else if (curMonth === 3) {
            if (isLeapYear(curYear)) { // 闰年
                ceStartDate = {
                    day: 29,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            } else { // 平年
                ceStartDate = {
                    day: 28,
                    month: curMonth - 1,
                    year: curYear
                };
                ceEndDate = {
                    day: regDay,
                    month: curMonth,
                    year: curYear
                };
            }
        } else if (smallMonth.includes(curMonth)) { // 当前月为小月
            ceStartDate = {
                day: regDay,
                month: curMonth - 1,
                year: curYear
            };
            ceEndDate = {
                day: 30,
                month: curMonth,
                year: curYear
            };
        } else if (smallMonth.includes(curMonth - 1)) { // 当前月的前一个月是小月
            ceStartDate = {
                day: 30,
                month: curMonth - 1,
                year: curYear
            };
            ceEndDate = {
                day: regDay,
                month: curMonth,
                year: curYear
            };
        } else {
            ceStartDate = {
                day: regDay,
                month: curMonth - 1,
                year: curYear
            };
            ceEndDate = {
                day: regDay,
                month: curMonth,
                year: curYear
            };
        }
    }

    const date = {
        startDate: `${ceStartDate.year}/${ceStartDate.month < 10 ? `0${ceStartDate.month}` : ceStartDate.month}/${ceStartDate.day < 10 ? `0${ceStartDate.day}` : ceStartDate.day}`,
        endDate: `${ceEndDate.year}/${ceEndDate.month < 10 ? `0${ceEndDate.month}` : ceEndDate.month}/${ceEndDate.day < 10 ? `0${ceEndDate.day}` : ceEndDate.day}`
    };

    return date;
}

const d1 = getContractExtensionDate('2020/1/30', '2020/4/6');
console.log(d1);

window.getContractExtensionDate = getContractExtensionDate;
