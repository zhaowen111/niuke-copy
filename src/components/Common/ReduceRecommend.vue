<script>
import Background from '@/packages/Dialog/Background.vue'

export default {
  emits: ['close', 'reduce'],
  components: { Background },
  props: {
    show: Boolean,
    //{text:'牛油故事会，id：1'}
    topic: Object,
  },
  data() {
    return {
      values: [
        { type: 1, text: `减少此话题推荐：${this.topic.text}` },
        { type: 2, text: '内容重复' },
        { type: 3, text: '内容质量差' },
        { type: 4, text: '更多意见反馈' },
      ],
    }
  },
  methods: {
    handleClose(l) {
      this.$emit('close')
    },
    handleReduce(val) {
      this.$emit('reduce', val)
    },
  },
}
</script>
<template>
  <teleport to="body">
    <!-- 减少推荐内容的弹窗 -->
    <div
      class="fixed left-1/2 top-full z-20 w-full -translate-x-1/2 transition-[translate]"
      :class="this.show ? '-translate-y-full' : 'translate-y-1/2'">
      <main class="mx-4 rounded-[8px] bg-white p-2">
        <div>
          <div
            @click.stop="handleReduce(item.type)"
            class="border-b-[0.5px] border-b-[#eee] p-2 last:border-0"
            v-for="item in values">
            {{ item.text }}
          </div>
        </div>
      </main>
      <div
        @click.stop="handleClose"
        class="m-4 mb-8 rounded-[8px] border-b-[0.5px] border-b-[#eee] bg-white p-2 text-center text-sm text-[#aaa] last:border-0">
        取消
      </div>
      <Background :show="show" @close="handleClose" />
    </div>
  </teleport>
</template>
