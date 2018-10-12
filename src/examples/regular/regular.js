//匹配8位数字的QQ号码
let reg = /^\d{8}$/;
let num1 = 12345678;
let num2 = 123456;
console.log('匹配8位数字的QQ号码:' + reg.test(num1));
console.log('匹配8位数字的QQ号码:' + reg.test(num2));

//匹配1开头11位数字的手机号码
let phoneReg = /^1\d{10}$/;
let p1 = 15862368907;
let p2 = 25862368907;
console.log('匹配1开头11位数字的手机号码:' + phoneReg.test(p1));
console.log('匹配1开头11位数字的手机号码:' + phoneReg.test(p2));

//匹配银行卡号是14~18位的数字
let bankReg = /^\d{14,18}$/;
let b1 = 1234567890;
let b2 = 621212587564543;
console.log('匹配银行卡号是14~18位的数字:' + bankReg.test(b1));
console.log('匹配银行卡号是14~18位的数字:' + bankReg.test(b2));

//匹配字符串中包含 0 到多个 ab 开头
let reg1 = /^(ab)*/;
let str1 = 'abcabc';
let str2 = 'asdbcx';
console.log('匹配字符串中包含 0 到多个 ab 开头:' + reg1.test(str1));
console.log('匹配字符串中包含 0 到多个 ab 开头:' + reg1.test(str2));

let reg2 = /^(130|131|132|155|156|185|186|145|176)\d{8}$/;
let reg3 = /^(13[0-2])|(15[56])|(18[56]|145|176)\d{8}$/;

//判断以yaml文件作为节点