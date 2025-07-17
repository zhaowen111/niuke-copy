<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Tabs from '@/packages/Tabs/Tabs.vue'
import LoadingPage from '@/packages/LoadingPage/LoadingPage.vue'
import img from '@/assets/icon/loading.jpg'
import FadeTransition from './components/transition-example/FadeTransition.vue'
import { bottomTabs as tabs } from '@/assets/mock/tabData'
//路由

const router = useRouter()

function handleTabChange(tab) {
  router.push(tab.value)
}
</script>

<template>
  <!-- <LoadingPage :img="img" canSkip></LoadingPage> -->

  <div class="bg-linear-to-r h-dvh w-dvw overflow-hidden from-[#d2faf2] to-[#b9f5fd]">
    <!-- <img class="fixed top-0 left-0 opacity-40"  src="/test.jpg"></img> -->
    <RouterView v-slot="{ Component }">
      <FadeTransition>
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
      </FadeTransition>
    </RouterView>
    <div class="fixed bottom-0 w-dvw bg-white">
      <Tabs :tabs @change="handleTabChange" default="/" />
    </div>
  </div>
</template>
