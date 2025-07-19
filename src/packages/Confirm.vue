<script>
import Background from './Dialog/Background.vue'

export default {
  components: { Background },
  emits: ['cancel', 'sure'],
  props: {
    show: Boolean,
    title: {
      type: String,
      required: true,
      default: '是否确认',
    },
  },
  data() {
    return {}
  },
}
</script>
<template>
  <teleport to="body">
    <div v-show="show" class="center fixed left-0 top-0 box-border h-dvh w-dvw px-8">
      <div class="h-30 z-30 w-[20rem] max-w-[100%] rounded-2xl bg-white px-4">
        <div class="mb-7 mt-5 text-nowrap text-center font-semibold">{{ title }}</div>
        <div class="text-center">
          <button
            @click="$emit('cancel')"
            class="border-1 w-30 mr-4 box-border h-8 rounded-full border-[#0fb48b] text-center text-sm text-[#0fb48b]">
            取消
          </button>
          <button
            @click="$emit('sure')"
            class="border-1 linear-bg w-30 h-8 rounded-full text-center text-sm text-white">
            确定
          </button>
        </div>
      </div>
      <Background :show="show" inner @close="$emit('cancel')" />
    </div>
  </teleport>
</template>
<style></style>
