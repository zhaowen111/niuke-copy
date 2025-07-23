import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/Home/HomeView.vue'
import AnimationExp from '@/components/transition-example/AnimationExp.vue'
import Test from '@/views/QuestionBank/Test.vue'
import NotFound from '@/views/NotFound.vue'

// 静态导入所有组件
import Attention from '@/views/Home/Children/Attention.vue'
import Recommend from '@/views/Home/Children/Recommend.vue'
import AutumnRecruitment from '@/views/Home/Children/AutumnRecruitment.vue'
import HotList from '@/views/Home/Children/HotList.vue'
import InternalReferral from '@/views/Home/Children/InternalReferral.vue'
import Workplace from '@/views/Home/Children/Workplace.vue'
import JobHunting from '@/views/Home/Children/JobHunting.vue'
import KnowledgeSharing from '@/views/Home/Children/KnowledgeSharing.vue'
import Salary from '@/views/Home/Children/Salary.vue'
import Interview from '@/views/Home/Children/Interview.vue'
import FrontEnd from '@/views/Home/Children/FrontEnd.vue'
import Java from '@/views/Home/Children/Java.vue'
import Cpp from '@/views/Home/Children/Cpp.vue'
import ProductManager from '@/views/Home/Children/ProductManager.vue'
import Algorithm from '@/views/Home/Children/Algorithm.vue'
import Operation from '@/views/Home/Children/Operation.vue'
import Testing from '@/views/Home/Children/Testing.vue'
import DataAnalyst from '@/views/Home/Children/DataAnalyst.vue'
import WebFrontEnd from '@/views/Home/Children/WebFrontEnd.vue'
import Finance from '@/views/Home/Children/Finance.vue'
import DevOps from '@/views/Home/Children/DevOps.vue'
import BackEnd from '@/views/Home/Children/BackEnd.vue'
import Android from '@/views/Home/Children/Android.vue'
import Automation from '@/views/Home/Children/Automation.vue'
import BigDataDev from '@/views/Home/Children/BigDataDev.vue'
import AddPost from '@/views/Home/Extra/AddPost/AddPost.vue'
import AboutView from '../views/Business/AboutView.vue'
import HomeSearch from '@/views/Home/Extra/HomeSearch/HomeSearch.vue'


import Page1 from '@/views/Business/Children/page1.vue'
import Page2 from '@/views/Business/Children/page2.vue'
import Page3 from '@/views/Business/Children/page3.vue'
import Page4 from '@/views/Business/Children/page4.vue'
import Page5 from '@/views/Business/Children/page5.vue'
import Page6 from '@/views/Business/Children/page6.vue'
import Page7 from '@/views/Business/Children/page7.vue'
import Page8 from '@/views/Business/Children/page8.vue'
import Page9 from '@/views/Business/Children/page9.vue'
import Page10 from '@/views/Business/Children/page10.vue'

export const defaultHomeChildPath = 'Attention'
export const defaultHomePath = '/home'
const routes = [
  {
    path: '/',
    redirect: defaultHomePath
  },
  {
    path: defaultHomePath,
    component: HomeView,
    children: [
      { path: 'Attention', component: Attention },
      { path: 'Recommend', component: Recommend },
      { path: 'AutumnRecruitment', component: AutumnRecruitment },
      { path: 'HotList', component: HotList },
      { path: 'InternalReferral', component: InternalReferral },
      { path: 'Workplace', component: Workplace },
      { path: 'JobHunting', component: JobHunting },
      { path: 'KnowledgeSharing', component: KnowledgeSharing },
      { path: 'Salary', component: Salary },
      { path: 'Interview', component: Interview },
      { path: 'FrontEnd', component: FrontEnd },
      { path: 'Java', component: Java },
      { path: 'Cpp', component: Cpp },
      { path: 'ProductManager', component: ProductManager },
      { path: 'Algorithm', component: Algorithm },
      { path: 'Operation', component: Operation },
      { path: 'Testing', component: Testing },
      { path: 'DataAnalyst', component: DataAnalyst },
      { path: 'WebFrontEnd', component: WebFrontEnd },
      { path: 'Finance', component: Finance },
      { path: 'DevOps', component: DevOps },
      { path: 'BackEnd', component: BackEnd },
      { path: 'Android', component: Android },
      { path: 'Automation', component: Automation },
      { path: 'BigDataDev', component: BigDataDev },
      { path: '404', component: NotFound }
    ]
  },
  {
    path: '/HomeSearch',
    name: "HomeSearch",
    component: HomeSearch,
    meta: { fullscreen: true }
  },
  {
    path: '/AddPost',
    name: "AddPost",
    component: AddPost,
    meta: { fullscreen: true }
  },

  {
    path: '/animation',
    component: AnimationExp,
  },
  {
    path: '/test',
    component: Test,
  },
  { path: '/:pathMatch(.*)*', name: 'NotFound', component: NotFound },
]


export const defaultThreeChildPath = 'page1'
export const threeRoutes = [
  {
    path: '/about',
    component: AboutView,
    children: [
      { path: 'page1', component: Page1 },
      { path: 'page2', component: Page2 },
      { path: 'page3', component: Page3 },
      { path: 'page4', component: Page4 },
      { path: 'page5', component: Page5 },
      { path: 'page6', component: Page6 },
      { path: 'page7', component: Page7 },
      { path: 'page8', component: Page8 },
      { path: 'page9', component: Page9 },
      { path: 'page10', component: Page10 },
    ]
  },
]

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    ...threeRoutes,
    ...routes
  ]
})

router.beforeEach((to, from) => {
  return to.fullPath !== from.fullPath // 名字相同则不重复导航
})

export default router