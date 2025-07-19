<script>
import Test from '@/packages/Confirm.vue'
export default {
  components: {
    Test,
  },
  props: {},
  data() {
    return {
      play: true,
    }
  }, // 初始化阶段
}
</script>
<template>
  <div>
    <Test :show="play" @cancel="play = false" title="是否删除当前投票" />
    <button class="fixed z-10" @click="play = !play">切换</button>
  </div>
</template>
<style></style>
