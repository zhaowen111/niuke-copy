<script setup>
import { RouterLink, RouterView, useRouter } from 'vue-router'
import Tabs from './packages/Tabs/Tabs.vue';
import LoadingPage from './packages/LoadingPage/LoadingPage.vue';
import img from '@/assets/loading.jpg';
//路由
const tabs = [{ name: '首页', value: "/", }, { name: '产品页', value: '/about' }, { name: '关于我们', value: 3, badge: 1 }, { name: '联系方式', value: 4 }]
const router = useRouter();



function handleTabChange(tab) {
  router.push(tab.value);
  if (tab.badge) {
    tab.badge = null;
  }
}
</script>

<template>
  <LoadingPage :img="img" canSkip></LoadingPage>
  <RouterView />
  <div class="fixed bottom-0 w-full bg-white">
    <Tabs :tabs @change="handleTabChange" default="/" />
  </div>

</template>

<style scoped>
header {
  line-height: 1.5;
  max-height: 100vh;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

nav {
  width: 100%;
  font-size: 12px;
  text-align: center;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }

  nav {
    text-align: left;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>
