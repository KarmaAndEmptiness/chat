<script setup lang="ts">
import { AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUsergroupAdd } from 'vue-icons-plus/ai';
import CreateGroupDialog from './components/CreateGroupDialog.vue';
import { useChageStore } from '@/stores/chat';
import { formatRelativeTime } from '@/utils/datetime';
import { RoleEnum, type FormattedMessageRecord } from '@/types/message';
const chatStore = useChageStore()

const isMenuFold: Ref<boolean> = ref(false);
const onFoldMenu = () => {
    isMenuFold.value = !isMenuFold.value
}

const talkMode: Ref<number> = ref(1)
const showCreateGroup: Ref<boolean> = ref(false)
const records = computed((): FormattedMessageRecord[] => chatStore.records)


onMounted(() => {
    chatStore.target.talk_mode = 1
    chatStore.target.to_from_id = 4531
    chatStore.getChatRecords()
})

</script>
<template>
    <el-container class="h-full-available">
        <el-header class="header">
            <el-container class="container">
                <el-aside>
                    <el-button link @click="onFoldMenu">
                        <component :is="isMenuFold ? AiOutlineMenuUnfold : AiOutlineMenuFold" />
                    </el-button>
                </el-aside>
                <el-main>
                    <el-container>
                        <el-aside>
                            <span class="tag" v-show="talkMode === 1">友</span>
                        </el-aside>
                        <el-main class="create-group-container">
                            <el-tooltip content="发起群聊">
                                <el-button link @click="showCreateGroup = true">
                                    <component :is="AiOutlineUsergroupAdd" />
                                </el-button>
                            </el-tooltip>
                        </el-main>
                    </el-container>
                </el-main>
            </el-container>
        </el-header>
        <el-main>
            <el-container v-for="record of records" class="main-container"
                :class="{ 'main-container-reverse': record.role === RoleEnum.USER }">
                <el-aside>
                    <el-avatar :size="40"></el-avatar>
                </el-aside>
                <el-main>
                    <el-container>
                        <el-main class="time" style="">{{ record.send_time ? formatRelativeTime(record.send_time) : ''
                            }}</el-main>
                        <el-footer class="content">{{ record.extra?.content }}</el-footer>
                    </el-container>
                </el-main>
            </el-container>
        </el-main>
        <el-footer>footer</el-footer>
    </el-container>
    <CreateGroupDialog v-model="showCreateGroup" />
</template>
<style lang="less" scoped>
.tag {
    height: 18px;
    line-height: 18px;
    padding: 1px 5px;
    font-size: 10px;
    color: white;
    border-radius: 2px;
    margin-right: 8px;
    flex-shrink: 0;
    background-color: #f97348;
}

.header {
    padding: 0 20px;

    .container {
        &>.el-aside {
            width: fit-content;
            padding-right: 5px;
            border-right: 1px solid #ccc;
        }

        &>.el-main {
            padding: 0;
            padding-left: 5px;

            .create-group-container {
                padding: 0;
                display: flex;
                justify-content: end;
            }
        }
    }
}

.main-container {
    margin-bottom: 10px;

    &>.el-aside {
        width: fit-content;
    }

    &>.el-main {
        padding: 0 20px;

        &>.el-container {

            &>.time,
            .content {
                max-width: 70%;
            }

            .time {
                padding: 0;
                width: fit-content;
                color: #8f8f8f;
                font-size: 12px;
                font-weight: 300;
            }

            .content {
                height: fit-content;
                padding: 10px;
                border-radius: 5px;
                width: fit-content;
                white-space: pre-wrap;
                word-break: break-word;
                word-wrap: break-word;
                font-size: 14px;
                background-color: rgba(46, 50, 56, .05);
            }

        }

    }
}

.main-container-reverse {
    flex-direction: row-reverse;

    &>.el-main {
        &>.el-container {
            .time {
                margin-left: auto;
            }

            .content {
                margin-left: auto;
            }

        }
    }
}
</style>