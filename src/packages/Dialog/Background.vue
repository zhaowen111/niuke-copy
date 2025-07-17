<script>
export default {
  props: { show: Boolean },
  emits: ['close'],
  data() {
    return {}
  },
}
</script>
<template>
  <teleport to="body">
    <div v-show="show" class="fixed top-0 left-0 z-10 h-dvh w-dvw bg-[#0009]" @click.stop="$emit('close')"></div>
  </teleport>
</template>
<style></style>
