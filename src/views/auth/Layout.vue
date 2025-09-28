<script setup lang="ts"></script>
<template>
    <el-container class="login-layout">
        <el-header id="logo-name">Hola Chat</el-header>
        <el-main class="login-main">
            <router-view />
        </el-main>
        <el-footer>
            <div class="copyright">
                <span>©2020 - 2025 hola chat 在线聊天</span>
                <span><a href="http://beian.miit.gov.cn" target="_blank">ICP备xxxxxxx号-2</a></span>
                <span>Github源码</span>
            </div>
        </el-footer>
    </el-container>
</template>
<style lang="less" scoped>
.login-layout {
    height: 100%;

    #logo-name {
        width: 200px;
        height: 38px;
        font-size: 34px;
        font-family:
            Times New Roman,
            Georgia,
            Serif;
        color: #2196f3;
        margin-top: 20px;
        margin-left: 50px;
    }

    .login-main {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .copyright {
        width: 70%;
        text-align: center;
        margin: 0 auto;
        font-size: 12px;
        color: #b1a0a0;

        span {
            margin: 0 5px;
        }

        a {
            color: #777272;
            font-weight: 400;
        }
    }
}
</style>
