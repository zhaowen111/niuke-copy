<script setup>
import { RouterView, useRouter, useRoute } from 'vue-router'
import Tabs from '@/packages/Tabs/Tabs.vue'
import LoadingPage from '@/packages/LoadingPage/LoadingPage.vue'
import img from '@/assets/icon/loading.jpg'
import { bottomTabs as tabs } from '@/assets/mock/tabData'
import { computed, onMounted, ref, watch } from 'vue'
import { keys, useHomeStore } from './stores/store'
//路由

const showLoading = ref(true)

onMounted(() => {
  // showLoading.value = false
})

const router = useRouter()
const route = useRoute()
//处理底部tab栏路由导航
function handleTabChange(tab) {
  const lastPath = route.fullPath.split('/')[1]
  //如果跳转路由和之前路由相同则退出
  if (lastPath === tab.value.slice(1)) return
  router.push(tab.value)
}

//管理底部tab的显示和隐藏
const hiddenBottomTab = ref(false)
watch(
  () => route.meta,
  val => {
    hiddenBottomTab.value = val && val.fullscreen
  },
)
</script>

<template>
  <!-- <LoadingPage :img="img" :show="showLoading"></LoadingPage> -->

  <div class="bg-linear-to-r h-dvh w-dvw overflow-hidden from-[#d2faf2] to-[#b9f5fd]">
    <!-- <img class="fixed top-0 left-0 opacity-40"  src="/test.jpg"></img> -->
    <div class="overflow-hidden" :style="{ height: hiddenBottomTab ? '100%' : 'calc(100% - 3.75rem)' }">
      <RouterView v-slot="{ Component }">
        <!-- <FadeTransition> -->
        <KeepAlive>
          <component :is="Component" />
        </KeepAlive>
        <!-- </FadeTransition> -->
      </RouterView>
    </div>

    <div v-show="!hiddenBottomTab" class="h-15 fixed bottom-0 w-full bg-white">
      <Tabs :tabs @change="handleTabChange" default="/" />
    </div>
  </div>
</template>
