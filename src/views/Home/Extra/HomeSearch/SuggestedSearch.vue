<script>
export default {
  props: {
    suggestedKeywords: {
      type: Array,
      default: () => ['前端开发', 'Java工程师', '产品经理', '数据分析师', '运维工程师', '测试工程师'],
    },
  },
  methods: {
    handleKeywordClick(keyword) {
      this.$emit('keyword-click', keyword)
    },
  },
}
</script>
<template>
  <div class="px-4 py-3">
    <!-- 标题 -->
    <div class="mb-3">
      <h3 class="text-sm font-medium text-gray-900">猜你想搜</h3>
    </div>

    <!-- 推荐关键词 -->
    <div class="flex flex-wrap gap-2">
      <div
        v-for="(keyword, index) in suggestedKeywords"
        :key="index"
        @click="handleKeywordClick(keyword)"
        class="cursor-pointer rounded-full bg-blue-50 px-3 py-1.5 text-xs text-blue-600 hover:bg-blue-100">
        {{ keyword }}
      </div>
    </div>
  </div>
</template>
<style scoped>
/* 猜你想搜组件样式 */
</style>
