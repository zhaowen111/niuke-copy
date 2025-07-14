<script>
export default {
  props: {},
  data() {
    return {
      placeholder: 0,
    }
  },
  created() {
    setInterval(() => {
      this.placeholder++
    }, 1000)
  },
}
</script>
<template>
  <div class="relative flex h-[40px] items-center overflow-hidden">
    <input type="text" />
    <transition name="place" mode="out-in">
      <div :key="placeholder" class="absolute">{{ placeholder }}</div>
    </transition>
  </div>
</template>
<style>
.place-enter-active {
  transition: all 0.3s ease-in;
}
.place-leave-active {
  transition: all 0.3s ease-in 2s;
}

.place-enter-from {
  transform: translateY(40px);
}

.place-leave-to {
  transform: translateY(-40px);
}
</style>
