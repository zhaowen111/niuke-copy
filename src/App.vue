<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Tabs from '@/packages/Tabs/Tabs.vue'
import LoadingPage from '@/packages/LoadingPage/LoadingPage.vue'
import img from '@/assets/icon/loading.jpg'
import FadeTransition from './components/transition-example/FadeTransition.vue'
import { bottomTabs as tabs } from '@/assets/mock/tabData'
import { onMounted, ref } from 'vue'
//路由

const router = useRouter()
const showLoading = ref(true)
onMounted(() => {
  // showLoading.value = false
})

function handleTabChange(tab) {
  router.push(tab.value)
}
</script>

<template>
  <!-- <LoadingPage :img="img" :show="showLoading"></LoadingPage> -->

  <div class="bg-linear-to-r h-dvh w-dvw overflow-hidden from-[#d2faf2] to-[#b9f5fd]">
    <!-- <img class="fixed top-0 left-0 opacity-40"  src="/test.jpg"></img> -->
    <div class="overflow-hidden" :style="{ height: 'calc(100% - 3.75rem)' }">
      <RouterView v-slot="{ Component }">
        <!-- <FadeTransition> -->
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
        <!-- </FadeTransition> -->
      </RouterView>
    </div>

    <div class="h-15 fixed bottom-0 w-full bg-white">
      <Tabs :tabs @change="handleTabChange" default="/" />
    </div>
  </div>
</template>
