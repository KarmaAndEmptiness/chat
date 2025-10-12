<script setup lang="ts">
import { useMessageStore } from '@/stores/message';
import type { FormattedMessage } from '@/types/message';
import { formatRelativeTime } from '@/utils/datetime';
import { BsPlus } from 'vue-icons-plus/bs';
import { EpSearch } from 'vue-icons-plus/ep';
import CreateGroupDialog from './components/CreateGroupDialog.vue';

const messageStore = useMessageStore()

const searchKeyword: Ref<string> = ref('')

type Tab = {
    name: string;
    value: number;
}
const tabs: Ref<Tab[]> = ref([
    {
        name: '全部',
        value: computed(() => {
            return messageStore.items.length
        })
    },
    {
        name: '好友',
        value: computed(() => {
            return messageStore.friendItems.length
        })
    },
    {
        name: '群聊',
        value: computed(() => {
            return messageStore.groupItems.length
        })
    },
    {
        name: '未读',
        value: computed(() => {
            return messageStore.unreadItems.length
        })
    }
])
const selectTab: Ref<string | undefined> = ref(tabs.value[0]?.name)
const messageList: ComputedRef<FormattedMessage[] | undefined> = computed(() => {
    if (!searchKeyword.value) {

        switch (selectTab.value) {
            case '好友':
                return messageStore.friendItems
                break
            case '群聊':
                return messageStore.groupItems
                break
            case '未读':
                return messageStore.unreadItems
                break
            default:
                return messageStore.items
                break
        }
    }
    return messageStore.items.filter((item) => {
        const keyword = item.remark || item.name
        return keyword.toLowerCase().includes(searchKeyword.value.toLowerCase())
    })
})
const onTabSelect = (key: string) => {
    selectTab.value = key
}
const showAddFriend = ref(false)
const showCreateGroup = ref(false)
const onAddMenuSelect = (key: string) => {
    switch (key) {
        case 'add-friend':
            showAddFriend.value = true
            break
        case 'create-group':
            showCreateGroup.value = true
            break
        default:
            break
    }
}
const onQueryFriend = () => {
}
onMounted(() => {
    messageStore.loadMessageList()
})
</script>
<template>
    <el-container class="message-aside-container h-full-available">
        <el-header>
            <el-container class="search-container">
                <el-input :prefix-icon="EpSearch" size="large" v-model="searchKeyword" />
                <el-popover trigger="click" width="fit-content" popper-class="message-aside-search-popper">
                    <template #reference>
                        <el-button class="plus-btn">
                            <component :is="BsPlus" />
                        </el-button>
                    </template>
                    <el-menu class="plus-menu" @select="onAddMenuSelect">
                        <el-menu-item index="add-friend">
                            添加好友
                        </el-menu-item>
                        <el-menu-item index="create-group">
                            创建群聊
                        </el-menu-item>
                    </el-menu>
                </el-popover>
            </el-container>
        </el-header>
        <el-main class="message-aside-main">
            <el-container class="h-full-available">
                <el-header class="tabs-header">
                    <el-menu mode="horizontal" :ellipsis="false" class="tabs-menu" :default-active="tabs[0]?.name"
                        @select="onTabSelect">
                        <el-menu-item v-for="tab of tabs" :key="tab.name" :index="tab.name">{{ tab.name
                        }}</el-menu-item>
                    </el-menu>
                </el-header>
                <el-main class="messages-main h-full-available">
                    <el-menu class="messages-menu">
                        <el-menu-item v-for="message of messageList" :key="message.id">
                            <el-container class="message-item-container">
                                <el-aside>
                                    <el-avatar :size="35" :url="message.avatar"></el-avatar>
                                </el-aside>
                                <el-main>
                                    <el-container class="message-content-container">
                                        <el-main>
                                            {{ message.remark || message.name }}
                                        </el-main>
                                        <el-footer>
                                            <span v-html="message.msg_text"
                                                style="color: #8f959e; font-size: 12px;"></span>
                                        </el-footer>
                                    </el-container>
                                </el-main>
                                <el-aside>
                                    <el-container class="message-time-container">
                                        <el-main style="font-size: 12px; color: #8f959e;">
                                            {{ formatRelativeTime(message.updated_at) }}
                                        </el-main>
                                        <el-footer>
                                            <span class="unread-badge" v-show="message.unread_num">{{
                                                message.unread_num }}</span>
                                        </el-footer>
                                    </el-container>
                                </el-aside>
                            </el-container>
                        </el-menu-item>
                    </el-menu>
                </el-main>
            </el-container>
        </el-main>
    </el-container>
    <el-dialog v-model="showAddFriend" title="添加好友">
        <el-input placeholder="请输入手机号" />
        <template #footer>
            <el-button @click="onQueryFriend" type="primary">查询手机号</el-button>
        </template>
    </el-dialog>
    <CreateGroupDialog v-model="showCreateGroup" />
</template>
<style lang="less" scoped>
.message-aside-container {
    margin-top: var(--el-main-padding);

    .message-aside-main {
        padding: 0 0 var(--el-main-padding) 0;
        height: 100%;
    }
}

.search-container {
    gap: 10px;

    .plus-btn {
        height: 100%;
    }

    :global(.message-aside-search-popper) {
        min-width: fit-content !important;
    }
}

.plus-menu {
    border-right: none;
}


.tabs-header {
    padding: var(--el-header-padding) 0 var(--el-header-padding) 0;

    .tabs-menu {
        display: flex;
        justify-content: space-evenly;
    }
}

.messages-main {
    padding: var(--el-main-padding) 0 var(--el-main-padding) 0;
}

.messages-menu {
    border-right: none;
}

.message-item-container>.el-aside {
    width: fit-content;
    display: flex;
    justify-content: center;
    align-items: center;

}

.message-content-container {
    &>.el-main {
        padding: 0;
        line-height: normal;
    }

    &>.el-footer {
        padding: 0;
        height: fit-content;
        line-height: normal;
    }
}

.message-time-container {
    &>.el-main {
        padding: 0;
        margin-bottom: 3px;
        line-height: normal;
    }

    &>.el-footer {
        padding: 0;
        height: fit-content;
        line-height: normal;
        display: flex;
        justify-content: end;
        padding-right: 2px;
    }
}

.unread-badge {
    color: white;
    background-color: #f44336;
    padding: 0 6px;
    font-size: 12px;
    transform: scale(.84);
    border-radius: 3px;
    transform-origin: right;
}
.transfer-container {
    justify-content: center;
}
</style>