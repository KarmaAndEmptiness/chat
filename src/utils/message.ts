import type { FormattedMessage, Message } from "@/types/message";
import { datetime } from "./datetime";
import type { Delta } from "quill";
import { v4 } from "uuid";

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
    return JSON.parse(json);
  } catch (e) {
    console.error(e, json);
    return {};
  }
}

export function deltaToText(delta: Delta): string {
  let text = "";
  delta.ops?.forEach((op) => {
    if (typeof op.insert === "string") {
      text += op.insert;
    } else if (typeof op.insert === "object") {
      if (op.insert.image) {
        text += "[图片]";
      } else if (op.insert.video) {
        text += "[视频]";
      } else if (op.insert.audio) {
        text += "[音频]";
      } else {
        text += "[未知]";
      }
    }
  });
  return text.trim();
}


export function uuid(): string {
  return v4().replace(/-/g, "");
}