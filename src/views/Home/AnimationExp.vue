<template>
  <div class="lists-container">
    <!-- 列表1 -->
    <div class="list" ref="list1">
      <h3>列表1</h3>
      <div class="items-container">
        <div
          v-for="item in list1"
          :key="item.id"
          class="item"
          :data-id="item.id"
          @click="moveItem(item, list1, list2, $refs.list1, $refs.list2)">
          {{ item.content }}
        </div>
      </div>
    </div>

    <!-- 列表2 -->
    <div class="list" ref="list2">
      <h3>列表2</h3>
      <div class="items-container">
        <div
          v-for="item in list2"
          :key="item.id"
          class="item"
          :data-id="item.id"
          @click="moveItem(item, list2, list1, $refs.list2, $refs.list1)">
          {{ item.content }}
        </div>
      </div>
    </div>

    <!-- 动画元素 -->
    <div v-if="movingItem" class="item moving-item" :style="movingItemStyle">
      {{ movingItem.content }}
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      list1: [
        { id: 1, content: '项目A' },
        { id: 2, content: '项目B' },
        { id: 3, content: '项目C' },
      ],
      list2: [
        { id: 4, content: '项目D' },
        { id: 5, content: '项目E' },
      ],
      movingItem: null,
      movingItemStyle: {},
    }
  },
  methods: {
    async moveItem(item, fromList, toList, fromEl, toEl) {
      if (this.movingItem) return

      // 设置移动中的项目
      this.movingItem = { ...item }

      // 获取起始位置 - 使用data-id选择器
      const itemEl = fromEl.querySelector(`.item[data-id="${item.id}"]`)
      if (!itemEl) return

      const startRect = itemEl.getBoundingClientRect()
      this.movingItemStyle = {
        position: 'fixed',
        left: `${startRect.left}px`,
        top: `${startRect.top}px`,
        width: `${startRect.width}px`,
        transform: 'none',
        transition: 'none',
        opacity: '1',
      }

      // 从原列表移除
      const index = fromList.findIndex(i => i.id === item.id)
      if (index !== -1) {
        fromList.splice(index, 1)
      }

      // 等待DOM更新
      await this.$nextTick()

      // 创建临时元素计算目标位置
      const toContainer = toEl.querySelector('.items-container')
      const tempItem = document.createElement('div')
      tempItem.className = 'item'
      tempItem.style.visibility = 'hidden'
      tempItem.textContent = item.content
      toContainer.appendChild(tempItem)

      const endRect = tempItem.getBoundingClientRect()
      toContainer.removeChild(tempItem)

      // 执行动画
      this.movingItemStyle = {
        ...this.movingItemStyle,
        transition: 'all 0.5s cubic-bezier(0.4, 0, 0.2, 1)',
        left: `${endRect.left}px`,
        top: `${endRect.top}px`,
      }

      // 动画完成后添加到目标列表
      setTimeout(() => {
        toList.push(item)
        this.movingItem = null
      }, 500)
    },
  },
}
</script>

<style scoped>
.lists-container {
  display: flex;
  justify-content: space-around;
  padding: 20px;
  position: relative;
}

.list {
  width: 45%;
  min-height: 300px;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 4px;
  background: #f9f9f9;
}

.items-container {
  position: relative;
  min-height: 200px;
}

.item {
  margin: 8px 0;
  padding: 12px;
  background: #fff;
  border: 1px solid #eee;
  border-radius: 4px;
  cursor: pointer;
  transition: background 0.2s;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.item:hover {
  background: #f0f0f0;
}

.moving-item {
  position: fixed;
  z-index: 100;
  background: #e3f2fd;
  border: 1px solid #bbdefb;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
  pointer-events: none;
}
</style>
