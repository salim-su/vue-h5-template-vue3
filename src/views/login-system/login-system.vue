<script setup lang="ts">
  import { aqscqk } from '@/api';
  import { useUserStore } from '@/store/modules/user';
  import router from '@/router';

  const loginInfo = ref<any>(null);
  const phoneNumber = ref<any>('');
  const code = ref<any>('');
  const flagTest = ref<boolean>(true);
  const flag = ref<boolean>(true);
  const showInfo = ref<boolean>(false);
  const isLoading = ref<boolean>(false);

  const jhrq = '2024-05-21';
  aqscqk({ jhrq }).then((res) => {
    console.log(res);
  });

  const userStore = useUserStore();
  userStore.setToken('kakaka');

  console.log(userStore.getToken);
  const login = () => {
    router.push({ path: '/register' });
  };
  const finish = () => {};
  const start = () => {};
  const formatter = (value: any) => {
    return value.replace(/\s/gi, '');
  };
</script>

<template>
  <div class="body">
    <div class="login">
      <div class="login-top">
        <h2 class="mb25">您好!</h2>
        <h2>欢迎使用四公司业务系统</h2>
      </div>
      <div class="login-content">
        <div class="login-content-c">
          <van-cell-group :border="false" class="mt15 flex align-items-center">
            <van-field placeholder="请输入手机号" type="number" v-model="phoneNumber" label="手机号" :formatter="formatter" />
          </van-cell-group>
          <van-cell-group :border="false" class="flex mt15 align-items-center">
            <van-field v-model="code" type="password" center clearable placeholder="请输入验证码" class="mb40" label="验证码">
              <template #button>
                <van-button color="#7084ED" class="btn" round size="small" plain type="primary" :disabled="!flag" @click="start">
                  <template v-if="flagTest">
                    <span>获取验证码</span>
                  </template>
                  <template v-else>
                    <van-count-down
                      style="color: #7084ed"
                      ref="countDown"
                      millisecond
                      :time="60000"
                      :auto-start="false"
                      format="ss秒"
                      @finish="finish"
                    />
                  </template>
                </van-button>
              </template>
            </van-field>
          </van-cell-group>
          <van-button @click="login" :disabled="isLoading" class="mt70 w" color="#3276FF" round>登 录</van-button>
          <div v-if="showInfo">
            <h3>{{ loginInfo }}</h3>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .login {
    width: 100%;
    /*height: 247.5px;*/
    height: 100vh;
    background-image: url('../../assets/img/login-bg.png');
    background-size: cover;
    background-repeat: no-repeat;
    box-sizing: border-box;
  }

  .login-top {
    height: 300px;
    width: 100%;
    padding-top: 100px;
    padding-left: 40px;
    padding-right: 40px;
  }

  .login-content {
    width: 100%;
    height: calc(100vh - 300px);
    padding: 20px 40px 0px 40px;
  }

  .login-content-c {
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.7);
    border-top-left-radius: 30px;
    border-top-right-radius: 30px;
    padding: 30px;
  }

  .body {
    width: 100%;
    height: 100%;
  }

  .van-cell-group {
    background-color: transparent;
  }

  .van-cell {
    background-color: transparent;
    border-bottom: 1px solid #edeaeb !important;
    padding-left: 0;
  }

  .van-field__label {
    width: 80px;
  }

  .register {
    color: #000000 !important;
  }

  .van-field__button {
    display: flex;
  }

  .btn {
    //border-radius: 20px;
    padding-left: 25px;
    padding-right: 25px;
  }

  .van-field__button {
    padding-left: 0;
  }
</style>
