<script setup>
import TabMore from '@/packages/Tabs/TabMore.vue';

const tabs = [
  { "name": "首页", "value": "/" },
  { "name": "产品页", "value": "/about" },
  { "name": "产品页", "value": "/11" },
  { "name": "产品页", "value": "/22" },
  { "name": "关于我们", "value": "/about", "badge": 1 },
  { "name": "联系方式", "value": "/contact" },
  { "name": "美食推荐", "value": "/food" },
  { "name": "今日特价", "value": "/discount", "badge": 3 },
  { "name": "旅游攻略", "value": "/travel" },
  { "name": "电影资讯", "value": "/movies", "badge": 5 },
  { "name": "科技动态", "value": "/tech" },
  { "name": "健身计划", "value": "/fitness" },
  { "name": "读书笔记", "value": "/books" },
  { "name": "音乐推荐", "value": "/music", "badge": 2 },
  { "name": "时尚穿搭", "value": "/fashion" },
  { "name": "宠物天地", "value": "/pets" },
  { "name": "股票行情", "value": "/stocks" },
  { "name": "汽车评测", "value": "/cars", "badge": 1 },
  { "name": "游戏攻略", "value": "/games" },
  { "name": "健康养生", "value": "/health", default: true },
  { "name": "摄影技巧", "value": "/photography" },
  { "name": "编程教程", "value": "/coding" },
  { "name": "家居装饰", "value": "/home", "badge": 4 },
  { "name": "亲子教育", "value": "/parenting" },
  { "name": "职场技能", "value": "/career" },
  { "name": "搞笑段子", "value": "/jokes" },
  { "name": "历史趣闻", "value": "/history" },
  { "name": "天文探索", "value": "/astronomy", "badge": 1 },
  { "name": "菜谱大全", "value": "/recipes" },
  { "name": "二手市场", "value": "/second-hand" }
]
</script>

<template>
  <TabMore :tabs />
</template>
