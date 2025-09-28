<script setup lang="ts">
import homeRoutes from '@/router/home';
import { markRaw, onMounted, reactive, type Reactive } from 'vue';
import { AiFillMessage, AiFillSetting, AiOutlineMessage, AiOutlineSetting } from 'vue-icons-plus/ai';
import { BsPeople, BsPeopleFill } from 'vue-icons-plus/bs';
import { PiNotebook, PiNotebookFill } from 'vue-icons-plus/pi';
import { useRoute } from 'vue-router';

const route = useRoute();
const currentPath: string = route.matched[1]?.path as string;
type Menu = {
    path: string;
    icon: object;
    title: string;
    hotspot?: any;
}
const mPathtoIcon: Map<string, object> = new Map([
    ['/message', markRaw(AiOutlineMessage)],
    ['/contact', markRaw(BsPeople)],
    ['/note', markRaw(PiNotebook)],
    ['/settings', markRaw(AiOutlineSetting)]
])
const mPathtoFillIcon: Map<string, object> = new Map([
    ['/message', markRaw(AiFillMessage)],
    ['/contact', markRaw(BsPeopleFill)],
    ['/note', markRaw(PiNotebookFill)],
    ['/settings', markRaw(AiFillSetting)]
])
const menuRoutes: Menu[] = homeRoutes.children?.map(route => ({
    path: route.path as string,
    icon: mPathtoIcon.get(route.path) as object,
    title: route.meta?.title as string
})) || []

const menus: Reactive<Menu[]> = reactive(menuRoutes);
const onMenuSelect = (index: string) => {
    menus.forEach(menu => {
        if (menu.path === index) {
            menu.icon = mPathtoFillIcon.get(menu.path) as object;
        } else {
            menu.icon = mPathtoIcon.get(menu.path) as object;
        }
    });
}
onMounted(() => {
    onMenuSelect(currentPath);
})
</script>
<template>
    <el-menu router @select="onMenuSelect" :default-active="currentPath" collapse class="menu">
        <el-menu-item v-for="menu of menus" :key="menu.path" :index="menu.path">
            <component :is="menu.icon" />
            <template #title>
                {{ menu.title }}
            </template>
        </el-menu-item>
    </el-menu>
</template>
<style lang="less" scoped>
.menu {
    border-right: none;
}
</style>