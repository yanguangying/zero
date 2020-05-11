// 输入：“get1_install2_app3_list4_by5_android6”（每个单词后面总会携带一个数字，只有偶数才删掉），
// 不用循环只用正则怎么实现输出"get1InstallApp3ListBy5Android"？

var str = "get1_install2_app3_list4_by5_android6"
var reg = /_|(\d*[02468])/g

console.log(str.replace(reg, ""))


// 判断两个对象（注意特殊对象的处理）找出不一致的是哪个变量，
// 返回的格式类似："root变量-父变量-…-不一致的变量"的字符串；
var getDiffPath = function (a, b) {
    var q = [];
    var objCmp = function (a, b, p) {
        var eq = true;
        q.push(p);
        if (typeof a !== "object" || typeof b !== "object") {
            eq = a === b;
            eq && q.pop();
            return eq;
        }
        if (a instanceof Date) {
            eq = (a.getTime() - b.getTime() === 0);
            eq && q.pop();
        } else if (a instanceof Array) {
            for (var i = 0; i < a.length; i++) {
                if (!objCmp(a[i], b[i], p)) {
                    eq = false;
                    break;
                }
            }
        } else {
            for (var prop in a) {
                if (a.hasOwnProperty(prop)) {
                    if (!objCmp(a[prop], b[prop], prop)) {
                        eq = false;
                        break;
                    }
                }
            }
        }
        return eq;
    }
    objCmp(a, b, "root");
    return q.join(' - ');
};

var result = getDiffPath({a:1},{a:2})
console.log(result);
