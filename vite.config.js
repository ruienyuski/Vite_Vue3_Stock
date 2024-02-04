import UnoCSS from 'unocss/vite'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    host:'127.0.0.1',
    port:8080
  },
  base: '/Vite_Vue3_Stock/',
  plugins: [UnoCSS(),vue()],
})
