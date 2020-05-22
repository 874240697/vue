function Watcher(vm, exp, cb) {
    this.cb = cb;//更新界面的回调函数
    this.vm = vm;
    this.exp = exp; //表达式
    this.depIds = {}; //包含所有相关的dep的容器对象
    this.value = this.get(); //表达式初始值的保存
}

Watcher.prototype = {
    update: function() {
        this.run();
    },
    run: function() {
        var value = this.get();
        var oldVal = this.value;
        if (value !== oldVal) {
            this.value = value;
            //调用回调函数更新界面
            this.cb.call(this.vm, value, oldVal);
        }
    },
    addDep: function(dep) {
        //判断dep与watcher关系是否已经建立
        if (!this.depIds.hasOwnProperty(dep.id)) {
            //将watcher添加到dep
            dep.addSub(this);
            //将dep添加到watcher
            this.depIds[dep.id] = dep;
        }
    },
    //得到表达式的值，建立dep与watcher之间的关系
    get: function() {
        //给dep指定当前的watcher
        Dep.target = this;
        //获取表达式的值，内部调用建立dep与watcher之间的关系
        var value = this.getVMVal();
        Dep.target = null;
        return value;
    },

    //得到表达式对应的值
    getVMVal: function() {
        var exp = this.exp.split('.');
        var val = this.vm._data;
        exp.forEach(function(k) {
            val = val[k];
        });
        return val;
    }
};