<script>
export default {
  props: {
    classList: String,
    size: {
      default: 20,
    },
  },
  emits: ['delete'],
  computed: {
    sizeStyle() {
      const size = this.size / 16 + 'rem'
      return {
        height: size,
        width: size,
        lineHeight: size,
      }
    },
  },
}
</script>
<template>
  <span
    @click.stop="$emit('delete')"
    class="absolute rotate-45 rounded-full bg-[#ccc] text-center text-white"
    :style="sizeStyle">
    +
  </span>
</template>
<style></style>
