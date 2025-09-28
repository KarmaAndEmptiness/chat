<script setup lang="ts"></script>
<template>
    <el-container class="avatar-menu">
        <el-popover placement="right" trigger="click" width="320">
            <el-container>
                <el-main>
                    <el-container>
                        <el-main align="center">
                            <el-avatar :size="80" fit="cover" url=""/>
                        </el-main>
                        <el-footer class="nickname">未设置昵称</el-footer>
                    </el-container>
                </el-main>
                <el-footer class="personal-sign">
                    <span>个性签名</span>
                </el-footer>
            </el-container>
            <template #reference>
                <el-avatar fit="cover" :size="42" url="" />
            </template>
        </el-popover>
    </el-container>
    <div class="online">在线</div>
</template>

<style lang="less" scoped>
.avatar-menu {
    justify-content: center;
    align-items: center;
    height: fit-content;
    cursor: pointer;
    margin-top: 10px;
    padding: 10px 0;

    &:hover {
        background-color: var(--el-menu-hover-bg-color);
    }
}

.online {
    text-align: center;
    color: #65c468;
    font-size: 14px;
    margin-top: 6px;
    cursor: pointer;
}
.personal-sign {
    cursor: pointer;
    &>span {
        font-weight: 600;
    };
}
.nickname {
    text-align: center;
}
</style>
