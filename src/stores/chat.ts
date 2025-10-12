import {
  getMessageRecords,
  sendMessage,
  type MessageRecordsRequest,
  type SendMessageRequest,
} from "@/apis/message";
import {
  formatChatRecord,
  type FormattedMessageRecord,
  type MessageRecord,
} from "@/types/message";
import { safeParseJson, uuid } from "@/utils/message";
import type { StoreDefinition } from "pinia";
import { useUserStore } from "./user";
import { ChatMsgType, MessageStatus } from "@/constants/chat";
import { datetime } from "@/utils/datetime";
type Member = {
  id: number;
  nickname: string;
  avatar: string;
  gender: number;
  leader: number;
  remark: string;
};
type ChatStoreId = "chat";

type ChatStoreState = {
  // 对话索引（聊天对话的唯一索引）
  index_name: string;

  // 对话节点
  target: {
    username: string;
    description: string;
    talk_mode: number; // 对话来源[1:私聊;2:群聊]
    to_from_id: number; // 对话对象ID[群ID或者好友ID]
  };

  // 好友是否正在输入文字
  keyboard: boolean;

  // 聊天记录
  records: FormattedMessageRecord[];

  // 新消息提示
  unreadBubble: number;

  // 是否显示编辑器
  isShowEditor: boolean;

  // 群成员列表
  members: Member[];

  // 聊天面板的容器ID
  container: string;

  cursor: number;
};

interface IChatStoreGetters {}
interface IChatStoreActions {
  loadChatRecords(): Promise<boolean>;
  unshiftChatRecord(records: FormattedMessageRecord[]): void;
  clearChatRecord(): void;
  resetChatRecords(): void;
  sendMessage(
    data: Omit<SendMessageRequest, "talk_mode" | "to_from_id" | "msg_id">
  ): Promise<void>;
  pushRecord(data: SendMessageRequest): void;
}



const msgTypeMap = new Map<string, ChatMsgType>([
 ["text", ChatMsgType.Text], 
 ['image', ChatMsgType.Image],
 ['file', ChatMsgType.File],
 ['audio', ChatMsgType.Audio],
  ['video', ChatMsgType.Video],
  ['code', ChatMsgType.Code],
  ['location', ChatMsgType.Location],
  ['card', ChatMsgType.Card],
  ['forward', ChatMsgType.Forward],
  ['login', ChatMsgType.Login],
  ['vote', ChatMsgType.Vote],
  ['mixed', ChatMsgType.Mixed]
]
);

export const useChatStore: StoreDefinition<
  ChatStoreId,
  ChatStoreState,
  IChatStoreGetters,
  IChatStoreActions
> = defineStore("chat", {
  state: (): ChatStoreState => ({
    index_name: "",
    target: {
      username: "",
      description: "",
      talk_mode: 0,
      to_from_id: 0,
    },
    keyboard: false,
    records: [] as FormattedMessageRecord[],
    unreadBubble: 0,
    isShowEditor: false,
    members: [] as Member[],
    container: "",
    cursor: 0,
  }),
  getters: {},
  actions: {
    unshiftChatRecord(records: FormattedMessageRecord[]) {
      this.records.unshift(...records);
    },
    // 清空对话记录
    clearChatRecord() {
      this.records = [];
    },

    async loadChatRecords(): Promise<boolean> {
      const params: MessageRecordsRequest = {
        talk_mode: this.target.talk_mode,
        to_from_id: this.target.to_from_id,
        cursor: this.cursor,
        limit: 30,
      };
      if (params.cursor === 0) {
        this.clearChatRecord();
      }
      const data = await getMessageRecords(params);
      const list = data.items.map((item: any) => {
        item.extra = safeParseJson(item.extra || "{}");
        item.quote = safeParseJson(item.quote || "{}");
        item.status = 1;
        return formatChatRecord(useUserStore().uid, item);
      });
      this.unshiftChatRecord(list.reverse());
      this.cursor = data.cursor;
      return data.items.length > params.limit;
    },
    resetChatRecords() {
      this.cursor = 0;
      this.clearChatRecord();
    },
    async sendMessage(
      data: Omit<SendMessageRequest, "talk_mode" | "to_from_id" | "msg_id">
    ): Promise<void> {
      const params: SendMessageRequest = {
        talk_mode: this.target.talk_mode,
        to_from_id: this.target.to_from_id,
        msg_id: uuid(),
        ...data,
      };
      await sendMessage(params);
      this.pushRecord(params);
    },
    pushRecord(data: SendMessageRequest) {
      const userStore = useUserStore();
      const record = formatChatRecord(useUserStore().uid, {
        msg_id: data.msg_id,
        sequence:0,
        msg_type:msgTypeMap.get(data.type)||ChatMsgType.Text,
        from_id: userStore.uid,
        nickname: userStore.nickname,
        avatar: userStore.avatar,
        is_revoked:2,
        extra:data.body,
        quote:{},
        status: MessageStatus.PENDING,
        send_time: datetime(),
      } as MessageRecord);
      this.records.push(record);
    },
  },
});
