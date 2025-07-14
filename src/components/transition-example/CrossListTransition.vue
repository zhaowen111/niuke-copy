<script>
import gsap from 'gsap'
//两个列表点击交换数据，实现位移动画
export default {
  props: {},
  data() {
    return {
      list1: [
        '苹果',
        '香蕉',
        '橙子',
        '草莓',
        '葡萄',
        '菠萝',
        '芒果',
        '猕猴桃',
        '蓝莓',
        '西瓜',
        '桃子',
        '梨',
        '樱桃',
        '柠檬',
        '椰子',
        '木瓜',
        '石榴',
        '李子',
        '哈密瓜',
        '火龙果',
      ],
      list2: [
        '披萨',
        '汉堡',
        '寿司',
        '面条',
        '炒饭',
        '沙拉',
        '三明治',
        '炸鸡',
        '牛排',
        '饺子',
        '热狗',
        '烤肉',
        '咖喱',
        '汤',
        '煎饼',
        '意面',
        '炒面',
        '炖菜',
        '烤鱼',
        '煎饺',
      ],
      empty1: -1,
      empty2: -2,
      duration: 300,
    }
  },
  methods: {
    async handleClick1(item, index) {
      this.exchangeItem(index, item, this.empty2, this.list1, this.list2)
    },
    async handleClick2(item, index) {
      this.exchangeItem(index, item, this.empty1, this.list2, this.list1)
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
  <div class="relative">
    <div class="list relative flex flex-wrap">
      <transition-group :duration name="list">
        <div
          @click="handleClick1(item, index)"
          :ref="item"
          class="itemmm m-[1.5%] w-[30%] bg-amber-200 text-center"
          :class="item"
          :key="item"
          v-for="(item, index) in list1">
          {{ item }}
        </div>
      </transition-group>
      <div class="m-[1.5%]" :ref="empty1"></div>
    </div>
    <div class="list relative flex flex-wrap">
      <transition-group :duration name="list">
        <div
          :ref="item"
          @click="handleClick2(item, index)"
          class="m-[1.5%] w-[30%] bg-amber-200 text-center"
          :key="item"
          v-for="(item, index) in list2">
          {{ item }}
        </div>
      </transition-group>
      <div class="m-[1.5%]" :ref="empty2"></div>
    </div>
  </div>
</template>
<style>
.list {
  border: 1px solid black;
}
.itemmm {
  transition: all;
}
</style>
