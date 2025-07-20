<script>
import Icon from '@/packages/Icon.vue'

export default {
  components: { Icon },
  data() {
    return {}
  },
}
</script>
<template>
  <div class="relative box-border h-full w-full bg-white p-2">
    <header class="fixed left-0 top-0 box-border flex h-12 w-full items-center justify-center px-2">
      <Icon @click="$router.go(-1)" class="absolute left-2" name="return" size="18" />
      <span class="font-semibold">AI智搜</span>
    </header>
    <main class="no-scrollbar box-border h-full overflow-y-scroll pt-12">
      <div class="flex h-full items-center justify-center">
        <div class="text-center">
          <div class="mb-4 text-2xl font-bold text-gray-800">AI智搜</div>
          <div class="text-gray-600">智能搜索功能开发中...</div>
        </div>
      </div>
    </main>
  </div>
</template>
<style></style> 