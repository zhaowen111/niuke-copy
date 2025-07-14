<script>
import gsap from 'gsap'
// 拖拽、
export default {
  props: {
    title: String,
    tip: String,
    deleteable: Boolean,
    //[{name:'内推',value:1,type:1,show:false}]
    tabs: Array,
  },
  data() {
    return {}
  },
  methods: {
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
    handleClick() {},
  },
}
</script>
<template>
  <div class="tab-area">
    <header class="my-2 flex items-center justify-start">
      <div class="mx-2 font-semibold">{{ title }}</div>
      <span class="text-[#545859]">{{ tip }}</span>
    </header>
    <div class="flex flex-wrap items-center justify-start">
      <div
        @click="handleClick"
        :key="tab.value"
        v-for="tab in tabs"
        class="custom-dashed-border mx-[1.5%] my-1 flex w-[30%] items-center justify-center py-1 text-[#333559]">
        {{ tab.name }}
        <div v-if="deleteable" @click="$emit('delete')" class=""></div>
      </div>
    </div>
  </div>
</template>
<style>
.custom-dashed-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23545859FF' stroke-width='1' stroke-dasharray='5%2c5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
}
</style>
