<script>
import Icon from '@/packages/Icon.vue'
import { getNumberText } from '@/utils/utils'
import { gsap } from 'gsap'
import { nextTick } from 'vue'

export default {
  props: {
    post: Object,
  },
  emits: ['openReduce', 'zan'],
  components: { Icon },
  data() {
    return {
      zan: false,
    }
  },
  computed: {
    comment() {
      return this.post.comments[0]
    },
  },
  methods: {
    getNumberText,
    async handleClickZan() {
      const likes = this.zan ? this.post.stats.likes - 1 : this.post.stats.likes + 1
      this.$emit('zan', likes)
      this.zan = !this.zan
      await nextTick()
      if (this.zan) {
        const zanIcon = this.$refs['zanIcon'].$el
        await gsap.to(zanIcon, { scale: 1.4, y: -5, duration: 0.2 })
        await gsap.to(zanIcon, { scale: 1, y: 0, duration: 0.2 })
      }
    },
  },
}
</script>
<template>
  <div class="posts-container m-2 overflow-hidden rounded-xl bg-white p-4">
    <!-- 标题栏 -->
    <header class="relative flex h-10 items-center">
      <div>
        <img class="h-8 w-8 rounded-full" :src="post.author.avatar" alt="" />
      </div>
      <div class="ml-2">
        <div class="-mb-1">
          <span class="text-sm font-semibold">{{ post.author.username }}</span>
          <span class="ml-1 rounded-[4px] bg-blue-50 p-1 text-xs text-blue-600">{{ 'lv.' + post.author.level }}</span>
        </div>
        <div class="-mt-1">
          <span class="pr-2 text-xs text-[#a7a8aa]">{{ post.author.postTime }}</span>
          <span class="pr-2 text-xs text-[#a7a8aa]">{{ post.author.school }}</span>
          <span class="pr-2 text-xs text-[#a7a8aa]">{{ post.author.major }}</span>
        </div>
      </div>
      <Icon class="absolute right-0 top-0 h-4 w-4" name="menu-small" @click="$emit('openReduce', post.id)" />
    </header>
    <!-- 帖子简要内容 -->
    <main class="text-sm">
      <header class="my-1 font-semibold">{{ post.title }}</header>
      <div>{{ post.content }}</div>
      <img class="h-50 skeleton-item my-2" :src="post.img" loading="lazy" />
    </main>
    <!-- 热评第一条 -->
    <div class="border-l-3 my-2 h-4 border-[#d4d8df99] pl-1 text-xs text-[#a7a8aa]">
      {{ comment.author.username + ':' + comment.content }}
    </div>
    <!-- 标签 -->
    <aside class="inline-flex items-center rounded-full border-[1px] border-[#d4d8dfcc] px-2 py-1 text-xs text-[#000d]">
      <Icon class="mr-1" name="huati" size="15" />
      <div>{{ post.tag.text }}</div>
    </aside>
    <!-- 互动数据 -->
    <aside class="mx-2 flex justify-between">
      <div class="mt-2 flex items-center text-sm text-[#7778aa]">
        <Icon class="mb-[1px] mr-1" name="seen" size="18" />
        <div>{{ getNumberText(post.stats.view) }}</div>
      </div>
      <div class="mt-2 flex items-center text-sm text-[#7778aa]">
        <Icon class="mb-[1px] mr-1" name="comment" size="14" />
        <div>{{ getNumberText(post.stats.comments) }}</div>
      </div>
      <div @click.stop="handleClickZan" :class="zan ? 'zan' : ''" class="mt-2 flex items-center text-sm text-[#7778aa]">
        <Icon class="mb-[1px] mr-1" name="zan" size="15" ref="zanIcon" />
        <div>{{ getNumberText(post.stats.likes) }}</div>
      </div>
    </aside>
  </div>
</template>
<style scoped>
.zan {
  color: #06f4ba;
}
.skeleton-item {
  background: linear-gradient(90deg, #f2f2f2 25%, #e6e6e6 37%, #f2f2f2 63%);
  background-size: 400% 100%;
  animation: loading 1.4s ease infinite;
}
@keyframes loading {
  0% {
    background-position: 100% 50%;
  }
  100% {
    background-position: 0 50%;
  }
}
</style>
