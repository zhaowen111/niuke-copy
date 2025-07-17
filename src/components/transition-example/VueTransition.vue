<script>
import FadeTransition from './transition-example/FadeTransition.vue'

/***
 * 
1.不同的动画class
 v-enter-from：进入动画的起始状态。在元素插入之前添加，在元素插入完成后的下一帧移除。

v-enter-active：进入动画的生效状态。应用于整个进入动画阶段。在元素被插入之前添加，在过渡或动画完成之后移除。这个 class 可以被用来定义进入动画的持续时间、延迟与速度曲线类型。

v-enter-to：进入动画的结束状态。在元素插入完成后的下一帧被添加 (也就是 v-enter-from 被移除的同时)，在过渡或动画完成之后移除。

v-leave-from：离开动画的起始状态。在离开过渡效果被触发时立即添加，在一帧后被移除。

v-leave-active：离开动画的生效状态。应用于整个离开动画阶段。在离开过渡效果被触发时立即添加，在过渡或动画完成之后移除。这个 class 可以被用来定义离开动画的持续时间、延迟与速度曲线类型。

v-leave-to：离开动画的结束状态。在一个离开动画被触发后的下一帧被添加 (也就是 v-leave-from 被移除的同时)，在过渡或动画完成之后移除。

v-enter-active 和 v-leave-active 给我们提供了为进入和离开动画指定不同速度曲线的能力，我们将在下面的小节中看到一个示例。

2.给动画命名
<Transition name="fade">//template

  //css
  .fade-enter-active{
  }

3.动画时机：单个元素进入或离开dom时：
v-if、
v-show、
改变key属性、
<component>触发的组件动态切换

4.使用animation动画：在v-xx-active中传入动画属性和要使用的动画，然后像平时那样在@keyframe中定义动画
5.使用自定义过渡class：
 * <Transition
  name="custom-classes"
  enter-active-class="animate__animated animate__tada"
  leave-active-class="animate__animated animate__bounceOutRight"
>

6.在同时使用animation和transition时，需要用type属性显式告知你需要vue关心的是那种类型
<Transition type="animation">...</Transition>

7.对内部深层嵌套元素应用过渡
（1）过渡样式默认是设置在直接子元素上的
（2）必须要先设置外层元素的过渡样式，否则外层元素直接被移除，内层元素也会被移除，看不到过渡效果。
8.嵌套内层元素的动画，部分不生效问题
 当外层元素执行完毕class移除后，内层元素的css选择期也不匹配了，就没有动画了，Transition加上duration属性，可以让外层元素的class延迟移除，时间应该设置为外层+内层的总持续时间
  分别指定进入和离开的持续时间：<Transition :duration="{ enter: 500, leave: 800 }">...</Transition>

9.监听动画
<Transition
  @before-enter="onBeforeEnter"
  @enter="onEnter"
  @after-enter="onAfterEnter"
  @enter-cancelled="onEnterCancelled"
  @before-leave="onBeforeLeave"
  @leave="onLeave"
  @after-leave="onAfterLeave"
  @leave-cancelled="onLeaveCancelled"
>
  <!-- ... -->
</Transition>

10.过渡可以封装到组件里面


11.初次渲染时出现过渡：appear
  */

export default {
  props: {},
  components: {
    FadeTransition,
  },
  data() {
    return {
      show: true,
    }
  },
}
</script>
<template>
  <button @click="show = !show">切换</button>
  <FadeTransition>
    <div v-if="show" class="outer h-10 bg-green-200">
      <div class="inner">Hello here is some bouncy text!</div>
    </div>
  </FadeTransition>
  <Transition name="fade" :duration="1100"></Transition>
</template>
<style>
.bounce-enter-active {
  animation: bounce-in 0.5s;
}

.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}

@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}

.fade-enter-active .inner {
  transition: all 0.8s ease-out 0.3s;
}
.fade-leave-active .inner {
  transition: all 1s cubic-bezier(1, 0.5, 0.8, 1);
}

.fade-enter-from .inner,
.fade-leave-to .inner {
  opacity: 0;
  transform: translateX(50px);
}
</style>
