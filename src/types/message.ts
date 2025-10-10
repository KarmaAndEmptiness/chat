export type Message = {
  id?: number;
  talk_mode: number;
  to_from_id: number;
  is_top: number;
  is_disturb: number;
  is_robot: number;
  name: string;
  avatar: string;
  remark: string;
  unread_num: number;
  msg_text: string;
  updated_at: string;
};

export type FormattedMessage = Message & {
  index_name: string; // 索引名称
  content: string;
  draft_text?: string; // 草稿文本
};

export const MessageTypeEnum = {
  TEXT: "text",
  TIME: "time",
  CUSTOM: "custom",
} as const;
export type MessageTypeEnum =
  (typeof MessageTypeEnum)[keyof typeof MessageTypeEnum];

export const AlignEnum = {
  LEFT_RIGHT: "leftRight",
  LEFT_ALIGN: "left",
};
export type AlignEnum = (typeof AlignEnum)[keyof typeof AlignEnum];

export const RoleEnum = {
  USER: "user",
  ASSISTANT: "assistant",
  SYSTEM: "system",
};
export type RoleEnum = (typeof RoleEnum)[keyof typeof RoleEnum];

export const StatusEnum = {
  SENDING: "sending",
  SENT: "sent",
  ERROR: "error",
};
export type StatusEnum = (typeof StatusEnum)[keyof typeof StatusEnum];

// 消息记录
export type MessageRecord = {
  msg_id: string; // 消息ID
  sequence: number; // 消息时序ID（消息排序）
  msg_type: number; // 消息类型
  from_id: number; // 发送者id
  nickname: string; // 昵称
  avatar: string; // 头像
  is_revoked: number; // 是否撤回
  send_time: string; // 发送时间
  extra: {
    // 消息内容
    content: string;
  };
  // 是否引用消息
  quote: {
    // 原消息ID
    quote_id: string;
    // 消息内容
    content: string;
  };
  // 发送状态-预留
  status: number; // 消息状态 1发送成功 2发送中 3发送失败
};

export type FormattedMessageRecord = Partial<MessageRecord> & {
  // 发送者角色
  role: RoleEnum;
  type: MessageTypeEnum; // 消息类型
  // 文本消息内容，配合 type=text 使用
  content?: string;
  // 发送状态-预留
  send_status: StatusEnum;
};

export const formatChatRecord = (
  userId: number,
  messageRecord: MessageRecord
): FormattedMessageRecord => {
  const { msg_id, from_id, send_time, nickname, avatar, extra } = messageRecord;
  if (from_id == 0 || messageRecord.msg_type >= 1000) {
    return {
      msg_id,
      role: RoleEnum.SYSTEM,
      type: MessageTypeEnum.CUSTOM,
      send_time,
      send_status: StatusEnum.SENT,
      extra,
    };
  }
  if (messageRecord.is_revoked == 1) {
    return {
      msg_id: msg_id,
      role: RoleEnum.SYSTEM,
      type: MessageTypeEnum.TEXT,
      send_time,
      content: "此消息已被撤回",
      send_status: StatusEnum.SENT,
      extra,
    };
  }
  const role = from_id != userId ? RoleEnum.ASSISTANT : RoleEnum.USER;
  console.log(from_id, userId);
  const quote = messageRecord?.quote
    ? {
        quote_id: messageRecord.quote?.quote_id || "",
        content: messageRecord.quote?.content || "",
      }
    : undefined;

  let status = StatusEnum.SENT;
  if ([2, 3].includes(messageRecord.status)) {
    status = messageRecord.status == 2 ? StatusEnum.SENDING : StatusEnum.ERROR;
  }
  return {
    role,
    msg_id,
    type: MessageTypeEnum.CUSTOM,
    send_time,
    nickname,
    avatar: avatar,
    quote,
    send_status: status,
    extra,
  };
};
