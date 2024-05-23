<template>
  <div class="w pt80 flex justify-content-center">
    <van-loading type="spinner" />
  </div>
</template>

<script setup lang="ts">
  import { showToast } from 'vant';

  import { useRouter } from 'vue-router';
  import { useUserStore } from '@/store/modules/user';
  import { aqscqk, getToken } from '@/api';

  let openId = ref<any>(null);
  const router = useRouter();
  const userStore = useUserStore();

  onMounted(() => {
    openId.value = router.currentRoute.value.query.openId;
    if (openId.value) {
      userStore.setToken(openId.value);
      useRouter().push('/register');
    } else {
      showToast('微信信息获取失败，请重新进入系统');
    }

    // const jhrq = '2024-05-21';
    // aqscqk({ jhrq }).then((res) => {
    //   console.log(res);
    // });
    //
    // const postdata = {
    //   openId: openId.value,
    // };
    // getToken(postdata).then((res) => {
    //   console.log(res);
    // });
  });

  // watch(
  //   () => router,
  //   () => {
  //     console.log(router.currentRoute.value);
  //   },
  //   { deep: true, immediate: true },
  // );
</script>

<style scoped lang="scss"></style>
