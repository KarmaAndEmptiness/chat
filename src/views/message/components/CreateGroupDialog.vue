<script setup lang="ts">
const model = defineModel<boolean>()
</script>
<template>
    <el-dialog v-model="model">
        <el-container class="transfer-container">
            <el-transfer></el-transfer>
        </el-container>
        <template #footer>
            <el-container class="footer-container">
                <el-button @click="model = false">取消</el-button>
                <el-button type="primary">创建</el-button>
            </el-container>
        </template>
    </el-dialog>
</template>
<style lang="less" scoped>
.footer-container {
    gap: 5px;
    justify-content: end;
}
</style>