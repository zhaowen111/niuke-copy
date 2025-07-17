import { ref, computed } from 'vue'
import { defineStore } from 'pinia'
export const storeIds = {
  home: Symbol()
}
export const useHomeStore = defineStore(storeIds.home, () => {
  const recommendScroll = ref(0);

  return { recommendScroll }
})
