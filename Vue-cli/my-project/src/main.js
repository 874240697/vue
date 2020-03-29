// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/'
import VueResource from  'vue-resource'
import MintUi from 'mint-ui'
import 'mint-ui/lib/style.css'
import './config/rem'
Vue.use(VueResource);
Vue.use(MintUi);
Vue.config.productionTip = false
//自定义指令(全局的)
Vue.directive('rainbow',{
  bind(el,binding,vnode){
    el.style.color = '#' + Math.random().toString(16).slice(2,8);
  }
});

Vue.directive('limit',{
  bind(el,binding,vnode){

  }
});

//自定义过滤器(全局的)
Vue.filter('to-uppercase',function (value) {
  //这里的value接收了   <h3 v-rainbow>{{blog.title | to-uppercase}}</h3> 中blog.title
  //value就是接收 | 左边的值
  return value.toUpperCase();
});
// const routers =  new VueRouter({
//     routes:router,
//     mode:"history",//除去地址后面的“#”
// });
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
});

