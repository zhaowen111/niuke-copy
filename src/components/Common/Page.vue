<script setup>
import TabMore from '@/components/Home/TabMore.vue'
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
defineProps({ tabs: Array })

//tabMore

const childPath = ref('')
const tabDirection = ref('right')
const handleTabChange = (tab, direction) => {
  tabDirection.value = direction
  const parentPath = route.fullPath.split('/')[1]
  const routepath = `/${parentPath}${tab.value}`
  childPath.value = tab
  router.push(routepath)
}
</script>
<template>
  <div class="h-full overflow-hidden">
    <div v-if="$slots.default" class="h-12">
      <slot class="h-12"></slot>
    </div>
    <TabMore :tabs @change="handleTabChange" class="h-10" />
    <!-- 页面内容 -->
    <div
      class="relative box-border overflow-hidden pb-2"
      :style="{ height: $slots.default ? 'calc(100% - 5.5rem)' : 'calc(100% - 2.5rem)' }">
      <RouterView v-slot="{ Component }">
        <transition :name="tabDirection">
          <KeepAlive>
            <component :is="Component" class="absolute" />
          </KeepAlive>
        </transition>
      </RouterView>
    </div>
  </div>
</template>
<style scoped>
.right-leave-active,
.right-enter-active,
.left-leave-active,
.left-enter-active {
  transition: transform 0.1s;
}

.left-enter-from {
  transform: translateX(-100%);
}

.left-leave-to {
  transform: translateX(100%);
}

.right-enter-from {
  transform: translateX(100%);
}

.right-leave-to {
  transform: translateX(-100%);
}
</style>
