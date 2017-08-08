import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
// 登录
import Login from '@/view/login'
/*首页(message个人信息、index.vue是导航跟头部)*/
import Index from '@/view/index/index'
import Message from '@/view/index/message'
import Readme from '@/view/index/readme'
/*订单管理*/
import Order from '@/view/Order/index'
/*会员管理*/
import VIP from '@/view/Vip/associator';
//人事管理
import worker from '@/view/Staff/worker'
import staff_add from '@/view/Staff/staff_add'
// 商品管理
import Goods from '@/view/Foods/goods'
// 成本管理
import Cost from '@/view/Cost/index'
// 库存管理
import Stock from '@/view/Stock/stock'


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
      meta: {
          breadcrumbName: "首页"
      },
      children:[
        {
          path:'message',
          component:Message,
          meta: {
            breadcrumbName: "个人信息"
          }
        },
        {
          path:'readme',
          component:Readme,
          meta: {
            breadcrumbName: "系统说明"
          }
        }
      ]
    },
    /*订单管理*/
    {
      path:'/order',component:Index,
      meta: {
          breadcrumbName: "首页"
      },
      children:[
        {
          path:'index',
          component:Order,
          meta: {
            breadcrumbName: "管理订单"
          }
        }
      ]
    },

     /*会员管理*/
    {
      path: '/vip', component: Index,
      meta: {
        breadcrumbName: "首页"
      },
      children:[{
        path: 'associator',
        component: VIP,
        meta: {
          breadcrumbName: "会员管理"
        }
      }]
    },

      //人事管理
    {
      path:'/renshi',component:Index,
      meta: {
            breadcrumbName: "首页"
      },
      children:[
        {path:'worker',component:worker,
          meta: {
            breadcrumbName: "管理员工"
          }
       },
        {path:'staff_add',component:staff_add,
          meta: {
            breadcrumbName: "添加员工"
          }
        }
      ]       
    },
    // 商品管理
    {
      path:'/foods',component:Index,
      meta: {
            breadcrumbName: "首页"
      },
      children:[{
        path: 'goods',component: Goods,
        meta: {
            breadcrumbName: "商品管理"
          }
      }]
    },
    
    // 库存管理
    {
      path:'/stock',component:Index,
      meta: {
          breadcrumbName: "首页"
      },
      children:[
        {
          path:'stock',
          component:Stock,
          meta: {
            breadcrumbName: "库存管理"
          }
        }
      ]
    },

    // 成本管理
    {
      path:'/cost',component:Index,meta: {
            breadcrumbName: "首页"
          },
      children:[
        {
          path:'index',
          component:Cost,
          meta: {
            breadcrumbName: "成本管理"
          }
        }
      ]
    }



  ]
})
