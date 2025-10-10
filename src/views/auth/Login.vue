<script setup lang="ts">
import { login, type LoginRequest, type LoginResponse, type Platform } from '@/apis/auth';
import { setToken } from '@/utils/auth';
import { rsaEncrypt } from '@/utils/rsa';
import wsSingleton from '@/utils/ws-singleton';
import { reactive, type Reactive } from 'vue';
import { useRoute, useRouter, type RouteLocationNormalizedLoadedGeneric, type Router } from 'vue-router';
const router: Router = useRouter();
const route: RouteLocationNormalizedLoadedGeneric = useRoute();
const platform: Platform = import.meta.env.VITE_PLATFORM as Platform;
const loginForm: Reactive<LoginRequest> = reactive({
    mobile: '',
    password: '',
    platform,
});
const onLogin: (evt?: MouseEvent) => any = async (evt?: MouseEvent) => {
    evt?.preventDefault();

    loginForm.password = rsaEncrypt(loginForm.password);

    const data: LoginResponse = await login(loginForm);
    setToken(data.access_token, data.expires_in);
    wsSingleton.connect()
    router.push(route.query.redirect as string || '/')
};

const onTestAccountClick: (type: number) => void = (type: number) => {
    switch (type) {
        case 1:
            loginForm.mobile = import.meta.env.VITE_TEST_ACCOUNT_1;
            loginForm.password = import.meta.env.VITE_TEST_ACCOUNT_1_PASSWD;
            break;
        case 2:
            loginForm.mobile = import.meta.env.VITE_TEST_ACCOUNT_2;
            loginForm.password = import.meta.env.VITE_TEST_ACCOUNT_2_PASSWD;
            break;
    }
    onLogin();
}
</script>
<template>
    <el-card class="login-card">
        <template #header>
            <span style="font-size: 24px; font-weight: 500;">快捷登录</span>
        </template>
        <el-form :model="loginForm">
            <el-form-item>
                <el-input placeholder="请输入手机号" v-model="loginForm.mobile" />
            </el-form-item>
            <el-form-item>
                <el-input type="password" placeholder="请输入密码" v-model="loginForm.password" />
            </el-form-item>
            <el-form-item>
                <el-button link @click="onTestAccountClick(1)">预览账号1</el-button>
                <el-button link @click="onTestAccountClick(2)">预览账号2</el-button>
            </el-form-item>
            <el-form-item>
                <el-button type="primary" style="width: 100%;" @click="onLogin">登录</el-button>
            </el-form-item>
        </el-form>
        <template #footer>
            <div>其它方式登录</div>
        </template>
    </el-card>
</template>
<style lang="less" scoped>
.login-card {
    width: 350px;
}
</style>