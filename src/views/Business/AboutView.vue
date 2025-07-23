<script setup>
import { threeTabs } from '@/assets/mock/tabData'
import Page from '@/components/Common/Page.vue'
import { shallowRef } from 'vue'

const tabs = shallowRef(threeTabs)
</script>
<template>
  <Page :tabs></Page>
</template>
<style scoped></style>
