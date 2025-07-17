import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import AnimationExp from '@/components/transition-example/AnimationExp.vue'
import Test from '@/views/QuestionBank/Test.vue'
import { defaultTabs, allTabItems } from '@/assets/mock/tabData'
import NotFound from '@/views/NotFound.vue'

export const defaultHomeChildPath = 'Recommend'

const routes = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    component: HomeView,
    children: [
      {
        path: 'Attention', // 去掉了开头的斜杠
        component: () => import('@/views/Home/Children/Attention.vue')
      },
      {
        path: 'Recommend',
        component: () => import('@/views/Home/Children/Recommend.vue')
      },
      {
        path: 'AutumnRecruitment',
        component: () => import('@/views/Home/Children/AutumnRecruitment.vue')
      },
      {
        path: 'HotList',
        component: () => import('@/views/Home/Children/HotList.vue')
      },

      // 类型 10002 的路由
      {
        path: 'InternalReferral',
        component: () => import('@/views/Home/Children/InternalReferral.vue')
      },
      {
        path: 'Workplace',
        component: () => import('@/views/Home/Children/Workplace.vue')
      },
      {
        path: 'JobHunting',
        component: () => import('@/views/Home/Children/JobHunting.vue')
      },
      {
        path: 'KnowledgeSharing',
        component: () => import('@/views/Home/Children/KnowledgeSharing.vue')
      },
      {
        path: 'Salary',
        component: () => import('@/views/Home/Children/Salary.vue')
      },
      {
        path: 'Interview',
        component: () => import('@/views/Home/Children/Interview.vue')
      },

      // 类型 10003 的路由
      {
        path: 'FrontEnd',
        component: () => import('@/views/Home/Children/FrontEnd.vue')
      },
      {
        path: 'Java',
        component: () => import('@/views/Home/Children/Java.vue')
      },
      {
        path: 'Cpp',
        component: () => import('@/views/Home/Children/Cpp.vue')
      },
      {
        path: 'ProductManager',
        component: () => import('@/views/Home/Children/ProductManager.vue')
      },
      {
        path: 'Algorithm',
        component: () => import('@/views/Home/Children/Algorithm.vue')
      },
      {
        path: 'Operation',
        component: () => import('@/views/Home/Children/Operation.vue')
      },
      {
        path: 'Testing',
        component: () => import('@/views/Home/Children/Testing.vue')
      },
      {
        path: 'DataAnalyst',
        component: () => import('@/views/Home/Children/DataAnalyst.vue')
      },
      {
        path: 'WebFrontEnd',
        component: () => import('@/views/Home/Children/WebFrontEnd.vue')
      },
      {
        path: 'Finance',
        component: () => import('@/views/Home/Children/Finance.vue')
      },
      {
        path: 'DevOps',
        component: () => import('@/views/Home/Children/DevOps.vue')
      },
      {
        path: 'BackEnd',
        component: () => import('@/views/Home/Children/BackEnd.vue')
      },
      {
        path: 'Android',
        component: () => import('@/views/Home/Children/Android.vue')
      },
      {
        path: 'Automation',
        component: () => import('@/views/Home/Children/Automation.vue')
      },
      {
        path: 'BigDataDev',
        component: () => import('@/views/Home/Children/BigDataDev.vue')
      }
      ,
      {
        path: '404',
        component: NotFound,
      }
    ]
  },
  {
    path: '/about',
    component: () => import('../views/Business/AboutView.vue'),
  },
  {
    path: '/animation',
    component: AnimationExp,
  },
  {
    path: '/test',
    component: Test,
  },

  // { path: '/home:pathMatch(.*)*', redirect: '/home/404' },
  //404，匹配所有未匹配到的路由
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]
const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes
})


router.beforeEach((to, from) => {
  return to.fullPath !== from.fullPath //名字相同则不重复导航
})
export default router
