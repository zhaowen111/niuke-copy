<script>
import Icon from '@/packages/Icon.vue'
import { getNumberText } from '@/utils/utils'

export default {
  props: {
    post: Object,
  },
  components: { Icon },
  computed: {
    comment() {
      return this.post.comments[0]
    },
  },
  methods: {
    getNumberText,
  },
}
</script>
<template>
  <div class="posts-container m-2 overflow-hidden rounded-xl bg-white p-2">
    <header class="flex h-10 items-center">
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
      <Icon class="absolute right-0 top-0 h-4 w-4" name="menu-small" />
    </header>
    <!-- 帖子简要内容 -->
    <main class="text-sm">
      <header class="my-1 font-semibold">{{ post.title }}</header>
      <div>{{ post.content }}</div>
      <img class="h-50 my-2" :src="post.img" />
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
      <div class="mt-2 flex items-center text-sm text-[#7778aa]">
        <Icon class="mb-[1px] mr-1" name="zan" size="15" />
        <div>{{ getNumberText(post.stats.likes) }}</div>
      </div>
    </aside>
  </div>
</template>
<style></style>
