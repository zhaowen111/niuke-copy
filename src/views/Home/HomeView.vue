<script>
import TabMore from '@/components/Home/TabMore.vue'
import DialogCard from '../../components/Home/DialogCard.vue'
import TabArea from '../../components/Home/TabArea.vue'
import gsap from 'gsap'
import SearchArea from '../../components/Home/SearchArea.vue'
import { RouterView } from 'vue-router'
import { tabType, defaultTabs, allTabItems, MyTabId } from '@/assets/mock/tabData'

export default {
  components: { TabMore, DialogCard, TabArea, SearchArea, RouterView },
  data() {
    return {
      allTabItems: allTabItems,
      tabAreaData: [],
      menuStyle: null,
      showTabArea: false,
      duration: 0.3,
      targets: {},
      parentPath: '',
    }
  },

  beforeRouteEnter(to, from, next) {
    const parentPath = to.fullPath.split('/')[1]

    next(vm => {
      vm.parentPath = parentPath
    })
  },
  computed: {
    tabs() {
      return defaultTabs.concat(this.allTabItems.filter(item => item.has))
    },
  },
  methods: {
    handleOpen() {
      const result = JSON.parse(JSON.stringify(tabType))
      this.allTabItems.forEach(item => {
        if (item.has) {
          result[MyTabId].tabs.push({ ...item })
        } else {
          result[item.type].tabs.push({ ...item })
        }
      })

      const my = result[MyTabId]
      delete result[MyTabId]
      this.tabAreaData = [my, result]
      this.$showMessage('haha', 3000)
    },
    handleTabChange(tab) {
      const routepath = `/${this.parentPath}${tab.value}`

      this.$router.push(routepath)
    },
    async handleClickItem(tab, index, cur, target) {
      this.targets[tab.type] = target
      tab.has = true

      this.tabAreaData[1][tab.type].tabs.splice(index, 1)
      await this.move(cur, this.targets[tabType[MyTabId].value], this.duration)
      this.tabAreaData[0].tabs.push(tab)
    },
    async handleDelete(tab, index, cur, target) {
      this.targets[tabType[MyTabId]] = target
      tab.has = false
      this.tabAreaData[0].tabs.splice(index, 1)
      await this.move(cur, this.targets[tab.type], this.duration)
      this.tabAreaData[1][tab.type].tabs.push(tab)
    },
    handleEditedTab() {
      const my = this.tabAreaData[0]
      const others = this.tabAreaData[1]
      let result = [...my.tabs]
      for (const key in others) {
        result = result.concat(others[key].tabs)
      }
      this.allTabItems = result
      this.showTabArea = !this.showTabArea
    },
    handleInit(ref, target) {
      this.targets[ref] = target
    },
    async exchangeItem(itemIndex, sourceRef, targetRef, sourceList, targetList) {
      const sourceData = sourceList.splice(itemIndex, 1)[0]
      const target = this.$refs[targetRef]
      const cur = this.$refs[sourceRef][0]
      await this.move(cur, target, this.duration)
      targetList.push(sourceData)
    },
    async move(el, target, duration) {
      const elRect = el.getBoundingClientRect()
      const targetRect = target.getBoundingClientRect()
      const x = targetRect.left - elRect.left
      const y = targetRect.top - elRect.top
      return gsap.to(el, {
        x,
        y,
        duration,
      })
    },
  },
}
</script>

<template>
  <div>
    <SearchArea />
    <div class="relative">
      <TabMore :tabs @change="handleTabChange" />
      <!-- 编辑板块 -->
      <div
        @click="showTabArea = !showTabArea"
        class="textwh bg-linear-to-r absolute right-0 top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-end from-[#d2faf233] to-[#b9f5fd]">
        <Icon class="mb-0.5" name="menu" size="18" />
      </div>
    </div>
    <RouterView></RouterView>
    <DialogCard @open="handleOpen" title="编辑板块" :show="showTabArea" @closePage="handleEditedTab">
      <TabArea
        v-if="tabAreaData.length"
        :extraRef="tabAreaData[0].value"
        :key="tabAreaData[0].value"
        v-bind="tabAreaData[0]"
        :dashed="false"
        deleteable
        @delete="handleDelete"
        @init="handleInit"></TabArea>
      <template v-if="tabAreaData.length">
        <TabArea
          :key="typedTab.value"
          v-for="typedTab in tabAreaData[1]"
          v-bind="typedTab"
          @clickItem="handleClickItem"
          @init="handleInit"
          :extraRef="typedTab.value"></TabArea>
      </template>
    </DialogCard>
  </div>
</template>
