import { createApp } from 'vue';
import App from './App.vue';
import { i18n } from '@/i18n';
import router from '@/router';
import store from '@/store';
import './assets/font/iconfont.css';
import './assets/app.scss';
import './assets/project.scss';
import 'vant/es/toast/style';
import 'vant/es/notify/style';

// import '@nutui/nutui/dist/style';
// import '@nutui/nutui/dist/style.css';
// import '@nutui/icons-vue/dist/style_icon.css';

const app = createApp(App);

// 路由
app.use(router);

// 国际化
app.use(i18n);

// 状态管理
app.use(store);

app.mount('#app');
