// 实例方法

// push添加一个元素到栈顶   
// pop弹出栈顶元素
// top返回栈顶元素，但是不是弹出栈顶元素
// isEmpty判断栈是否为空
// size返回栈里元素的个数
// clear清空栈

// 栈的实现

function Stack() {
    // this.items = []; 不使用这中定义，stact.items可以在类外面获取到。修改内部数据。
    var items = [];
    this.push = function (item) {
        items.push(item);
    };
    this.pop = function () {
        return items.pop()
    };
    this.top = function () {
        return items[items.length-1];
    };
    this.isEmpty = function () {
        return items.length ==0;
    };
    this.size = function () {
        return items.length;
    };
    this.clear = function () {
        items = [];
    }
}

// 练习

// 1.合法括号。判断一个字符串中的括号是否合法。注：合法括号成对且内容在括号中
function is_leagl_brackets(string) {
    var stack = new Stack();
    for (let i = 0; i < string.length; i++) {
        const item = string[i];
        if(item =="("){
            stack.push(item);
        }else if(item == ")"){
            if(stack.isEmpty()){
                return true;
            }else{
                stack.pop();
            }
        }
    }
    return stack.isEmpty();
};
var str = "()()(as(asdf)dfsdf)"
console.log(is_leagl_brackets(str));

// 2. 后缀表达式的计算
function calc_exp(exp) {
    var stack = new Stack();
    for (let i = 0; i < exp.length; i++) {
        const item = exp[i];
        if(["+","-","*","/"].indexOf(item)>=0){
            var value_1 = stack.pop();
            var value_2 = stack.pop();
            var exp_str = value_2 + item +value_1;
            var res = parseInt(eval(exp_str));
            stack.push(res);
        }else{
            stack.push(item);
        }
    }
    return stack.pop();
}

console.log(calc_exp(["4","13","5","/","+"]));

// 3. 实现一个有min方法的栈，min方法返回栈中最小值。
function minStack() {
    var data_stack = new Stack();
    var min_stack = new Stack();

    this.push = function (item) {
        data_stack.push(item);

        if(min_stack.isEmpty() || item <min_stack.top()){
            min_stack.push(item);
        }else{
            min_stack.push(min_stack.top())
        }
    };

    this.pop = function () {
        data_stack.pop();
        min_stack.pop();
    };

    this.min = function () {
        return min_stack.top();
    }
}

var minstack = new minStack();
minstack.push(2);
minstack.push(3);
minstack.push(6);
console.log(minstack.min());
minstack.push(4);
console.log(minstack.min());

// 4. 中缀表达式转后缀表达式
var priority_map = {
    "+":1,
    "-":1,
    "*":2,
    "/":2,
};

function infix_exp_2_postfix_exp(exp) {
    var stack = new Stack();
    var postfix_lst = [];
    for (let i = 0; i < exp.length; i++) {
        const item = exp[i];
        if(!isNaN(item)){
            postfix_lst.push(item);
        }else if(item == "("){
            stack.push(item);
        }else if(item == ")"){
            while(stack.top()!="("){
                postfix_lst.push(stack.pop())
            };
            stack.pop();
        }else{
            while (!stack.isEmpty() && ["+","-","*","/"].indexOf(stack.top())>=0 
            && priority_map[stack.top()] > priority_map[item]) {
                postfix_lst.push(stack.pop())
            }

            stack.push(item)
        }
    }

    while (!stack.isEmpty()) {
        postfix_lst.push(stack.pop())
    }
    return postfix_lst;
}

var exp = "(1+(4+5)/3)*2"
exp = exp.split("");
console.log(exp);

var value = infix_exp_2_postfix_exp(exp)
console.log(value);
