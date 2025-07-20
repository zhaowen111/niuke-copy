<script>
import HistorySearch from './HistorySearch.vue'
import SuggestedSearch from './SuggestedSearch.vue'
import ContentRecommend from './ContentRecommend.vue'

export default {
  components: {
    HistorySearch,
    SuggestedSearch,
    ContentRecommend,
  },
  props: {},
  data() {
    return {
      searchValue: '',
      placeholder: '搜索',
      searchHistory: ['前端开发', 'Java面试', '产品经理', '数据分析'],
      showSearchResults: false,
    }
  },
  activated() {
    // 从路由参数中获取placeholder
    if (this.$route.query.placeholder) {
      this.placeholder = this.$route.query.placeholder
    }
    // 自动聚焦到搜索框
    this.$nextTick(() => {
      const searchInput = this.$refs.searchInput
      if (searchInput) {
        searchInput.focus()
      }
    })
  },
  methods: {
    handleCancel() {
      this.$router.go(-1)
    },
    handleSearch() {
      if (!this.searchValue) {
        this.searchValue = this.placeholder
      }
      this.addToHistory(this.searchValue.trim())
      this.showSearchResults = true
    },
    addToHistory(keyword) {
      // 避免重复添加
      if (!this.searchHistory.includes(keyword)) {
        this.searchHistory.unshift(keyword)
        // 限制历史记录数量
        if (this.searchHistory.length > 10) {
          this.searchHistory = this.searchHistory.slice(0, 10)
        }
      }
    },
    handleClearHistory() {
      this.searchHistory = []
    },
    handleHistoryClick(item) {
      this.searchValue = item
      this.handleSearch()
    },
    handleKeywordClick(keyword) {
      this.searchValue = keyword
      this.handleSearch()
    },
    handleContentClick(item) {
      console.log('点击内容:', item)
      // 这里可以跳转到内容详情页
    },
  },
}
</script>
<template>
  <div class="relative box-border h-full w-full bg-white">
    <!-- 搜索区域 -->
    <header class="center fixed left-0 top-2 z-10 box-border flex h-10 w-full bg-white px-4">
      <!-- 搜索框区域 -->
      <div class="relative flex h-8 flex-1 items-center rounded-full bg-gray-100 px-3">
        <!-- 搜索图标 -->
        <Icon name="search" size="18" class="mr-2 text-gray-400" />

        <!-- 搜索输入框 -->
        <input
          ref="searchInput"
          v-model="searchValue"
          type="text"
          :placeholder="placeholder"
          class="flex-1 bg-transparent text-sm"
          @keyup.enter="handleSearch" />

        <!-- 智搜图标 -->
        <div class="ml-2 flex items-center rounded-md bg-[#d2fcfd] px-1 py-0.5">
          <Icon name="AI" size="16" />
        </div>
      </div>

      <!-- 取消按钮 -->
      <button @click="handleCancel" class="ml-3 text-sm text-gray-400">取消</button>
    </header>

    <!-- 内容区域 -->
    <div class="pt-12">
      <!-- 搜索结果 -->
      <div v-if="showSearchResults && searchValue.trim()" class="p-4">
        <div class="text-center text-gray-500">搜索结果: "{{ searchValue }}"</div>
      </div>

      <!-- 默认内容区域 -->
      <div v-else>
        <!-- 历史搜索 -->
        <HistorySearch
          :search-history="searchHistory"
          @clear-history="handleClearHistory"
          @history-click="handleHistoryClick" />

        <!-- 分割线 -->
        <div class="mx-4 border-t border-gray-200"></div>

        <!-- 猜你想搜 -->
        <SuggestedSearch @keyword-click="handleKeywordClick" />

        <!-- 分割线 -->
        <div class="mx-4 border-t border-gray-200"></div>

        <!-- 内容推荐 -->
        <ContentRecommend @content-click="handleContentClick" />
      </div>
    </div>
  </div>
</template>
