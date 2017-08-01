import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Login from '@/view/login'
import Index from '@/view/index/index'
import Message from '@/view/index/message'
import Order from '@/view/Order/index'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',redirect: '/login', 
      name: 'Hello',
      component: Hello
    }
    ,
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path:'/index',component:Index,
      children:[
        {
          path:'message',
          component:Message
        }
      ]
    },
    {
      path:'/order',component:Index,
      children:[
        {
          path:'index',
          component:Order
        }
      ]
    }
  ]
})
