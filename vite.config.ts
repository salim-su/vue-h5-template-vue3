import { createVitePlugins } from './build/vite/plugins';
import { resolve } from 'path';
import { ConfigEnv, loadEnv, UserConfig } from 'vite';
import { wrapperEnv } from './build/utils';
// import init from './build/vite/proxy';

const pathResolve = (dir: string) => {
  return resolve(process.cwd(), '.', dir);
};

// https://vitejs.dev/config/
export default function ({ command, mode }: ConfigEnv): UserConfig {
  const isProduction = command === 'build';
  const root = process.cwd();
  const env = loadEnv(mode, root);
  const viteEnv = wrapperEnv(env);

  return {
    root,
    resolve: {
      alias: [
        {
          find: 'vue-i18n',
          replacement: 'vue-i18n/dist/vue-i18n.cjs.js',
        },
        // @/xxxx => src/xxxx
        {
          find: /@\//,
          replacement: pathResolve('src') + '/',
        },
        // #/xxxx => types/xxxx
        {
          find: /#\//,
          replacement: pathResolve('types') + '/',
        },
      ],
    },
    server: {
      host: true,
      hmr: true,
      https: false,
      proxy: {
        '/api/tjpn4-handle-tally': {
          target: 'http://localhost:8097',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tjpn4-handle-tally/, '/'),
        },
        '/api/tjpn4-smart-gate': {
          target: 'http://10.10.21.252/api/tjpn4-smart-gate',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/api\/tjpn4-smart-gate/, '/'),
        },
        '/api': {
          target: 'http://10.10.21.252/api', // 目标服务器地址
          changeOrigin: true, // 是否改变源地址
          rewrite: (path) => path.replace(/^\/api/, '/'), // 重写路径
        },
      },
    },
    plugins: createVitePlugins(viteEnv, isProduction),
    build: {
      minify: 'terser',
      terserOptions: {
        compress: {
          //生产环境时移除console
          drop_console: true,
          drop_debugger: true,
        },
      },
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 配置 nutui 全局 scss 变量
          additionalData: `@import "@nutui/nutui/dist/styles/variables.scss";@import '@/styles/mixin.scss'; @import '@/styles/vant.scss';`,
        },
      },
    },
  };
}
