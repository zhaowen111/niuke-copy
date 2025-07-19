<script>
import SearchBox from './SearchBox.vue'
import Background from '@/packages/Dialog/Background.vue'

export default {
  props: {},
  components: {
    SearchBox,
    Background,
  },
  data() {
    return {
      showDialog: false,
      saoStyle: null,
      fabuStyle: null,
    }
  },
  async created() {},
  methods: {
    handleClickXinzi() {},
    handleClickMore() {
      this.showDialog = true
    },
  },
}
</script>
<template>
  <div class="relative flex h-12 items-center justify-between p-2 pb-0">
    <SearchBox></SearchBox>
    <div class="flex h-full items-center">
      <div @click="handleClickXinzi" class="ml-2 flex h-full flex-col items-center justify-end">
        <Icon name="xinzi" size="15"></Icon>
        <div class="mt-1 scale-75 text-xs text-[#6c7b7e]">查薪资</div>
      </div>
      <div @click="handleClickMore" class="ml-2 flex h-full flex-col items-center justify-end">
        <Icon
          :style="{ transform: showDialog ? `rotate(-45deg)` : 'rotate(-90deg)' }"
          class="more"
          name="more"
          size="18"></Icon>
        <div class="mt-1 scale-75 text-xs text-[#6c7b7e]">更多</div>
      </div>
      <transition name="card">
        <div v-show="showDialog" class="more-card w-30 absolute right-2 top-[110%] z-20 rounded-xl bg-white p-2">
          <div class="flex items-center border-b border-[#ddd] py-2 text-xs">
            <Icon class="mx-2" name="sao" size="18" />
            <div>扫一扫</div>
          </div>
          <div class="flex items-center py-2 text-xs">
            <Icon class="mx-2" name="fabu" size="18" />
            <div>发布</div>
          </div>
        </div>
      </transition>
    </div>
    <Background :show="showDialog" @close="showDialog = !showDialog"></Background>
  </div>
</template>
<style>
.card-enter-from,
.card-leave-to {
  transform: scale(0);
}
.card-enter-active,
.card-leave-active {
  transition: all 0.3s;
  transform-origin: right top;
}

.more {
  transition: transform 0.3s;
}
</style>
