import { getMessageList } from "@/apis/message";
import type { FormattedMessage, Message } from "@/types/message";
import { formatMessage } from "@/utils/message";
import type { PiniaCustomStateProperties, StoreDefinition } from "pinia";
type MessageStoreId = "message";

type MessageStoreState = {
  loadStatus: number;
  items: FormattedMessage[];
  isShowSessionMenu: boolean;
};
type MessageStoreGetterContext = MessageStoreState &
  PiniaCustomStateProperties<MessageStoreState>;
interface IMessageStoreGetters {
  topItems: (state: MessageStoreGetterContext) => FormattedMessage[];
  unreadItems: (state: MessageStoreGetterContext) => FormattedMessage[];
  groupItems: (state: MessageStoreGetterContext) => FormattedMessage[];
  friendItems: (state: MessageStoreGetterContext) => FormattedMessage[];
  talkUnreadNum: (state: MessageStoreGetterContext) => number;
}
interface IMessageStoreActions {
  getMessageList: () => void;
}
export const useMessageStore: StoreDefinition<
  MessageStoreId,
  MessageStoreState,
  IMessageStoreGetters,
  IMessageStoreActions
> = defineStore("message", {
  state: () => ({
    loadStatus: 2,
    items: [] as FormattedMessage[],
    isShowSessionMenu: true,
  }),
  getters: {
    topItems: (state: MessageStoreGetterContext) =>
      state.items.filter((item) => item.is_top === 1),
    unreadItems: (state: MessageStoreGetterContext) =>
      state.items.filter((item) => item.unread_num > 0),
    groupItems: (state: MessageStoreGetterContext) =>
      state.items.filter((item) => item.talk_mode === 2),
    friendItems: (state: MessageStoreGetterContext) =>
      state.items.filter((item) => item.talk_mode === 1),
    talkUnreadNum: (state: MessageStoreGetterContext) =>
      state.items.reduce((total, item) => total + item.unread_num, 0),
  },
  actions: {
    async getMessageList() {
      const data = await getMessageList();
      const formattedMessageList: FormattedMessage[] =
        data.items?.map((msg: Message) => {
          return formatMessage(msg);
        }) || [];
      // 排序
      this.items = formattedMessageList.sort(
        (a: FormattedMessage, b: FormattedMessage) => {
          return b.updated_at.localeCompare(a.updated_at);
        }
      );
    },
  },
});

