<script>
import TabMore from '@/packages/Tabs/TabMore.vue'
import menuImg from '@/assets/menu.svg?no-inline'
import Dialog from '../../packages/Dialog/Dialog.vue'
import TabArea from './TabArea.vue'

const defaultTabs = [
  { value: 1, name: '关注', type: 0, default: true },
  { value: 2, name: '推荐', type: 0 },
  { value: 3, name: '秋招季', type: 0 },
  { value: 4, name: '热榜', type: 0 },
]
const tabType = {
  0: { title: '我的', value: 0, tip: '可拖拽调整tab顺序', tabs: [] },
  1: { title: '看板块', value: 1, tip: '选择感兴趣的板块', tabs: [] },
  2: { title: '看岗位', value: 2, tip: '选择感兴趣的职位', tabs: [] },
}
export default {
  components: { TabMore, Dialog, TabArea },
  data() {
    return {
      allTabItems: [
        // 看板块（type:1）
        { value: 101, name: '内推', type: 1, has: true },
        { value: 102, name: '职场', type: 1, has: true },
        { value: 103, name: '求职攻略', type: 1, has: true },
        { value: 104, name: '知识分享', type: 1, has: true },
        { value: 105, name: '薪资待遇', type: 1, has: true },
        { value: 106, name: '面经', type: 1, has: false },

        // 看岗位（type:2）
        { value: 201, name: '前端', type: 2, has: false },
        { value: 202, name: 'Java', type: 2, has: false },
        { value: 203, name: 'C++', type: 2, has: false },
        { value: 204, name: '产品经理', type: 2, has: false },
        { value: 205, name: '算法', type: 2, has: false },
        { value: 206, name: '运营', type: 2, has: false },
        { value: 207, name: '测试', type: 2, has: false },
        { value: 208, name: '数据分析师', type: 2, has: false },
        { value: 209, name: 'Web前端', type: 2, has: false },
        { value: 210, name: '财务', type: 2, has: false },
        { value: 211, name: '运维', type: 2, has: false },
        { value: 212, name: '后端', type: 2, has: false },
        { value: 213, name: '安卓', type: 2, has: false },
        { value: 214, name: '自动化', type: 2, has: false },
        { value: 215, name: '大数据开发', type: 2, has: false },
      ],

      menuStyle: { backgroundImage: `url('${menuImg}')` },
      show: false,
    }
  },
  computed: {
    tabs() {
      return defaultTabs.concat(this.allTabItems.filter(item => item.has))
    },
    tabAreaData() {
      const result = JSON.parse(JSON.stringify(tabType))
      this.allTabItems.forEach(item => {
        if (item.has) {
          result[0].tabs.push(item)
        } else {
          result[item.type].tabs.push(item)
        }
      })
      return result
    },
  },
  methods: {
    handleClick() {
      this.show = !this.show
    },
  },
}
</script>

<template>
  <div>
    <div class="search-box flex h-[40px] items-center bg-gray-300">搜索</div>
    <div class="relative">
      <TabMore :tabs />
      <div
        @click="handleClick"
        class="absolute top-0 right-0 flex h-full w-[60px] items-center justify-end bg-linear-to-r from-[#fff0] to-[#fff] to-70%">
        <div :style="menuStyle" class="mb-0.5 h-[15px] w-[15px] bg-contain"></div>
      </div>
    </div>
    <Dialog title="编辑板块" :show="show" @closePage="handleClick">
      <TabArea v-for="typedTab in tabAreaData" v-bind="typedTab"></TabArea>
    </Dialog>
  </div>
</template>
