import Vue from 'vue'
import Router from 'vue-router'
import Login from '../views/Login'
import HomePage from "../views/HomePage"
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/homepage',
      name:'homepage',
      component:HomePage
    },
    {
      redirect:'/login',
      path:'/'
    }
  ]
})
