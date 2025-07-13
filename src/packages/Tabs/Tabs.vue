<script>
import { defineComponent } from 'vue';
import { } from 'gsap'
const defaultActiveStyle = {
  color: 'white',
  background: 'black',
  transition: "transform 0.5s",
}
export default defineComponent({
  props: {
    //[{name:'首页',value:1,badge: null}]
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
    }
  },
  created() {
    if (this.default) {
      this.change({ value: this.default });
    }
  },
  methods: {
    change(tab) {
      this.activeTab = tab.value;
      this.$emit('change', tab);
    }
  }
})
</script>
<template>
  <div class="flex justify-center items-center">
    <div class="flex-auto text-center max-w-1/3 box-border p-2 text-xs relative"
      :style="activeTab === tab.value ? style : {}" v-for="tab in tabs" @click="change(tab)">
      {{ tab.name }}
      <span v-if="tab.badge"
        class="bg-red-600 rounded-[50%] inline-block box-border size-[15px] leading-[15px] absolute ml-1 mb-4 text-white">
        {{ tab.badge }}</span>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: green;
}
</style>