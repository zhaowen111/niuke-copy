<script>
export default {
  props: {
    //[{name:'亲子',va;ue:1,default:true}]
    tabs: Array,
    activeClass: String
  },
  data() {
    return {
      activeTab: null,
      activeIndex: -1,
      underlineWidth: 0,
      underlineLeft: 0
    }
  },
  computed: {
    underlineStyle() {
      return {
        transition: "all 0.2s ease",
        width: `${this.underlineWidth}px`,
        left: `${this.underlineLeft}px`
      }
    }
  },
  mounted() {
    let defaultIndex = null;
    const defaultTab = this.tabs.filter((tab, index) => {
      if (tab.default && !defaultIndex) {
        defaultIndex = index;
      }
      return tab.default
    })[0];

    if (defaultTab) {
      this.change(defaultTab, defaultIndex);
    }
  },
  methods: {
    change(tab, index) {


      //获取激活元素
      let target = this.$refs[tab.value];
      if (Array.isArray(target)) target = target[0];

      //滚动到激活元素
      if (target) {
        target.scrollIntoView({ inline: 'center' });

        //设置下划线动画
        const direction = index > this.activeIndex ? 'right' : 'left'
        if (direction === 'right') {
          this.underlineWidth = target.offsetWidth;
          setTimeout(() => {
            this.underlineLeft = target.offsetLeft;
          }, 10);
        } else {
          this.underlineLeft = target.offsetLeft;
          setTimeout(() => {
            this.underlineWidth = target.offsetWidth;
          }, 10);
        }
      }

      this.activeTab = tab.value;//切换激活元素
      this.activeIndex = index;
      this.$emit('change', tab);
    },
  }
}
</script>
<template>
  <div class="Tab-More-Container overflow-x-scroll h-[50px] flex items-center no-scrollbar">
    <div class="Tab-More-Content flex items-center justify-start h-full relative">
      <div class="mx-3.5 text-nowrap overflow-hidden text-[#545859] h-full flex items-center"
        :class="[tab.value === activeTab && 'active', activeClass]" v-for="(tab, index) in tabs"
        @click="change(tab, index)" :ref="tab.value">
        {{ tab.name }}
      </div>
      <div :style="underlineStyle" class="h-1.5 rounded-full bg-[#06f4ba] absolute bottom-[10px]">
      </div>
    </div>
  </div>
</template>
<style scoped>
.active {
  color: black;
  font-weight: 600;
}
</style>