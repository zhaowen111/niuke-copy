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
  data() {
    return {
      icon: '',
    }
  },
  async created() {
    const icon = await import(`@/assets/icon/${this.name}.svg`)
    this.icon = icon.default
  },
  computed: {
    iconStyle() {
      const size = this.size / 16 + 'rem'
      return {
        width: size,
        height: size,
        background: `center/contain no-repeat url("${this.icon}")`,
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
