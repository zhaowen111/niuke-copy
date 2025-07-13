<script>
let intervalId = -1;
export default {
  props: {
    aliveTime: {
      default: 3000
    },//ms
    canSkip: Boolean,
    img: String

  },
  data() {
    return {
      remainingTime: this.aliveTime
    }
  },
  mounted() {
    intervalId = setInterval(() => {
      console.log(this.remainingTime);
      console.log(intervalId);
      this.remainingTime -= 1000;
      if (this.remainingTime <= 0) {
        clearInterval(intervalId);
      }
    }, 1000);
  },
  unmounted() {
    console.log("unmounted");

  },
  methods: {
    handleClick() {
      this.remainingTime = 0;
      clearInterval(intervalId);
    }
  }
}
</script>
<template>
  <Teleport to="body" v-if="remainingTime > 0">
    <div class="w-dvw h-[100%] z-10 fixed top-0 right-0">
      <img :src="img">
      <div v-if="canSkip"
        class="absolute rounded-full p-2 right-3 top-3 text-xs text-white bg-[#0009]"
        @click="handleClick">
        {{ "跳过 " +
          remainingTime / 1000 }}</div>
    </div>
  </Teleport>


</template>
<style></style>