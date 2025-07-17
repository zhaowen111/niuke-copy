<script>
export default {
  props: {
    show: Boolean,
    title: String,
  },
  emits: ['closePage', 'open'],
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
      <div @click.stop class="absolute bottom-0 box-border h-[90%] w-[100%] rounded-t-2xl bg-white p-2">
        <!-- 标题栏 -->
        <header class="relative flex h-[40px] items-center justify-center">
          <div class="font-semibold">{{ title }}</div>
          <Icon @click="handleClose" class="absolute right-2" name="close" size="18" />
        </header>
        <slot></slot>
      </div>
    </div>
  </teleport>
</template>
<style></style>
