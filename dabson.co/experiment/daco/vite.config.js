import { fileURLToPath, URL } from 'node:url'

import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'

//const base = import.meta.env.VITE_BASE_URL || '/'
//const base = 'https://dabson.co/experiment/daco/dist'

// https://vite.dev/config/
export default defineConfig((command, mode) => {
  const env = loadEnv(mode, process.cwd(), '');
  const base = env.VITE_BASE_URL || '/';

  return {
    base,
    plugins: [
      vue(),
      vueDevTools(),
    ],
    resolve: {
      alias: {
        '@': fileURLToPath(new URL('./src', import.meta.url))
      },
    },
    build: {
      rollupOptions: {
        output: {
          assetFileNames: 'assets/img/[name][extname]',
          chunkFileNames: 'assets/js/[name]-[hash].js',
          entryFileNames: 'assets/js/[name]-[hash].js',
        }
      }
    }
  };
})
