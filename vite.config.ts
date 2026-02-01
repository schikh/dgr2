import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { VitePWA } from 'vite-plugin-pwa';
import { copyFileSync, mkdirSync, readdirSync } from 'fs';
import { join } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  //base: '/dgr2/',     // <-- include leading & trailing slashes
  plugins: [
    react(),
    // Copy goods and companies folders to dist
    {
      name: 'copy-assets',
      closeBundle() {
        const copyDir = (src: string, dest: string) => {
          mkdirSync(dest, { recursive: true });
          const files = readdirSync(src);
          files.forEach(file => {
            if (!file.endsWith('.js') && !file.endsWith('.css')) {
              copyFileSync(join(src, file), join(dest, file));
            }
          });
        };
        copyDir('companies', 'dist/companies');
        copyDir('goods', 'dist/goods');
      }
    },
    VitePWA({
      registerType: 'autoUpdate',
      includeAssets: ['companies/*.png', 'goods/*.png', 'goods.json'],
      manifest: {
        name: 'DGR Exclusion',
        short_name: 'DGR',
        description: 'DGR Exclusion Progressive Web Application',
        theme_color: '#1a1a1a',
        background_color: '#1a1a1a',
        display: 'standalone',
        icons: [
          {
            src: '/icon.svg',
            sizes: '192x192',
            type: 'image/svg+xml'
          },
          {
            src: '/icon.svg',
            sizes: '512x512',
            type: 'image/svg+xml'
          }
        ]
      },
      workbox: {
        globPatterns: ['**/*.{js,css,html,png,json}'],
        runtimeCaching: [
          {
            urlPattern: /^https:\/\/cdn\.jsdelivr\.net\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'bootstrap-cache',
              expiration: {
                maxEntries: 10,
                maxAgeSeconds: 60 * 60 * 24 * 365 // 1 year
              },
              cacheableResponse: {
                statuses: [0, 200]
              }
            }
          }
        ]
      }
    })
  ],
  publicDir: 'public'
});
