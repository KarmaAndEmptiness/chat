import type { FormattedMessage, Message } from "@/types/message";
import { datetime } from "./datetime";

export function formatMessage(msg: Message): FormattedMessage {
  let formattedMessage: FormattedMessage = {
    talk_mode: 1,
    to_from_id: 0,
    name: "未设置",
    remark: "",
    avatar: "",
    is_disturb: 2,
    is_top: 2,
    is_robot: 2,
    unread_num: 0,
    content: "...",
    draft_text: "",
    msg_text: "",
    index_name: "",
    updated_at: datetime(),
  };
  formattedMessage = { ...formattedMessage, ...msg };
  formattedMessage.index_name = `${formattedMessage.talk_mode}_${formattedMessage.to_from_id}`;
  return formattedMessage;
}

export function safeParseJson(json: string) {
  try {
    return JSON.parse(json)
  } catch (e) {
    console.error(e, json)
    return {}
  }
}
