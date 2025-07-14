<script>
import closeImg from '@/assets/close.svg?no-inline'
import { getIconStyle } from '@/utils/utils'
export default {
  props: {
    show: Boolean,
    title: String,
  },
  emits: ['closePage'],
  data() {
    return {
      style: getIconStyle(closeImg),
    }
  },
  computed: {
    showStyle() {
      return this.show ? { bottom: '0' } : {}
    },
  },
  methods: {
    handleClose() {
      this.$emit('closePage')
    },
  },
}
</script>
<template>
  <teleport to="body">
    <!-- 容器 -->
    <div class="fixed -bottom-full z-10 h-dvh w-dvw transition-[bottom]" :style="showStyle" @click="handleClose">
      <!-- 内容区域 -->
      <div @click.stop class="absolute bottom-0 box-border h-[90%] w-[100%] rounded-t-2xl p-2">
        <!-- 标题栏 -->
        <header class="relative flex h-[40px] items-center justify-center">
          <div class="font-semibold">{{ title }}</div>
          <div @click="handleClose" class="absolute right-2" :style="style"></div>
        </header>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<style></style>
