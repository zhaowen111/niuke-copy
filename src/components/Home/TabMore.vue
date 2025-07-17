<script>
import { nextTick } from 'vue'

export default {
  props: {
    //[{name:'亲子',va;ue:1,default:true}]
    tabs: Array,
    activeClass: String,
  },
  data() {
    return {
      activeTabValue: null,
      activeIndex: -1,
      underlineWidth: 0,
      underlineLeft: 0,
    }
  },
  computed: {
    underlineStyle() {
      return {
        transition: 'all 0.2s ease',
        width: `${this.underlineWidth}px`,
        left: `${this.underlineLeft}px`,
      }
    },
  },
  mounted() {
    this.init()
  },
  watch: {
    async 'tabs.length'() {
      await nextTick()
      const [tab, index] = this.getActiveTab(this.activeTabValue)
      //如果激活的tab不存在了，直接初始化
      if (!tab) return this.init()
      const target = this.$refs[tab.value][0]
      this.updateUnderline(index, target)
    },
  },
  methods: {
    init() {
      let defaultIndex = null
      //获取default字段为true的最后一个tab
      const defaultTab = this.tabs.filter((tab, index) => {
        //如果defaultIndex还为空，则为它赋值
        if (tab.default && !defaultIndex) {
          defaultIndex = index
        }
        return tab.default
      })[0]

      if (defaultTab) {
        this.change(defaultTab, defaultIndex)
      }
    },
    change(tab, index) {
      //获取激活元素
      let target = this.$refs[tab.value]
      if (Array.isArray(target)) target = target[0]

      //滚动到激活元素
      if (target) {
        target.scrollIntoView({ inline: 'center' })
        this.updateUnderline(index, target)
      }

      this.activeTabValue = tab.value //切换激活元素
      this.activeIndex = index
      this.$emit('change', tab)
    },
    updateUnderline(index, target) {
      //设置下划线动画
      const direction = index > this.activeIndex ? 'right' : 'left'
      if (direction === 'right') {
        this.underlineWidth = target.offsetWidth
        setTimeout(() => {
          this.underlineLeft = target.offsetLeft
        }, 10)
      } else {
        this.underlineLeft = target.offsetLeft
        setTimeout(() => {
          this.underlineWidth = target.offsetWidth
        }, 10)
      }
    },
    getActiveTab(tabValue) {
      let index = null
      let tab = this.tabs.filter((tab, i) => {
        const result = tab.value === tabValue
        if (result) {
          index = i
        }
        return result
      })[0]
      return [tab, index]
    },
  },
}
</script>
<template>
  <div class="Tab-More-Container no-scrollbar flex h-[40px] items-center overflow-x-scroll">
    <div class="Tab-More-Content relative flex h-full items-center justify-start pr-4">
      <div
        :key="tab.value"
        class="mx-3.5 flex h-full items-center overflow-hidden text-nowrap text-[#545859]"
        :class="[tab.value === activeTabValue && 'active', activeClass]"
        v-for="(tab, index) in tabs"
        @click="change(tab, index)"
        :ref="tab.value">
        {{ tab.name }}
      </div>
      <div :style="underlineStyle" class="absolute bottom-1 h-1.5 rounded-full bg-[#06f4ba]"></div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: black;
  font-weight: 600;
}
</style>
