<script>
import TabMore from '@/components/Home/TabMore.vue'
import DialogCard from '../../packages/Dialog/DialogCard.vue'
import TabArea from '../../components/Home/TabArea.vue'
import gsap from 'gsap'
import SearchArea from '../../components/Home/SearchArea.vue'
import { RouterView } from 'vue-router'
import { tabType, defaultTabs, allTabItems, MyTabId } from '@/assets/mock/tabData'
import { defaultHomeChildPath, defaultHomePath } from '@/router'

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
      childPath: '',
      tabChangeDirection: 'right',
      max: 8, //额外tab栏上限
    }
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      if (vm.childPath) {
        vm.handleTabChange(this.childPath)
      } else {
        vm.handleTabChange({ value: '/' + defaultHomeChildPath })
      }
    })
  },
  beforeRouteUpdate(to, from) {
    //处理从其他页面路由到home,有缓存的二级路由则跳转，否则跳转默认的
    if (!from.fullPath.startsWith(defaultHomePath)) {
      if (this.childPath) {
        this.handleTabChange(this.childPath)
      } else {
        this.handleTabChange({ value: '/' + defaultHomeChildPath })
      }
    }
  },
  watch: {
    // $route(to, from) {
    //   if (!to) return
    //   console.log(to.fullPath)
    // },
  },
  computed: {
    tabs() {
      return defaultTabs.concat(this.allTabItems.filter(item => item.has))
    },
  },
  methods: {
    // 处理二级路由跳转
    handleTabChange(tab, direction) {
      this.tabChangeDirection = direction
      const parentPath = this.$route.fullPath.split('/')[1]
      const routepath = `/${parentPath}${tab.value}`
      this.childPath = tab
      this.$router.push(routepath)
    },
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
    },

    async handleClickItem(tab, index, cur, target) {
      if (this.tabAreaData[0].tabs.length >= this.max) {
        this.$message(`最多选择${this.max}个标签哦~`, 1500)
        return
      }

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
    handleOpenAddPost() {
      this.$router.push({ name: 'AddPost' })
    },
  },
}
</script>

<template>
  <div class="h-full overflow-hidden">
    <div class="h-22 w-full">
      <SearchArea />
      <div class="relative">
        <TabMore :tabs @change="handleTabChange" class="h-10" />
        <!-- 按钮-编辑板块 -->
        <div
          @click="showTabArea = !showTabArea"
          class="textwh bg-linear-to-r absolute right-0 top-1/2 flex h-[40px] w-[40px] -translate-y-1/2 items-center justify-end from-[#d2faf233] to-[#b9f5fd]">
          <Icon class="mb-0.5" name="menu" size="18" />
        </div>
      </div>
    </div>

    <!-- 页面内容 -->
    <div class="relative box-border overflow-hidden pb-2" :style="{ height: 'calc(100% - 5.5rem)' }">
      <RouterView v-slot="{ Component }">
        <transition :name="tabChangeDirection">
          <KeepAlive>
            <component :is="Component" class="absolute" />
          </KeepAlive>
        </transition>
      </RouterView>
    </div>

    <!-- 发帖按钮 -->
    <div
      @click="handleOpenAddPost"
      class="bottom-18 fixed right-2 flex size-12 items-center justify-center rounded-full bg-[#06f4ba] pb-1 text-[40px] text-white">
      +
    </div>

    <!-- 弹窗-编辑tab内容 -->
    <DialogCard @open="handleOpen" title="编辑板块" :show="showTabArea" @close="handleEditedTab">
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
