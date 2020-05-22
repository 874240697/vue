function Observer(data) {
    //保存data
    this.data = data;
    //开始对data监视
    this.walk(data);
}

Observer.prototype = {
    walk: function(data) {
        //保存Observer对象
        var me = this;
        //遍历data中所有属性
        Object.keys(data).forEach(function(key) {
            //对指定的属性实现响应式的数据绑定
            me.defineReactive(me.data, key, data[key]);
        });
    },
    defineReactive: function(data, key, val) {
        //创建属性对应的dep对象
        var dep = new Dep();
        //通过间接递归调用实现对data中所有层次属性的数据劫持
        var childObj = observe(val);
        //给data重新定义属性、添加get/set方法
        Object.defineProperty(data, key, {
            enumerable: true, // 可枚举
            configurable: false, // 不能再define
            get: function() {//返回值，建立Dep与Watcher之间的关系
                if (Dep.target) {
                    dep.depend(); //建立关系
                }
                return val;
            },
            set: function(newVal) {//监视key属性值的变化，更新页面
                if (newVal === val) {
                    return;
                }
                val = newVal;
                // 新的值是object的话，进行监听
                childObj = observe(newVal);
                // 通知所有相关的订阅者
                dep.notify();
            }
        });
    }
};

function observe(value, vm) {
    //被观察的必须是一个对象
    if (!value || typeof value !== 'object') {
        return;
    }
    // 创建一个Observer对象实例
    return new Observer(value);
}


var uid = 0;

function Dep() {
    this.id = uid++;
    this.subs = [];
}

Dep.prototype = {
    //添加watcher到dep中
    addSub: function(sub) {
        this.subs.push(sub);
    },
    //建立dep与watcher关系的
    depend: function() {
        Dep.target.addDep(this);
    },

    removeSub: function(sub) {
        var index = this.subs.indexOf(sub);
        if (index != -1) {
            this.subs.splice(index, 1);
        }
    },

    notify: function() {
        //遍历所有watcher，通知watcher更新
        this.subs.forEach(function(sub) {
            sub.update();
        });
    }
};

Dep.target = null;