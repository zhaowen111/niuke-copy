<script>
export default {
  components: {},
  props: {},
  data() {
    return {
      play: true,
    }
  }, // 初始化阶段
}
</script>
<template>
  <div>
    <transition name="test">
      <div v-show="play" class="overflow-hidden text-orange-600">
        外就是软件工程没有银弹，一种优化方案可能适用于大多数项目，但是某些特殊情况下很可能会起反效果。
        举个🌰，由于浏览器有单域名下并发请求限制，通常我们会将依赖统一打成一个vendor包（vue-cli默认策略），减少首屏请求数，且依赖不变动的情况下文件指纹不变，可以有效利用304缓存。在依赖不多的情况这么处理确实有助于提升加载速度，但一旦依赖多起来，vendor就会特别的大，在弱网条件下，会严重拖慢页面显示。这显然不是我们想要的，所以我们根据情况会对vendor进行拆分，比如拆分到CDN，或者直接拆分到页面中
        因此，我们在做性能优化过程中，必须根据最终能给用户体验带来的提升权衡后做出适合当前项目的选 作者：夜雪暮歌
        链接：https://juejin.cn/post/6949896020788690958 来源：稀土掘金
        著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
      </div>
    </transition>
    <button @click="play = !play">切换</button>
  </div>
</template>
<style>
.test-enter-from,
.test-leave-to {
  max-height: 0;
}

.test-enter-to,
.test-leave-from {
  max-height: 500px;
}

.test-enter-active,
.test-leave-active {
  transition: all 0.3s;
}
</style>
