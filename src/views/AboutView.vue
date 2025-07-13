<script>
export default {
  data() {
    return {
      tabs: ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4', 'Tab 5', 'Tab 6'],
      activeTab: 0,
      underlineWidth: 0,
      underlineLeft: 0
    }
  },
  computed: {
    underlineStyle() {
      return {
        width: `${this.underlineWidth}px`,
        left: `${this.underlineLeft}px`,
        transition: 'all 0.3s ease'
      }
    }
  },
  methods: {
    changeTab(index) {
      const tabElements = document.querySelectorAll('.tab');
      const activeTabElement = tabElements[index];

      // 获取新位置和宽度
      const newWidth = activeTabElement.offsetWidth;
      const newLeft = activeTabElement.offsetLeft;

      // 决定动画方向
      const direction = index > this.activeTab ? 'right' : 'left';

      // 如果是向右滑动，先设置宽度再移动位置
      if (direction === 'right') {
        this.underlineWidth = newWidth;
        setTimeout(() => {
          this.underlineLeft = newLeft;
        }, 10);
      }
      // 如果是向左滑动，先移动位置再设置宽度
      else {
        this.underlineLeft = newLeft;
        setTimeout(() => {
          this.underlineWidth = newWidth;
        }, 10);
      }

      this.activeTab = index;
    },
    initUnderline() {
      const firstTab = document.querySelector('.tab');
      if (firstTab) {
        this.underlineWidth = firstTab.offsetWidth;
        this.underlineLeft = firstTab.offsetLeft;
      }
    }
  },
  mounted() {
    this.initUnderline();
    window.addEventListener('resize', this.initUnderline);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.initUnderline);
  }
}
</script>
<template>
  <div class="tab-container">
    <div class="tabs">
      <div v-for="(tab, index) in tabs" :key="index" class="tab"
        :class="{ 'active': activeTab === index }" @click="changeTab(index)">
        {{ tab }}
      </div>
      <div class="underline" :style="underlineStyle"></div>
    </div>
  </div>
</template>
<style scoped>
.tab-container {
  width: 100%;
  overflow: scroll;
}

.tabs {
  display: flex;
  position: relative;
  border-bottom: 1px solid #ddd;
}

.tab {
  padding: 10px 20px;
  cursor: pointer;
  position: relative;
  text-align: center;
  text-wrap: nowrap;
}

.tab.active {
  color: #42b983;
  /* 激活状态颜色 */
}

.underline {
  position: absolute;
  bottom: -1px;
  height: 2px;
  background-color: #42b983;
  /* 下划线颜色 */
}
</style>