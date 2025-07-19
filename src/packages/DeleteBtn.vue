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
      return {
        height: this.size + 'px',
        width: this.size + 'px',
        lineHeight: this.size + 'px',
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
