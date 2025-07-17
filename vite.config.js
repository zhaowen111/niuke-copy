import { fileURLToPath, URL } from 'node:url'
import tailwindcss from '@tailwindcss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import TurboConsole from 'unplugin-turbo-console/vite'
// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    vueDevTools(),
    tailwindcss(),
    {
      ...TurboConsole({

      }),
      apply: 'build'
    }

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    },
  },
  base: process.env.NODE_ENV === 'production'
    ? '/niuke-copy/'  // 替换为你的仓库名
    : '/'
})
