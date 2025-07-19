<script>
export default {
  props: { show: Boolean, inner: Boolean },
  emits: ['close'],
  data() {
    return {}
  },
}
</script>
<template>
  <teleport v-if="!inner" to="body">
    <div v-show="show" class="fixed left-0 top-0 z-10 h-dvh w-dvw bg-[#0009]" @click.stop="$emit('close')"></div>
  </teleport>
  <div v-show="show && inner" class="fixed left-0 top-0 z-10 h-dvh w-dvw bg-[#0009]" @click.stop="$emit('close')"></div>
</template>
<style></style>
