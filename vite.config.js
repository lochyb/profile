import { defineConfig } from 'vite'

export default defineConfig({
    assetsInclude: [
        'src/*'
    ],
    base: '/profile/',
    build: {
        rollupOptions: {
          input: {
            home: 'index.html',
            sand: 'sand.html'
          }
        }
      }
})