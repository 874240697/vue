// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from "./router"
import store from "./store"
import {Button} from "mint-ui"
import "./mock/mockServer" //加载mockServer即可
//注册全局组件标签
Vue.component(Button.name,Button); //<mt-button>
Vue.config.productionTip = false;
/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router,
  store
});
