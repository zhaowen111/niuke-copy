<script>
import { topics } from '@/assets/mock/posts'
import DialogCard from '@/packages/Dialog/DialogCard.vue'
import TouPiao from './TouPiao.vue'
import DeleteBtn from '@/packages/DeleteBtn.vue'
import Confirm from '@/packages/Confirm.vue'
Confirm
export default {
  props: {},
  components: { DialogCard, TouPiao, DeleteBtn, Confirm },
  data() {
    return {
      title: '',
      maxTitleLength: 50,
      postContent: '',
      images: {},
      topics,
      aiImageMinText: 50,
      // 工具栏1
      featuresA: {
        1: { iconName: 'AI_1', text: 'AI配图', id: 1, open: false },
        2: { iconName: 'toupiao', text: '投票', id: 2, open: false },
        3: { iconName: 'xinzi_1', text: '爆薪资', id: 3, open: false },
        4: { iconName: 'neitui', text: '发内推', id: 4, open: false },
      },
      vote: null,
      showConfirmDeleteVote: false,
    }
  },
  computed: {
    showAIImage: {
      get() {
        return this.featuresA[1].open
      },
      set(val) {
        this.featuresA[1].open = val
      },
    },
    showToupiao: {
      get() {
        return this.featuresA[2].open
      },
      set(val) {
        this.featuresA[2].open = val
      },
    },

    showBaoxinzi: {
      get() {
        return this.featuresA[3].open
      },
      set(val) {
        this.featuresA[3].open = val
      },
    },
    showNeitui: {
      get() {
        return this.featuresA[4].open
      },
      set(val) {
        this.featuresA[4].open = val
      },
    },
  },
  methods: {
    // 投票
    handleVoteUpdate(vote) {
      console.log(111)

      this.vote = vote
      this.showToupiao = false
    },
    handleDeleteVote() {
      this.showConfirmDeleteVote = true
    },
    handleConfirmDeleteVote() {
      this.vote = null
      this.showConfirmDeleteVote = false
    },
    //图片上传
    handleAddImage() {
      this.$message('添加图片', 500)
    },
    handleFileUpload(event) {
      const file = event.target.files[0]
      if (!file) return

      const filename = file.name || ''
      const id = filename + file.size
      // 处理图片文件（预览/上传）
      console.log('Selected file:', file)
      const reader = new FileReader()
      reader.onload = e => {
        // 显示图片预览（可选）
        this.images[id] = { id, name: filename, value: e.target.result }
        event.target.value = ''
      }
      reader.readAsDataURL(file)
    },
    triggerFileInput() {
      this.$refs['fileInput'].click()
    },
    handleDeleteImg(image) {
      const images = this.images
      delete images[image.id]
      this.images = images
    },
    openFeatureA(feature) {
      //AI配图需要先判断内容文字大于三十
      if (feature.id === 1) {
        if (this.postContent.length < this.aiImageMinText) {
          return this.$message(`至少${this.aiImageMinText}字，才可使用AI配图，继续完善内容吧`)
        }
      }

      this.featuresA[feature.id].open = true
    },
    handleAddTopic(topic) {
      this.postContent += `#${topic}#`
    },
  },
}
</script>
<template>
  <div class="relative box-border h-full w-full bg-white p-2">
    <header class="fixed left-0 top-0 box-border flex h-12 w-full items-center justify-center bg-white px-2">
      <Icon @click="$router.go(-1)" class="absolute left-2" name="return" size="18" />
      <span class="font-semibold">发动态</span>
      <button class="py-1.25 absolute right-2 rounded-full bg-[#06f4ba] px-4 text-sm text-white">发布</button>
    </header>
    <!-- 内容编辑区域 area -->
    <main class="no-scrollbar pb-30 box-border h-full overflow-y-scroll px-2 pt-12">
      <!-- 标题 -->
      <div class="title border-b-1 relative h-8 border-[#eee]">
        <input
          v-model="title"
          class="box-border w-full pr-12"
          :class="title && 'font-semibold'"
          :maxlength="maxTitleLength"
          type="text"
          placeholder="好的标题会让更多人看到哦~" />
        <div class="absolute right-0 top-0 text-[#a7a8aa]">{{ title.length + '/' + maxTitleLength }}</div>
      </div>

      <!-- 正文 -->
      <div>
        <textarea
          v-model="postContent"
          name="content"
          id="content"
          placeholder="此刻的你想和大家分享什么..."
          class="min-h-30 my-2 w-full text-sm leading-6"></textarea>
      </div>

      <!-- 图片上传 -->
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        <transition-group name="image">
          <div :key="image.id" v-for="image in images" class="relative aspect-square">
            <img :src="image.value" :alt="image.name" class="size-full rounded-[0.5rem]" />
            <div
              @click.stop="handleDeleteImg(image)"
              class="center absolute right-2 top-2 size-5 rounded-full bg-[#000b]">
              <Icon name="close-white" size="15" />
            </div>
          </div>

          <div
            key="addImage"
            @click="triggerFileInput"
            class="add-image center aspect-square size-full rounded-[0.5rem] bg-[#eee]">
            <Icon name="add" size="30" />
            <input type="file" accept="image/*" @change="handleFileUpload" style="display: none" ref="fileInput" />
          </div>
        </transition-group>
      </div>

      <!-- 额外创建内容的展示区域 -->
      <div class="mt-4">
        <!-- 投票内容 -->
        <div
          @click="showToupiao = true"
          v-if="vote"
          class="centery relative mt-2 box-border h-10 rounded-sm bg-[#eee] px-2">
          <Icon name="vote"></Icon>
          <span class="ml-1 text-sm">投票</span>
          <DeleteBtn @delete="handleDeleteVote" class="expand-click-area-3 right-3" size="16" />
        </div>
      </div>
    </main>

    <!-- 页脚工具栏区域 -->
    <footer class="fixed bottom-0 left-0 box-border w-full bg-white p-2">
      <!-- 工具栏一 -->
      <div class="flex flex-wrap items-center">
        <div
          @click="openFeatureA(feature)"
          class="first:border-1 group mb-2 mr-2 flex items-center rounded-full bg-[#eeec] px-2 py-1 text-xs first:scale-95 first:border-blue-300 first:bg-blue-50"
          v-for="feature in featuresA"
          :key="feature.id">
          <Icon :name="feature.iconName" size="13" class="mr-1 inline-block group-first:mb-[3px]"></Icon>
          <span class="text-nowrap">{{ feature.text }}</span>
        </div>
      </div>
      <!-- 工具栏二 -->
      <div class="my-2 flex h-10 w-full items-center">
        <div class="capsule">
          <Icon name="moban" size="15" class="mr-1 inline-block" />
          模板
        </div>
        <!-- split -->
        <div class="split"></div>
        <div class="capsule">
          <Icon name="huati" size="14" class="mr-1 inline-block" />
          <span>话题</span>
          <Icon name="tri" size="15" class="mb-[1px] inline-block rotate-90" />
        </div>

        <div class="no-scrollbar ml-2 box-border flex-1 overflow-x-scroll">
          <div class="flex items-center">
            <div
              @click="handleAddTopic(topic.topic_content)"
              class="capsule text-nowrap text-[#aaa]"
              v-for="topic in topics"
              :key="topic.topic_id">
              {{ '#' + topic.topic_content }}
            </div>
          </div>
        </div>
      </div>
      <!--  发布按钮-->
      <button class="linear-bg h-10 w-full rounded-full font-semibold text-white">发布</button>
    </footer>

    <!-- 弹窗内容区域 -->
    <DialogCard title="AI配图" :show="showAIImage" @close="showAIImage = false">
      <TouPiao></TouPiao>
    </DialogCard>
    <DialogCard title="发布投票" :show="showToupiao" @close="showToupiao = false">
      <TouPiao :votes="vote" @update="handleVoteUpdate"></TouPiao>
    </DialogCard>
    <DialogCard title="爆薪资" :show="showBaoxinzi" @close="showBaoxinzi = false">
      <TouPiao></TouPiao>
    </DialogCard>
    <DialogCard title="发内推" :show="showNeitui" @close="showNeitui = false">
      <TouPiao></TouPiao>
    </DialogCard>
    <Confirm
      :show="showConfirmDeleteVote"
      title="是否删除当前投票"
      @cancel="showConfirmDeleteVote = false"
      @sure="handleConfirmDeleteVote" />
  </div>
</template>
<style scoped>
.image-move {
  transition: all 0.3s;
}
</style>
