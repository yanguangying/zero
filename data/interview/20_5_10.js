// 输入：“get1_install2_app3_list4_by5_android6”（每个单词后面总会携带一个数字，只有偶数才删掉），我不用循环只用正则怎么实现输出"get1InstallApp3ListBy5Android"？

var str = "get1_install2_app3_list4_by5_android6"
var reg = /_|(\d*[02468])/g

console.log(str.replace(reg,""))