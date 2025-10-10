<script setup lang="ts">
import MessageAside from './MessageAside.vue';
import MessageMain from './MessageMain.vue';

</script>
<template>
    <el-container class="message-container">
        <el-aside class="message-aside">
            <MessageAside />
        </el-aside>
        <el-main style="padding-left: 0;">
            <MessageMain/>
        </el-main>
    </el-container>
</template>
<style lang="less" scoped>
.message-container {
    height: 100%;
    padding: 0;
}

.message-aside {
    height: 100%;
    border-right: 1px solid var(--el-menu-border-color);
    width: fit-content;
}
</style>