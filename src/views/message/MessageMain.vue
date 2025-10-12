<script setup lang="ts">
import { AiOutlineHistory, AiOutlineMenuFold, AiOutlineMenuUnfold, AiOutlineUsergroupAdd } from 'vue-icons-plus/ai';
import CreateGroupDialog from './components/CreateGroupDialog.vue';
import { useChatStore } from '@/stores/chat';
import { formatRelativeTime } from '@/utils/datetime';
import { RoleEnum } from '@/types/message';
import { useUserStore } from '@/stores/user';
import { useQuillEditor } from '@/hooks/useQuillEditor';
import Quill, { Delta } from 'quill';
import Emitter from 'quill/core/emitter';
import { IpFolderUpload, IpPictureOne, IpRanking, IpVoice } from 'vue-icons-plus/ip';
import { BiCodeBlock } from 'vue-icons-plus/bi';
import { deltaToText } from '@/utils/message';
const chatStore = useChatStore()

const isMenuFold: Ref<boolean> = ref(false);
const onFoldMenu = () => {
    isMenuFold.value = !isMenuFold.value
}

const talkMode: Ref<number> = ref(1)
const showCreateGroup: Ref<boolean> = ref(false)
const quillEditorRef = ref<HTMLElement | null>(null)
const quill = ref<Quill | undefined>(undefined)
const onSendMessage = async () => {
    const delta = quill.value?.getContents()
    if (!delta) return
    const data = deltaToText(delta)

    await chatStore.sendMessage({
        type: 'text',
        quote_id: '',
        body: {
            content: data,
            text: data,
            mentions: []
        }
    })
    quill.value?.setText('', Quill.sources.SILENT)
}
const editorOptions = {
    theme: 'snow',
    placeholder: '按Enter发送 / Shift+Enter 换行',
    formats: ['emoji', 'quote', 'mention', 'image'],
    modules: {
        toolbar: false,

        keyboard: {
            bindings: {
                enter: {
                    key: 'Enter',
                    // 回车发送消息
                    handler: onSendMessage
                }
            }
        },

        // mention: {
        //   allowedChars: /^[\u4e00-\u9fa5]*$/,
        //   mentionDenotationChars: ['@'],
        //   positioningStrategy: 'fixed',
        //   renderItem: (data: any) => {
        //     const el = document.createElement('div')
        //     el.className = 'ed-member-item'
        //     el.innerHTML = `<img src="${data.avatar}" class="avator"/>`
        //     el.innerHTML += `<span class="nickname">${data.nickname}</span>`
        //     return el
        //   },
        //   source: function (searchTerm: string, render: any) {
        //     if (!members.length) return render([])

        //     const items = [
        //       { id: 0, nickname: '所有人', avatar: defaultAvatar, value: '所有人' },
        //       ...members.map((item: any) => {
        //         return {
        //           id: item.id,
        //           nickname: item.nickname,
        //           avatar: item.avatar,
        //           value: item.nickname
        //         }
        //       })
        //     ]

        //     render(items.filter((item: any) => item.nickname.toLowerCase().indexOf(searchTerm) !== -1))
        //   },

        //   mentionContainerClass: 'ql-mention-list-container me-scrollbar me-scrollbar-thumb'
        // },

        uploader: {
            mimetypes: ['image/webp', 'image/gif', 'image/png', 'image/jpg', 'image/jpeg'],
            handler(range: any, files: File[]) {
                // @ts-expect-error
                const quill = this.quill

                if (!quill.scroll.query('image')) return

                const promises = files.map((file) => {
                    return onUploadImage(file)
                })

                Promise.all(promises).then((images) => {
                    const update = images.reduce((delta: any, image) => {
                        return delta.insert({ image })
                    }, new Delta().retain(range.index).delete(range.length))

                    quill.updateContents(update, Emitter.sources.USER)
                    quill.setSelection(range.index + images.length, Emitter.sources.SILENT)
                })
            }
        }
    }
}

const navs = reactive([
    {
        title: '图片',
        icon: markRaw(IpPictureOne),
        show: true,
        click: () => {
            //   fileImageRef.value.click()
        }
    },
    {
        title: '附件',
        icon: markRaw(IpFolderUpload),
        show: true,
        click: () => {
            //   uploadFileRef.value.click()
        }
    },
    {
        title: '代码',
        icon: markRaw(BiCodeBlock),
        show: true,
        click: () => {
            //   isShowEditorCode.value = true
        }
    },
    {
        title: '语音消息',
        icon: markRaw(IpVoice),
        show: true,
        click: () => {
            //   isShowEditorRecorder.value = true
        }
    },
    {
        title: '群投票',
        icon: markRaw(IpRanking),
        // show: computed(() => showVote),
        show: true,
        click: () => {
            //   isShowEditorVote.value = true
        }
    },
    {
        title: '历史记录',
        icon: markRaw(AiOutlineHistory),
        show: true,
        click: () => {
            //   callback('history_event')
        }
    }
])



const onUploadImage = (file: File) => { }

const recordsContainerRef = ref<HTMLElement | null>(null)
function scrollToBottom() {

    nextTick(() => {
        const el = recordsContainerRef.value
        if (el) {
            el.scrollTop = el.scrollHeight
            console.log(el.scrollHeight);
            console.dir(recordsContainerRef.value?.scrollTop);
        }
    })
}
watch(
    () => chatStore.records.length,
    () => scrollToBottom()
)

onMounted(async () => {
    chatStore.target.talk_mode = 1
    chatStore.target.to_from_id = 4531
    await useUserStore().loadUserInfo()
    chatStore.loadChatRecords()
    quill.value = useQuillEditor(quillEditorRef.value, editorOptions)

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
        <el-divider style="margin: 0;" />
        <main ref="recordsContainerRef" class="el-main">
            <template v-for="record of chatStore.records" :key="record.msg_id">
                <template v-if="record.role === RoleEnum.SYSTEM">
                    <el-container style="justify-content: center; font-size: 13px;">
                        <span class="system-content">{{ record.extra?.content }}</span>
                    </el-container>
                </template>
                <template v-else>
                    <el-container class="main-container"
                        :class="{ 'main-container-reverse': record.role === RoleEnum.USER }">
                        <el-aside>
                            <el-avatar :size="40"></el-avatar>
                        </el-aside>
                        <el-main>
                            <el-container>
                                <el-main class="time" style="">{{ record.send_time ?
                                    formatRelativeTime(record.send_time) : ''
                                    }}</el-main>
                                <el-footer class="content">{{ record.extra?.content }}</el-footer>
                            </el-container>
                        </el-main>
                    </el-container>
                </template>
            </template>
        </main>
        <el-divider style="margin: 0;" />
        <el-footer class="footer">
            <el-container>
                <el-header>
                    <el-container>
                        <el-tooltip v-for="nav of navs" :key="nav.title" v-show="nav.show" :content="nav.title"
                            placement="bottom">
                            <div class="editor-nav" @click="nav.click">
                                <component :is="nav.icon" style="width: 18px; height: 18px;" />
                            </div>
                        </el-tooltip>
                    </el-container>
                </el-header>
                <el-main style="padding: 0;">
                    <div ref="quillEditorRef" style="min-height: 180px;"></div>
                </el-main>
            </el-container>
        </el-footer>
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

.system-content {
    border-radius: 3px;
    padding: 3px 10px;
    max-width: 60%;
    background-color: rgba(46, 50, 56, .05);

}

.ql-container.ql-snow {
    border: none;
}

.editor-nav {
    padding: 10px 15px;
    cursor: pointer;
    border-radius: 5px;

    &:hover {
        background-color: rgba(46, 50, 56, .05);
    }
}

.footer {
    height: fit-content;
    padding: 0;

    &>.el-container {
        &>.el-header {
            height: fit-content;
            padding: 0;
        }
    }

}
</style>