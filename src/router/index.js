import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import memo from '@/components/memo'
import pepe from '@/components/pepe'
import tase from '@/components/tase'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/memo',
      name: 'memo',
      component: memo
    },
    {
      path: '/pepe',
      name: 'pepe',
      component: pepe
    },
    {
      path: '/tase',
      name: 'tase',
      component: tase
    }
  ]
})
