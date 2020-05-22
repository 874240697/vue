function Compile(el, vm) {
    //保存vm到Compile对象
    this.$vm = vm;
    //将el对应的元素对象保存到Compile对象中
    this.$el = this.isElementNode(el) ? el : document.querySelector(el);
    //如果有el元素
    if (this.$el) {
        //1、将el元素中所有的子节点保存到fragment对象中
        this.$fragment = this.node2Fragment(this.$el);
        //2、编译fragment中所有的层次子节点
        this.init();
        //3、将编译好的fragment插入到el元素中
        this.$el.appendChild(this.$fragment);
    }
}

Compile.prototype = {
    node2Fragment: function(el) {
        //创建空的fragment容器
        var fragment = document.createDocumentFragment(),
            child;

        // 将el中所有子节点拷贝到fragment
        while (child = el.firstChild) {
            fragment.appendChild(child);
        }

        return fragment;
    },

    init: function() {
        //编译指定元素(所有层次的子节点)
        this.compileElement(this.$fragment);
    },

    compileElement: function(el) {
        //取出最外层所有子节点
        var childNodes = el.childNodes,
            //保存compile对象
            me = this;
        //遍历所有节点(text/element)
        [].slice.call(childNodes).forEach(function(node) {
            //得到节点的文本内容
            var text = node.textContent;
            //创建正则对象(匹配大括号表达式)
            var reg = /\{\{(.*)\}\}/;
            //判断节点是否是元素节点
            if (me.isElementNode(node)) {
                //编译这个元素节点(解析指令)
                me.compile(node);

            } else if (me.isTextNode(node) && reg.test(text)) {//判断节点是否是大括号的文本格式节点
                //编译大括号表达式文本节点
                me.compileText(node, RegExp.$1);
            }
            //如果该节点还有子节点那么就继续调用compileElement方法实现所有层次的节点编译---(递归操作)
            if (node.childNodes && node.childNodes.length) {
                me.compileElement(node);
            }
        });
    },

    compile: function(node) {
        //得到标签的所有属性
        var nodeAttrs = node.attributes,
            //将compile实例保存到me中
            me = this;
        //遍历所有该节点的属性
        [].slice.call(nodeAttrs).forEach(function(attr) {
            //得到属性名
            var attrName = attr.name;
            //判断该属性名是否是---指令属性
            if (me.isDirective(attrName)) {
                //将属性值保存到exp中---表达式
                var exp = attr.value;
                //取得属性名中的指令名：v-后面的部分内容  (on:click)
                var dir = attrName.substring(2);
                // 事件指令
                //判断dir是否是事件指令
                if (me.isEventDirective(dir)) {
                    //解析事件指令
                    compileUtil.eventHandler(node, me.$vm, exp, dir);
                    // 普通指令
                } else {
                    //
                    compileUtil[dir] && compileUtil[dir](node, me.$vm, exp);
                }

                //最终指令执行完毕 移除该指令属性
                node.removeAttribute(attrName);
            }
        });
    },

    compileText: function(node, exp) {
        compileUtil.text(node, this.$vm, exp);
    },

    isDirective: function(attr) {
        return attr.indexOf('v-') == 0;
    },

    isEventDirective: function(dir) {
        return dir.indexOf('on') === 0;
    },

    isElementNode: function(node) {
        return node.nodeType == 1;
    },

    isTextNode: function(node) {
        return node.nodeType == 3;
    }
};

// 包含多个解析指令的方法的工具对象
var compileUtil = {
    //解析v-text
    text: function(node, vm, exp) {
        this.bind(node, vm, exp, 'text');
    },
    //解析v-html
    html: function(node, vm, exp) {
        this.bind(node, vm, exp, 'html');
    },

    model: function(node, vm, exp) {
        //实现数据的初始化显示和创建对应的watcher
        this.bind(node, vm, exp, 'model');

        var me = this,
            //得到表达式的值
            val = this._getVMVal(vm, exp);
        //给节点绑定input的事件监听(输入改变时触发)
        node.addEventListener('input', function(e) {
            //得到最新的input值
            var newValue = e.target.value;
            //判断最新的input值与原来的值是否相等，没有变化直接结束
            if (val === newValue) {
                return;
            }
            //如果不相等，将最新的值赋给表达式所对应的属性
            me._setVMVal(vm, exp, newValue);
            //保存最新的值
            val = newValue;
        });
    },
    //解析v-class
    class: function(node, vm, exp) {
        this.bind(node, vm, exp, 'class');
    },

    bind: function(node, vm, exp, dir) {
        //得到更新节点的函数
        var updaterFn = updater[dir + 'Updater'];
        //调用函数更新节点
        updaterFn && updaterFn(node, this._getVMVal(vm, exp));

        //为表达式创建一个对应的watcher，实现节点的更新显示
        new Watcher(vm, exp, function(value, oldValue) {//当表达式的一个属性值变化时回调
            //更新页面中指定的节点
            updaterFn && updaterFn(node, value, oldValue);
        });
    },

    // 事件处理
    eventHandler: function(node, vm, exp, dir) {
        //得到事件类型名:click
        var eventType = dir.split(':')[1],
            //从methods中得到事件回调函数
            fn = vm.$options.methods && vm.$options.methods[exp];
        //判断如果事件名以及回调函数是否都存在
        if (eventType && fn) {
            //给节点绑定指定事件名和回调函数(强制绑定this(vm))的dom事件监听
            node.addEventListener(eventType, fn.bind(vm), false);
        }
    },

    _getVMVal: function(vm, exp) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    },

    _setVMVal: function(vm, exp, value) {
        var val = vm._data;
        exp = exp.split('.');
        exp.forEach(function(k, i) {
            // 非最后一个key，更新val的值
            if (i < exp.length - 1) {
                val = val[k];
            } else {
                val[k] = value;
            }
        });
    }
};

//包含多个更新节点的方法的工具对象
var updater = {
    //更新节点的textContent属性值
    textUpdater: function(node, value) {
        node.textContent = typeof value == 'undefined' ? '' : value;
    },
    //更新节点的innerHTML属性值
    htmlUpdater: function(node, value) {
        node.innerHTML = typeof value == 'undefined' ? '' : value;
    },
    //更新节点的className属性值
    classUpdater: function(node, value, oldValue) {
        //静态class属性的值
        var className = node.className
        //将动态class与静态的class属性值进行合并并保存到新的className属性值
        node.className = className + (className?" ":"" )+ value;
    },
    //更新节点的value属性值
    modelUpdater: function(node, value, oldValue) {
        node.value = typeof value == 'undefined' ? '' : value;
    }
};