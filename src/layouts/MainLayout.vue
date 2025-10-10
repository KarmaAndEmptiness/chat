<script setup lang="ts">
import { BiLogOut } from 'vue-icons-plus/bi';
import Avatar from './components/Avatar.vue';
import Menu from './components/Menu.vue';
import {useUserStore} from '@/stores/user';
const onLogout = () => {
    useUserStore().logout()
}
</script>
<template>
    <el-container class="main-layout">
        <el-aside class="main-aside">
            <el-container class="main-aside-container">
                <el-header class="main-aside-header">
                    <Avatar />
                </el-header>
                <el-main>
                    <Menu />
                </el-main>
                <el-footer>
                    <el-menu collapse class="logout-menu">
                        <el-menu-item @click="onLogout">
                            <component :is="BiLogOut" />
                            <template #title>
                                退出
                            </template>
                        </el-menu-item>
                    </el-menu>
                </el-footer>
            </el-container>
        </el-aside>
        <el-main class="main-main">
            <router-view />
        </el-main>
    </el-container>
</template>
<style lang="less" scoped>
.main-layout {
    height: 100%;
}

.main-aside {
    width: fit-content;
    height: 100%;
    border-right: 1px solid var(--el-menu-border-color);

    .main-aside-header {
        height: fit-content;
    }
}

.main-aside-container {
    height: 100%;
}

.logout-menu {
    border-right: none;
}

.main-main {
    height: 100%;
    padding: 0;
}
</style>