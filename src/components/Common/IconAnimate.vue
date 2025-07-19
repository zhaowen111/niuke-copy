<script>
import Lottie from 'lottie-web'

export default {
  props: {
    iconName: String,
    active: Boolean,
    size: Number,
  },
  data() {
    return {
      animator: null,
    }
  },
  computed: {
    sizeStyle() {
      const size = this.size || 20
      return { width: size / 16 + 'rem', height: size / 16 + 'rem' }
    },
  },
  watch: {
    active: {
      handler(newVal) {
        if (!this.animator) return
        if (newVal) {
          this.animator.play()
        } else {
          this.animator.stop()
        }
      },
    },
  },
  async mounted() {
    let icon
    try {
      icon = await import(`@/assets/iconJson/${this.iconName}.json?url`)
    } catch (error) {
      console.error(error)
    }
    if (icon) {
      const div = this.$refs['div']
      this.animator = Lottie.loadAnimation({
        container: div, // the dom element that will contain the animation
        renderer: 'svg',
        loop: false,
        autoplay: false,
        path: icon.default, // the path to the animation json
      })
      if (this.active) {
        this.animator.play()
      }
    }
  },
}
</script>
<template>
  <div :style="sizeStyle" ref="div"></div>
</template>
<style></style>
