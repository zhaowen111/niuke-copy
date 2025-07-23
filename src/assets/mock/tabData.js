import { defaultHomeChildPath, defaultThreeChildPath, threeRoutes } from "@/router"

export const MyTabId = 10001
export const tabType = {
  [MyTabId]: { title: '我的', value: 10001, tip: '可拖拽调整tab顺序', tabs: [] },
  10002: { title: '看板块', value: 10002, tip: '选择感兴趣的板块', tabs: [] },
  10003: { title: '看岗位', value: 10003, tip: '选择感兴趣的职位', tabs: [] },
}


export const defaultTabs = [
  { value: '/Attention', name: '关注', type: 10001, },
  { value: '/Recommend', name: '推荐', type: 10001, },
  { value: '/AutumnRecruitment', name: '秋招季', type: 10001, },
  { value: '/HotList', name: '热榜', type: 10001, },
]

defaultTabs.forEach(item => {
  item.value.slice(1) === defaultHomeChildPath && (item.default = true)
})

export const allTabItems = [
  // 看板块（type:1）
  { value: '/InternalReferral', name: '内推', type: 10002, has: true },
  { value: '/Workplace', name: '职场', type: 10002, has: true },
  { value: '/JobHunting', name: '求职攻略', type: 10002, has: true },
  { value: '/KnowledgeSharing', name: '知识分享', type: 10002, has: true },
  { value: '/Salary', name: '薪资待遇', type: 10002, has: false },
  { value: '/Interview', name: '面经', type: 10002, has: false },

  // 看岗位（type:2）
  { value: '/FrontEnd', name: '前端', type: 10003, has: false },
  { value: '/Java', name: 'Java', type: 10003, has: false },
  { value: '/Cpp', name: 'C++', type: 10003, has: false },
  { value: '/ProductManager', name: '产品经理', type: 10003, has: false },
  { value: '/Algorithm', name: '算法', type: 10003, has: false },
  { value: '/Operation', name: '运营', type: 10003, has: false },
  { value: '/Testing', name: '测试', type: 10003, has: false },
  { value: '/DataAnalyst', name: '数据分析师', type: 10003, has: false },
  { value: '/WebFrontEnd', name: 'Web前端', type: 10003, has: false },
  { value: '/Finance', name: '财务', type: 10003, has: false },
  { value: '/DevOps', name: '运维', type: 10003, has: false },
  { value: '/BackEnd', name: '后端', type: 10003, has: false },
  { value: '/Android', name: '安卓', type: 10003, has: false },
  { value: '/Automation', name: '自动化', type: 10003, has: false },
  { value: '/BigDataDev', name: '大数据开发', type: 10003, has: false },
]



export const bottomTabs = [
  { name: '首页', value: '/home', iconName: 'shouye' },
  { name: '名企', value: '/about', iconName: 'qiye' },
  { name: '职位', value: '/animation', iconName: 'zhiwei' },
  { name: '题库', value: '/test', iconName: 'tiku' },
  { name: '我的', value: '/haha', iconName: 'wode', badge: 1 },
]




export const threeTabs = threeRoutes[0].children.map(item => {
  return { value: "/" + item.path, name: item.path, default: item.value === defaultThreeChildPath };
})
threeTabs[0].default = true;
console.log(threeTabs);
