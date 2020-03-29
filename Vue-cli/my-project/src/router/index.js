import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/page/home'
import Detail from '@/page/detail'


import HelloWorld from '@/components/HelloWorld'
import Demo2 from '@/pages/demo2/index.vue'
import Demo1 from '@/pages/demo1/index.vue'
import Demo3 from '@/pages/demo3/index.vue'
import Demo4 from '@/pages/demo4/index.vue'
import Demo5 from '../pages/demo5/index.vue'
import Demo6 from '@/pages/demo6/index.vue'
import Demo7 from '@/pages/demo7/index.vue'
import Demo8 from '@/pages/demo8/index.vue'
import Demo9 from '@/pages/demo9/index.vue'
import Demo10 from '@/pages/demo10/index.vue'
import Demo12 from '@/pages/demo12/index.vue'
import Demo11 from '@/pages/demo11/index.vue'
import Demo13 from '@/pages/demo13/index.vue'
import Demo14 from '@/pages/demo14/index.vue'
import Demo15 from '@/pages/demo15/index.vue'
import JT from '../look/test/test.vue'
import JT1 from '../look/test/test1.vue'
import showBlog from '../components/showBlog.vue'
import addBlog from '../components/addBlog.vue'
import singleBlog from '../components/singleBlog.vue'
Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/showBlog',
      name: 'showBlog',
      component: showBlog
    },
    {
      path: '/addBlog',
      name: 'addBlog',
      component: addBlog
    },
    {
      path: '/singleBlog/:id',
      name: 'singleBlog',
      component: singleBlog
    },

    {
      path: '/demo2',
      name: 'demo2',
      component: Demo2,
    },
    {
      path: '/demo1',
      name: 'demo1',
      component: Demo1,
    },
    {
      path: '/demo3',
      name: 'demo3',
      component: Demo3,
    },
    {
      path: '/demo4',
      name: 'demo4',
      component: Demo4,
    },
    {
      path: '/JT',
      name: 'JT',
      component: JT,
    },
    {
      path: '/demo5',
      name: 'demo5',
      component: Demo5,
    },
    {
      path: '/JT1',
      name: 'JT1',
      component: JT1,
    },
    {
      path: '/demo6',
      name: 'demo6',
      component: Demo6,
    },
    {
      path: '/demo7',
      name: 'demo7',
      component: Demo7,
    },
    {
      path: '/demo8',
      name: 'demo8',
      component: Demo8,
    },
    {
      path: '/demo9',
      name: 'demo9',
      component: Demo9,
    },
    {
      path: '/demo10',
      name: 'demo10',
      component: Demo10,
    },
    {
      path: '/demo11',
      name: 'demo11',
      component: Demo11,
    },
    {
      path: '/demo12',
      name: 'demo12',
      component: Demo12,
    },
    {
      path: '/demo13',
      name: 'demo13',
      component: Demo13,
    },
    {
      path: '/demo14',
      name: 'demo14',
      component: Demo14,
    },
    {
      path: '/demo15',
      name: 'demo15',
      component: Demo15,
    },
    {
      path: '/home',
      name: 'Home',
      component: Home
    },
    {
      path: '/detail',
      name: 'Detail',
      component: Detail
    },

  ]
})
