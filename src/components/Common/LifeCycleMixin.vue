<script>
export default {
  props: {},
  data() {
    return {}
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  created() {
    console.log('created')
  },
  mounted() {
    console.log('mounted')
  },

  // 更新阶段
  beforeUpdate() {
    console.log('beforeUpdate')
  },
  updated() {
    console.log('updated')
  },

  // 卸载阶段
  beforeUnmount() {
    console.log('beforeUnmount')
  },
  unmounted() {
    console.log('unmounted')
  },
  // 错误捕获
  errorCaptured(err, vm, info) {
    console.log('errorCaptured', err)
    return false // 继续向上传播错误
  },

  // 调试钩子 (仅开发环境)
  renderTracked({ key, target, type }) {
    console.log('renderTracked', { key, type })
  },
  renderTriggered({ key, target, type }) {
    console.log('renderTriggered', { key, type })
  },

  // KeepAlive 相关
  activated() {
    console.log('activated')
  },
  deactivated() {
    console.log('deactivated')
  },
}
</script>
<template>
  <div></div>
</template>
<style></style>
