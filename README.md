# vue3 仿写牛客网前端(持续实现中...)

- 仅供前端学习交流，请勿用于其他用途。
- 只实现前端部分，无任何后端实现，示例数据使用简单的mock数据。可直接部署静态网站。
- 牛客网整个app内容非常丰富，时间有限，加上仿写的目的是练习实践，所以只实现比较有代表性的技术/功能点
- 技术栈：
  - Vue3
  - Pinia
  - Vue Router
  - Vite

## 包含的技术点：
- rem等比缩放适配不同屏幕
- 底部tab路由、页面内二级路由的布局适配+可配置页面全屏
- 路由切换动画（与切换方向保持一致）
- 路由切换时保持页面状态
- 元素跨列表移动动画
- 图片上传预览
- 图片load完成前显示骨架屏
- svg图标自动引入、复杂动画效果图标
- placeholder循环切换


## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [vue offical](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
pnpm install
```

### Compile and Hot-Reload for Development

```sh
pnpm dev
```

### Compile and Minify for Production

```sh
pnpm build
```
