import { h, Transition } from 'vue'

export default {
  props: {
    text: String,
    time: {
      type: Number,
      default: 3000,
    },
  },
  emits: ['close'],
  data() {
    return {
      show: false,
      timeid: -1,
    }
  },
  created() {
    console.log('created')
    console.log(this.text)
    console.log(this.time)
    console.log(this.show)
  },
  watch: {
    show(val) {
      if (!val) {
        this.$emit('close')
      }
    },
  },
  mounted() {
    console.log('mounted')
    this.show = true
    this.timeid = setTimeout(() => {
      this.show = false
    }, this.time)
  },

  unmounted() {
    console.log('unmounted')
    clearTimeout(this.timeid)
  },

  render() {
    console.log('render')
    return (
      <Transition name='scale'>
        {this.show ? (
          <div class='fixed left-1/2 top-1/2 z-30 -translate-x-1/2 rounded-lg bg-[#000a] px-4 py-2 text-sm text-white'>
            {this.text}
          </div>
        ) : (
          ''
        )}
      </Transition>
    )
  },
}
