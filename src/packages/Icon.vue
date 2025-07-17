<script>
export default {
  props: {
    name: {
      type: String,
      required: true,
    },
    size: {
      default: 20,
      type: [Number, String],
    },
  },

  computed: {
    iconStyle() {
      return {
        width: this.size + 'px',
        background: `center/contain no-repeat url('/src/assets/icon/${this.name}.svg')`,
        height: this.size + 'px',
      }
    },
  },
  methods: {
    handleError() {
      console.error('svg图片资源加载失败')
    },
  },
}
</script>
<template>
  <div :style="iconStyle" @error="handleError"></div>
</template>
<style></style>
