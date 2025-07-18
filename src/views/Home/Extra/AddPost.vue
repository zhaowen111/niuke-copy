<script>
export default {
  props: {},
  data() {
    return {
      title: '',
      maxTitleLength: 50,
      postContent: '',
      images: {},
    }
  },
  methods: {
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
  },
}
</script>
<template>
  <div class="relative box-border h-full w-full bg-white p-2">
    <header class="fixed left-0 top-0 box-border flex h-12 w-full items-center justify-center px-2">
      <Icon @click="$router.go(-1)" class="absolute left-2" name="return" size="18" />
      <span class="font-semibold">发动态</span>
      <button class="py-1.25 absolute right-2 rounded-full bg-[#06f4ba] px-4 text-sm text-white">发布</button>
    </header>
    <!-- content edit area -->
    <main class="mt-12 px-2">
      <!-- 标题 -->
      <div class="title border-b-1 relative h-8 border-[#eee]">
        <input
          v-model="title"
          class="w-full"
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
          class="min-h-30 w-full pt-2 text-sm"></textarea>
      </div>
      <!-- image -->
      <div class="grid grid-cols-3 gap-2 sm:grid-cols-4 md:grid-cols-5">
        <transition-group name="image">
          <div :key="image.id" v-for="image in images" class="relative aspect-square">
            <img :src="image.value" :alt="image.name" class="size-full rounded-[8px]" />
            <div
              @click.stop="handleDeleteImg(image)"
              class="center absolute right-2 top-2 size-5 rounded-full bg-[#000b]">
              <Icon name="close-white" size="15" />
            </div>
          </div>

          <div
            key="addImage"
            @click="triggerFileInput"
            class="add-image center aspect-square size-full rounded-[8px] bg-[#eee]">
            <Icon name="add" size="30" />
            <input type="file" accept="image/*" @change="handleFileUpload" style="display: none" ref="fileInput" />
          </div>
        </transition-group>
      </div>
    </main>
    <footer>
      <!-- tools 1 -->
      <div></div>
      <!-- tools 2 -->
      <div></div>
      <!--  发布按钮-->
      <button></button>
    </footer>
  </div>
</template>
<style scoped>
.image-move {
  transition: all 0.3s;
}
</style>
