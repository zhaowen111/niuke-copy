<script>
export default {
  props: {},
  data() {
    return {}
  },
}
</script>
<template>
  <div class="relative box-border h-full w-full bg-white p-2">
    <header class="fixed left-0 top-0 box-border flex h-12 w-full items-center justify-center px-2">
      <Icon @click="$router.go(-1)" class="absolute left-2" name="return" size="18" />
      <span class="font-semibold">搜索页面</span>
      <button class="py-1.25 absolute right-2 rounded-full px-4 text-sm text-[#aaa]">取消</button>
    </header>
  </div>
</template>
<style></style>
