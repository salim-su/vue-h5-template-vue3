import { loginPassword } from '@/api';
// import { useCookies } from '@vueuse/integrations/useCookies';
import { defineStore } from 'pinia';

// const { VITE_TOKEN_KEY } = import.meta.env;
// const token = useCookies().get(VITE_TOKEN_KEY as string);

interface StoreUser {
  token: string;
  openId: string;
  info: Record<any, any>;
}

export const useUserStore = defineStore({
  id: 'app-user',
  state: (): StoreUser => ({
    token: '',
    openId: '',
    info: {},
  }),
  getters: {
    getUserInfo(): any {
      return this.info || {};
    },
    getToken(): any {
      return this.token || '';
    },
    getOpenId(): any {
      return this.openId || '';
    },
  },
  actions: {
    setInfo(info: any) {
      this.info = info ? info : '';
    },
    setToken(token: any) {
      this.token = token ? token : '';
    },
    setOpenId(openId: any) {
      this.openId = openId ? openId : '';
    },
    login() {
      return new Promise((resolve) => {
        loginPassword().then((res) => {
          this.setInfo(res);
          resolve(res);
        });
      });
    },
  },
  persist: {
    key: 'token',
    storage: localStorage,
    paths: ['token'],
  },
});
