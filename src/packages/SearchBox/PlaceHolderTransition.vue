<script>
export default {
  props: {
    //['','']
    placeholders: Array,
    duration: {
      type: Number,
      default: 1000,
    },
  },
  data() {
    return {
      index: 0,
      intervalId: -1,
    }
  },
  computed: {
    placeholderText() {
      return this.placeholders[this.index]
    },
  },
  watch: {
    placeholderText(newVal) {
      // 当placeholder变化时发出事件
      this.$emit('placeholder-change', newVal)
    },
  },
  mounted() {
    ++this.index
    this.intervalId = setInterval(() => {
      this.index = ++this.index % this.placeholders.length
    }, 3000)
  },
  unmounted() {
    clearInterval(this.intervalId)
  },
}
</script>
<template>
  <transition name="place" mode="out-in">
    <div :key="placeholderText" class="absolute text-sm text-[#a7a7a7]">{{ placeholderText }}</div>
  </transition>
</template>
<style>
.place-enter-active {
  transition: all 0.3s ease-in;
}
.place-leave-active {
  transition: all 0.3s ease-in;
}

.place-enter-from {
  transform: translateY(2.5rem);
}

.place-leave-to {
  transform: translateY(-2.5rem);
}
</style>
