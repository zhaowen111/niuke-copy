<script>
import PlaceHolderTransition from '@/packages/SearchBox/PlaceHolderTransition.vue'

export default {
  components: { PlaceHolderTransition },
  props: {},
  data() {
    return { placeholders: ['薪资', '大疆', '华为', '拼多多内推', '云徙科技'] }
  },
  methods: {
    handleClickSearch() {
      this.$router.push({ name: 'HomeSearch' })
    },
  },
}
</script>
<template>
  <div @click="handleClickSearch" class="relative mx-1 flex h-10 flex-auto items-center overflow-hidden">
    <input class="h-7 w-full rounded-full bg-white" />
    <Icon class="absolute ml-2" name="search" size="18" />
    <PlaceHolderTransition class="left-8" :placeholders="placeholders" :duration="1000" />
    <div class="absolute right-2 flex items-center rounded-md bg-[#d2fcfd] px-1 py-0.5">
      <Icon name="AI" size="18" />
      <span class="pl-1 text-xs text-[#a7a7a7]">智搜</span>
    </div>
  </div>
</template>
