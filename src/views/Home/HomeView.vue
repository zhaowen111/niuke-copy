<script>
import TabMore from '@/packages/Tabs/TabMore.vue'
import menuImg from '@/assets/menu.svg?no-inline'
import DialogCard from '../../packages/Dialog/DialogCard.vue'
import TabArea from './TabArea.vue'
import gsap from 'gsap'

const defaultTabs = [
  { value: 1, name: '关注', type: 0, default: true },
  { value: 2, name: '推荐', type: 0 },
  { value: 3, name: '秋招季', type: 0 },
  { value: 4, name: '热榜', type: 0 },
]
const tabType = {
  10001: { title: '我的', value: 10001, tip: '可拖拽调整tab顺序', tabs: [] },
  10002: { title: '看板块', value: 10002, tip: '选择感兴趣的板块', tabs: [] },
  10003: { title: '看岗位', value: 10003, tip: '选择感兴趣的职位', tabs: [] },
}
export default {
  components: { TabMore, DialogCard, TabArea },
  data() {
    return {
      allTabItems: [
        // 看板块（type:1）
        { value: 101, name: '内推', type: 10002, has: true },
        { value: 102, name: '职场', type: 10002, has: true },
        { value: 103, name: '求职攻略', type: 10002, has: true },
        { value: 104, name: '知识分享', type: 10002, has: true },
        { value: 105, name: '薪资待遇', type: 10002, has: false },
        { value: 106, name: '面经', type: 10002, has: false },

        // 看岗位（type:2）
        { value: 201, name: '前端', type: 10003, has: false },
        { value: 202, name: 'Java', type: 10003, has: false },
        { value: 203, name: 'C++', type: 10003, has: false },
        { value: 204, name: '产品经理', type: 10003, has: false },
        { value: 205, name: '算法', type: 10003, has: false },
        { value: 206, name: '运营', type: 10003, has: false },
        { value: 207, name: '测试', type: 10003, has: false },
        { value: 208, name: '数据分析师', type: 10003, has: false },
        { value: 209, name: 'Web前端', type: 10003, has: false },
        { value: 210, name: '财务', type: 10003, has: false },
        { value: 211, name: '运维', type: 10003, has: false },
        { value: 212, name: '后端', type: 10003, has: false },
        { value: 213, name: '安卓', type: 10003, has: false },
        { value: 214, name: '自动化', type: 10003, has: false },
        { value: 215, name: '大数据开发', type: 10003, has: false },
      ],
      tabAreaData: [],
      menuStyle: { backgroundImage: `url('${menuImg}')` },
      show: false,
      duration: 0.3,
      targets: {},
    }
  },
  computed: {
    tabs() {
      return defaultTabs.concat(this.allTabItems.filter(item => item.has))
    },
  },
  methods: {
    handleOpen() {
      console.log(111)

      const result = JSON.parse(JSON.stringify(tabType))
      this.allTabItems.forEach(item => {
        if (item.has) {
          result[10001].tabs.push(item)
        } else {
          result[item.type].tabs.push(item)
        }
      })
      const my = result[10001]
      delete result[10001]
      this.tabAreaData = [my, result]
      console.log(this.tabAreaData)
    },
    handleClick() {
      this.show = !this.show
    },
    async handleClickItem(tab, index, cur, target) {
      this.targets[tab.type] = target
      tab.has = true

      this.tabAreaData[1][tab.type].tabs.splice(index, 1)
      await this.move(cur, this.targets[tabType[10001].value], this.duration)
      this.tabAreaData[0].tabs.push(tab)
    },
    async handleDelete(tab, index, cur, target) {
      this.targets[tabType[10001]] = target
      tab.has = false
      this.tabAreaData[0].tabs.splice(index, 1)
      await this.move(cur, this.targets[tab.type], this.duration)
      this.tabAreaData[1][tab.type].tabs.push(tab)
    },
    handleInit(ref, target) {
      this.targets[ref] = target
    },
    async exchangeItem(itemIndex, sourceRef, targetRef, sourceList, targetList) {
      const sourceData = sourceList.splice(itemIndex, 1)[0]
      const target = this.$refs[targetRef]
      const cur = this.$refs[sourceRef][0]
      await this.move(cur, target, this.duration)
      targetList.push(sourceData)
    },
    async move(el, target, duration) {
      const elRect = el.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const x = targetRect.left - elRect.left
      const y = targetRect.top - elRect.top
      console.log(x, y)
      console.log(el, target)
      return gsap.to(el, {
        x,
        y,
        duration,
      })
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
    <DialogCard @open="handleOpen" title="编辑板块" :show="show" @closePage="handleClick">
      <TabArea
        v-if="tabAreaData.length"
        :extraRef="tabAreaData[0].value"
        :key="tabAreaData[0].value"
        v-bind="tabAreaData[0]"
        dashed
        deleteable
        @delete="handleDelete"
        @init="handleInit"></TabArea>
      <template v-if="tabAreaData.length">
        <TabArea
          :key="typedTab.value"
          v-for="typedTab in tabAreaData[1]"
          v-bind="typedTab"
          @clickItem="handleClickItem"
          @init="handleInit"
          :extraRef="typedTab.value"></TabArea>
      </template>
    </DialogCard>
  </div>
</template>
