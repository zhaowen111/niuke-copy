<script>
export default {
  props: {
    recommendContent: {
      type: Array,
      default: () => [
        {
          id: 1,
          title: '2024年前端开发趋势分析',
          author: '前端小王子',
          views: 1234,
          tags: ['前端', '趋势'],
        },
        {
          id: 2,
          title: 'Java面试常见问题总结',
          author: 'Java大神',
          views: 2345,
          tags: ['Java', '面试'],
        },
        {
          id: 3,
          title: '产品经理必备技能清单',
          author: '产品达人',
          views: 3456,
          tags: ['产品', '技能'],
        },
      ],
    },
  },
  methods: {
    handleContentClick(item) {
      this.$emit('content-click', item)
    },
  },
}
</script>
<template>
  <div class="px-4 py-3">
    <!-- 标题 -->
    <div class="mb-3">
      <h3 class="text-sm font-medium text-gray-900">内容推荐</h3>
    </div>

    <!-- 推荐内容列表 -->
    <div class="space-y-3">
      <div
        v-for="item in recommendContent"
        :key="item.id"
        @click="handleContentClick(item)"
        class="cursor-pointer rounded-lg border border-gray-200 p-3 hover:border-gray-300 hover:shadow-sm">
        <!-- 标题 -->
        <h4 class="mb-2 text-sm font-medium text-gray-900">
          {{ item.title }}
        </h4>

        <!-- 作者和浏览量 -->
        <div class="mb-2 flex items-center justify-between text-xs text-gray-500">
          <span>{{ item.author }}</span>
          <span>{{ item.views }} 浏览</span>
        </div>

        <!-- 标签 -->
        <div class="flex flex-wrap gap-1">
          <span v-for="tag in item.tags" :key="tag" class="rounded-full bg-gray-100 px-2 py-0.5 text-xs text-gray-600">
            {{ tag }}
          </span>
        </div>
      </div>
    </div>
  </div>
</template>
