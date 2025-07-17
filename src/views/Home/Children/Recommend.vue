<script>
import { posts } from '@/assets/mock/posts'
import Posts from '@/components/Home/Recommend/Posts.vue'
export default {
  props: {},
  components: {
    Posts,
  },
  data() {
    return {
      post: posts[0],
    }
  }, 
}
</script>

<template>
  <div>
    <Posts :post="post"></Posts>
  </div>
</template>

<style scoped></style>
