<script>
import { defineComponent } from 'vue'
import {} from 'gsap'
import IconAnimate from '@/components/IconAnimate.vue'
const defaultActiveStyle = {
  color: '#00dcb0',
  background: 'white',
  transition: 'transform 0.5s',
}
export default defineComponent({
  components: { IconAnimate },
  props: {
    //[{name:'首页',value:1,badge: null,iconName:''}]
    tabs: Array,
    default: [String, Number],
    activeStyle: Object,
  },
  data() {
    return {
      activeTab: null,
    }
  },
  computed: {
    style() {
      return { ...defaultActiveStyle, ...this.activeStyle }
    },
  },
  created() {
    if (this.default) {
      this.change({ value: this.default })
    }
  },
  methods: {
    change(tab) {
      this.activeTab = tab.value
      this.$emit('change', tab)
    },
  },
})
</script>
<template>
  <div class="flex h-[60px] items-center justify-center overflow-hidden">
    <div
      :key="tab.value"
      class="relative -mt-2 box-border flex max-w-1/3 flex-auto flex-col items-center text-center text-xs text-[#565759]"
      :style="activeTab === tab.value ? style : {}"
      v-for="tab in tabs"
      @click="change(tab)">
      <IconAnimate :size="60" :active="activeTab === tab.value" :iconName="tab.iconName" />
      <span class="mt-[-15px] flex scale-75">{{ tab.name }}</span>
      <span
        v-if="tab.badge"
        class="absolute top-[10px] right-[10px] box-border inline-block size-[15px] rounded-[50%] bg-red-600 leading-[15px] text-white">
        {{ tab.badge }}
      </span>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: #00dcb0;
}
</style>
