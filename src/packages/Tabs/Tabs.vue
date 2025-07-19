<script>
import { defineComponent } from 'vue'
import {} from 'gsap'
import IconAnimate from '@/components/Common/IconAnimate.vue'
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
  <div class="flex h-full items-center justify-center overflow-hidden">
    <div
      :key="tab.value"
      class="max-w-1/3 relative box-border flex flex-1 flex-col items-center text-center text-xs text-[#565759]"
      :style="activeTab === tab.value ? style : {}"
      v-for="tab in tabs"
      @click="change(tab)">
      <!-- 动态图标空白区域太大了，懒得重新制作了：class="-m-2" -->
      <IconAnimate :size="50" :active="activeTab === tab.value" :iconName="tab.iconName" class="-m-2" />
      <span>{{ tab.name }}</span>
      <span
        v-if="tab.badge"
        class="absolute right-2.5 top-2.5 box-border inline-block size-4 rounded-[50%] bg-red-600 leading-4 text-white">
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
