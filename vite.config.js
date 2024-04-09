import { resolve } from 'path'
import { defineConfig } from 'vite'

export default defineConfig({
    assetsInclude: [
        'src/*'
    ],
    base: '/profile',
    build: {
        rollupOptions: {
            input: {
                main: resolve(__dirname, 'index.html'),
                sandV2: resolve(__dirname, 'sand-v2.html'),
                sandV1: resolve(__dirname, 'sand.html'),
            },
        },
    },

})