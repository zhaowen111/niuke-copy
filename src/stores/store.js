import { defineStore } from 'pinia'
export const storeIds = {
  home: "Home"
}
export const keys = {
  recommendScroll: 'recommendScroll',
  HiddenBottomTabBar: 'HiddenBottomTabBar'
}
export const useHomeStore = defineStore(storeIds.home, {
  state: () => {
    return {
      [keys.recommendScroll]: 0,
      [keys.HiddenBottomTabBar]: false
    }
  }
})
