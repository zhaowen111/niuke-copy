<script>
// 拖拽、
export default {
  props: {
    title: String,
    tip: String,
    deleteable: Boolean,
    extraRef: [String, Number],
    dashed: {
      type: Boolean,
      default: true,
    },
    //[{name:'内推',value:1,type:1,show:false}]
    tabs: Array,
    max: Number,
  },
  data() {
    return {}
  },
  mounted() {
    this.$emit('init', this.extraRef, this.$refs[this.extraRef])
  },
  methods: {
    handleClick(tab, index) {
      const cur = this.$refs[tab.value][0]
      const target = this.$refs[this.extraRef]
      this.$emit('clickItem', tab, index, cur, target)
    },
    handleDelete(tab, index) {
      const cur = this.$refs[tab.value][0]
      const target = this.$refs[this.extraRef]
      this.$emit('delete', tab, index, cur, target)
    },
  },
}
</script>
<template>
  <div class="tab-area">
    <header class="my-2 flex items-center justify-start">
      <div class="mx-2 font-semibold">{{ title }}</div>
      <span class="text-sm text-[#545859]">{{ tip }}</span>
    </header>
    <div class="flex flex-wrap items-center justify-start">
      <transition-group :duration="300">
        <div
          @click="handleClick(tab, index)"
          :key="tab.value"
          :ref="tab.value"
          v-for="(tab, index) in tabs"
          :class="dashed ? 'custom-dashed-border' : 'rounded-[4px] bg-[#0001]'"
          class="relative mx-[1.5%] my-1.5 flex w-[30%] items-center justify-center py-1 text-[#333559]">
          {{ tab.name }}
          <div
            v-if="deleteable"
            @click="handleDelete(tab, index)"
            class="absolute -right-1 -top-1 h-[18px] w-[18px] rotate-45 rounded-full bg-[#0003] text-center leading-[18px] text-white">
            +
          </div>
        </div>
      </transition-group>
      <div v-if="extraRef" :ref="extraRef" class="mx-[1.5%] my-1 py-1"></div>
    </div>
  </div>
</template>
<style>
.custom-dashed-border {
  background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3crect width='100%25' height='100%25' fill='none' rx='6' ry='6' stroke='%23545859FF' stroke-width='1' stroke-dasharray='5%2c5' stroke-dashoffset='0' stroke-linecap='square'/%3e%3c/svg%3e");
  border-radius: 6px;
}
</style>
