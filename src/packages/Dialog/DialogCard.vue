<script>
export default {
  props: {
    show: Boolean,
    title: String,
    mask: {
      type: Boolean,
      default: true,
    },
  },
  emits: ['close', 'open'],
  computed: {
    showStyle() {
      return this.show ? { bottom: '0' } : {}
    },
  },
  watch: {
    show(newVal) {
      newVal && this.$emit('open')
    },
  },
  methods: {
    handleClose() {
      this.$emit('close')
    },
  },
}
</script>
<template>
  <teleport to="body">
    <!-- 容器 -->
    <div class="fixed -bottom-full z-10 h-dvh w-dvw transition-[bottom]" :style="showStyle" @click="handleClose">
      <!-- 内容区域 -->
      <div @click.stop class="absolute bottom-0 z-30 box-border h-[90%] w-[100%] rounded-t-2xl bg-white p-2">
        <!-- 标题栏 -->
        <header class="relative flex h-10 items-center justify-center">
          <div class="font-semibold">{{ title }}</div>
          <Icon @click="handleClose" class="absolute right-2" name="close" size="18" />
        </header>
        <div v-if="show" class="no-scrollbar overflow-y-scroll" style="height: calc(100% - 2.5rem)">
          <slot></slot>
        </div>
      </div>
      <div v-show="mask && show" class="fixed left-0 top-0 z-10 h-dvh w-dvw bg-[#0009]" @click.stop="handleClose"></div>
    </div>
  </teleport>
</template>
<style></style>
