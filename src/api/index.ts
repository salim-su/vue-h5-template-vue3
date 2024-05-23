import { http } from '@/utils/request';

/**
 * 账号密码登录
 * @returns UseAxiosReturn
 */
export function loginPassword() {
  return http.post(`/api/login`, {
    data: { name: '123' },
  });
}

export function aqscqk(params: any) {
  return http.get(`/change-shift/manage/getWorkSafetyInfo?_allow_anonymous=true`, { params });
}

export function getToken(data: any) {
  return http.post(`/tjpn4-smart-gate/wechat/getToken`, data);
}
