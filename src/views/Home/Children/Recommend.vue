<script>
import { posts } from '@/assets/mock/posts'
import ReduceRecommend from '@/components/Common/ReduceRecommend.vue'
import Posts from '@/components/Home/Recommend/Posts.vue'
import LifeCycleMixin from '@/components/Common/LifeCycleMixin.vue'
import { findItem, throttle } from '@/utils/utils'
import { useHomeStore } from '@/stores/counter'
import { mapState, mapWritableState } from 'pinia'

export default {
  props: {},
  components: {
    ReduceRecommend,
    Posts,
  },
  computed: {
    ...mapWritableState(useHomeStore, 'scrollTop'),
  },
  data() {
    return {
      posts,
      showReduceRecommend: false,
      reduceId: -1,
    }
  },
  activated() {
    const container = this.$refs['recommendContainer']
    container.scrollTop = this.scrollTop
  },
  methods: {
    handleCloseReduce() {
      this.showReduceRecommend = false
    },
    handleClickReduce(val) {
      this.reduceId = val
      this.showReduceRecommend = true
    },
    handleReduce(val) {
      this.showReduceRecommend = false
      if (val) {
        console.log(val)
        const postKey = findItem(this.reduceId, 'id', posts)
        if (postKey) {
          this.posts.splice(postKey, 1)
          this.$message('感谢反馈，将减少此类内容推荐')
        }
      }
    },
    handleScroll: throttle(function (event) {
      if (!event.target) return
      this.scrollTop = event.target.scrollTop
      console.log(this.scrollTop)
    }, 200),
    handleZan(val, item) {
      item.stats.likes = val
    },
  },
}
</script>

<template>
  <div class="h-full overflow-y-scroll" ref="recommendContainer" @scroll.self="handleScroll">
    <div>
      <Posts
        :post="item"
        v-for="item in posts"
        @openReduce="handleClickReduce"
        @zan="val => handleZan(val, item)"></Posts>
    </div>
    <ReduceRecommend
      :show="showReduceRecommend"
      :topic="{ value: 1, text: '牛油故事会' }"
      @reduce="handleReduce"
      @close="handleCloseReduce" />
  </div>
</template>

<style scoped></style>
