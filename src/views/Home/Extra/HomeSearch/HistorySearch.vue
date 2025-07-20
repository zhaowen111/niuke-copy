<script>
export default {
  props: {
    searchHistory: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      showConfirmDialog: false,
    }
  },
  methods: {
    handleDeleteHistory() {
      this.showConfirmDialog = true
    },
    handleConfirmDelete() {
      this.$emit('clear-history')
      this.showConfirmDialog = false
    },
    handleCancelDelete() {
      this.showConfirmDialog = false
    },
    handleHistoryClick(item) {
      this.$emit('history-click', item)
    },
  },
}
</script>
<template>
  <div class="px-4 py-3">
    <!-- 标题和删除按钮 -->
    <div class="mb-3 flex items-center justify-between">
      <h3 class="text-sm font-medium text-gray-900">历史搜索</h3>
      <button @click="handleDeleteHistory" class="text-xs text-gray-400 hover:text-gray-600">删除</button>
    </div>

    <!-- 历史搜索内容 -->
    <div v-if="searchHistory.length > 0" class="space-y-2">
      <div
        v-for="(item, index) in searchHistory"
        :key="index"
        @click="handleHistoryClick(item)"
        class="flex cursor-pointer items-center justify-between rounded-lg bg-gray-50 px-3 py-2 hover:bg-gray-100">
        <span class="text-sm text-gray-700">{{ item }}</span>
        <Icon name="search" size="14" class="text-gray-400" />
      </div>
    </div>

    <!-- 空状态 -->
    <div v-else class="py-4 text-center text-sm text-gray-400">暂无搜索历史</div>

    <!-- 确认删除弹框 -->
    <div v-if="showConfirmDialog" class="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
      <div class="w-80 rounded-lg bg-white p-6">
        <h3 class="mb-4 text-lg font-medium text-gray-900">确认删除</h3>
        <p class="mb-6 text-sm text-gray-600">是否删除所有搜索历史记录？</p>
        <div class="flex justify-end space-x-3">
          <button @click="handleCancelDelete" class="rounded px-4 py-2 text-sm text-gray-600 hover:bg-gray-100">
            取消
          </button>
          <button @click="handleConfirmDelete" class="rounded bg-red-500 px-4 py-2 text-sm text-white hover:bg-red-600">
            确认
          </button>
        </div>
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 历史搜索组件样式 */
</style>
