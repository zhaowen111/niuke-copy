<script>
export default {
  props: {
    text: String,
    time: {
      type: Number,
      default: 3000,
    },
  },
  emits: ['close'],
  data() {
    return {
      show: true,
      timeid: -1,
      intervalId: -1,
    }
  },
  watch: {
    show(val) {
      if (!val) {
        this.$emit('close')
      }
    },
  },
  mounted() {
    this.timeid = setTimeout(() => {
      this.show = false
    }, this.time)
    this.intervalId = setInterval(() => {
      console.log(11)
    }, 1000)
  },

  unmounted() {
    console.log('unmounted')
    clearTimeout(this.timeid)
  },

  // SSR
  serverPrefetch() {
    console.log('serverPrefetch')
  },
}
</script>
<template>
  <teleport v-if="show" to="body">
    <div class="fixed left-1/2 top-1/2 z-30 -translate-x-1/2 rounded-lg bg-[#000a] px-4 py-2 text-sm text-white">
      {{ text }}
    </div>
  </teleport>
</template>
<style></style>
