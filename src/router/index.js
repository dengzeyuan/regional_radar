import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/pages/home'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: resolve => require(['../pages/radarEcharts/index.vue'], resolve),
        },
        {
          path: '/second',
          name: 'second',
          component: resolve => require(['../pages/radarD3/second.vue'], resolve),
          // children: [
          //   {
          //     path: 'secondlist',
          //     name: '第二页',
          //     component: Table
          //   }
          // ]
        },
        // {
        //   path: '/three',
        //   name: 'three',
        //   component: resolve => require(['../pages/foldToggle/index.vue'], resolve),
        // },
      ]
    }
  ]
})
