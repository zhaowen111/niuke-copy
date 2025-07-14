<script>
export default {
  props: {},
  data() {
    return {}
  },
}
</script>
<template>
  <Transition name="fade" appear mode="out-in"><slot></slot></Transition>
</template>
<style scoped>
.fade-enter-active {
  transition: all 0.3s ease-out;
}
.fade-leave-active {
  transition: all 0.5s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateX(20px);
}
</style>
