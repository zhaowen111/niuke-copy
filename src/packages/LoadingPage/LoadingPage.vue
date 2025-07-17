<script>
let intervalId = -1
export default {
  props: {
    aliveTime: {
      default: 3000,
    }, //ms
    canSkip: Boolean,
    img: String,
    show: {
      type: Boolean,
      default: true,
    },
  },
  data() {
    return {
      remainingTime: this.aliveTime,
    }
  },
  mounted() {
    intervalId = setInterval(() => {
      this.remainingTime -= 1000
      if (this.remainingTime <= 0) {
        clearInterval(intervalId)
      }
    }, 1000)
  },
  methods: {
    handleClick() {
      this.remainingTime = 0
      clearInterval(intervalId)
    },
  },
}
</script>
<template>
  <Teleport to="body" v-if="remainingTime > 0 && show">
    <div class="fixed right-0 top-0 z-10 h-[100%] w-dvw bg-white">
      <img :src="img" />
      <div
        v-if="canSkip"
        class="absolute right-3 top-3 rounded-full bg-[#0009] p-2 text-xs text-white"
        @click="handleClick">
        {{ '跳过 ' + remainingTime / 1000 }}
      </div>
    </div>
  </Teleport>
</template>
<style></style>
