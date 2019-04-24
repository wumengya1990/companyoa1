import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
  linkActiveClass:'on',
  mode:'history',
  routes: [
    {
      path: '/',
      name: 'indexhome',
      component:resolve => require(['@/components/indexhome'],resolve)
    },
    {
      path: '/indexNotice',
      name: 'indexNotice',
      component:resolve => require(['@/components/notice/indexNotice'],resolve),
      redirect:'/indexNotice/inbox',
      children:[
        {
          path: 'top',
          name: 'top',
          component:resolve => require(['@/components/notice/top'],resolve)
        },{
          path: 'leftMenu',
          name: 'leftMenu',
          component:resolve => require(['@/components/notice/leftMenu'],resolve)
        },{
          path: 'ceshi',
          name: 'ceshi',
          component:resolve => require(['@/components/notice/ceshi'],resolve)
        },{
          path: 'inbox',
          name: 'inbox',
          component:resolve => require(['@/components/notice/inbox'],resolve),
          children:[
            {
              path: 'inboxdetails',
              name: 'inboxdetails',
              component:resolve => require(['@/components/notice/details'],resolve)
            }
          ]
        },{
          path: 'outbox',
          name: 'outbox',
          component:resolve => require(['@/components/notice/outbox'],resolve),
          children:[
            {
              path: 'newNotice',
              name: 'newNotice',
              component:resolve => require(['@/components/notice/newNotice'],resolve)
            },{
              path: 'outboxdetails',
              name: 'outboxdetails',
              component:resolve => require(['@/components/notice/details'],resolve)
            }
          ]
        }
        
      ]
    },{
      path: '/indexPlan',
      name: 'indexPlan',
      component:resolve => require(['@/components/plan/indexPlan'],resolve),
      redirect:'/indexPlan/see',
      children:[
        {
          path: 'top',
          name: 'top',
          component:resolve => require(['@/components/plan/top'],resolve)
        },{
          path: 'see',
          name: 'see',
          component:resolve => require(['@/components/plan/see'],resolve),
          children:[
            {
              path:'seedetails',
              name:'seedetails',
              component:resolve => require(['@/components/plan/details'],resolve)
            }
          ]
        },{
          path: 'formulate',
          name: 'formulate',
          component:resolve => require(['@/components/plan/formulate'],resolve),
          children:[
            {
              path:'formulatedetails',
              name:'formulatedetails',
              component:resolve => require(['@/components/plan/details'],resolve)
            }
          ]
        }
      ]
    },
    {
      path:'/indexProclamation',
      name:'indexProclamation',
      component:resolve => require(['@/components/proclamation/indexProclamation'],resolve),
      redirect:'/indexProclamation/receive',
      children:[
        {
          path:'receive',
          name:'receive',
          component:resolve => require(['@/components/proclamation/receive'],resolve),
          children:[
            {
              path:'receivedetails',
              name:'receivedetails',
              component:resolve => require(['@/components/proclamation/details'],resolve)
            }
          ]
        },
        {
          path:'sendout',
          name:'sendout',
          component:resolve => require(['@/components/proclamation/sendout'],resolve),
          children:[
            {
              path:'sendoutdetails',
              name:'sendoutdetails',
              component:resolve => require(['@/components/proclamation/details'],resolve)
            },
            {
              path: 'newProclamation.vue',
              name: 'newProclamation.vue',
              component:resolve => require(['@/components/proclamation/newProclamation.vue'],resolve),
            }
          ]
        }
      ]
      
    }
    
    
  ]
})
