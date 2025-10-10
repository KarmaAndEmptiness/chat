<script setup lang="ts">
import AppProvider from './layouts/AppProvider.vue';
import { useUserStore } from './stores/user';
import { isLogin } from './utils/auth';
const { getUserInfo } = useUserStore()
onMounted(() => {
    isLogin() && getUserInfo()
})

</script>

<template>
    <AppProvider>
        <router-view />
    </AppProvider>
</template>

<style lang="less">
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    height: 100vh;
    height: 100dvh;
}

#app {
    height: 100%;
}

.h-full-available {
    height: -webkit-fill-available;
    /* Chrome / Safari / Edge */
    height: -moz-available;
    /* Firefox 旧版 */
    height: stretch;
    /* 标准草案 */
}
</style>
