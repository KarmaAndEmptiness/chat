export const ChatMsgStatus = {
  // 消息状态
  Sending : 1, // 发送中
  Sent : 2, // 已发送
  Failed : 3, // 发送失败
  Revoke : 4 // 已撤回
}
export type ChatMsgStatus = (typeof ChatMsgStatus)[keyof typeof ChatMsgStatus]

export const TalkModeEnum =  {
  // 聊天类型
  Single : 1, // 单聊
  Group :2 // 群聊
}
export type TalkModeEnum = (typeof TalkModeEnum)[keyof typeof TalkModeEnum]

export const ChatMsgType = {
    // 消息类型
    Text : 1, // 文本消息
    Code : 2, // 代码消息
    Image : 3, // 图片文件
    Audio : 4, // 语音文件
    Video : 5, // 视频文件
    File : 6, // 其它文件
    Location : 7, // 位置消息
    Card : 8, // 名片消息
    Forward : 9, // 转发消息
    Login : 10, // 登录消息
    Vote : 11, // 投票消息
    Mixed : 12, // 混合消息
    GroupNotice : 13, // 群公告消息

    SysText : 1000, // 系统文本消息
    SysGroupCreate : 1101, // 创建群聊消息
    SysGroupMemberJoin : 1102, // 加入群聊消息
    SysGroupMemberQuit : 1103, // 群成员退出群消息
    SysGroupMemberKicked : 1104, // 踢出群成员消息
    SysGroupMessageRevoke : 1105, // 管理员撤回成员消息
    SysGroupDismissed : 1106, // 群解散
    SysGroupMuted : 1107, // 群禁言
    SysGroupCancelMuted : 1108, // 群解除禁言
    SysGroupMemberMuted : 1109, // 群成员禁言
    SysGroupMemberCancelMuted : 1110, // 群成员解除禁言
    SysGroupTransfer : 1113 // 变更群主
}
export type ChatMsgType = (typeof ChatMsgType)[keyof typeof ChatMsgType]


export const ChatMsgTypeMapping = {
  [ChatMsgType.Text]: '[文本消息]',
  [ChatMsgType.Image]: '[图片消息]',
  [ChatMsgType.Audio]: '[语音消息]',
  [ChatMsgType.Video]: '[视频消息]',
  [ChatMsgType.File]: '[文件消息]',
  [ChatMsgType.Location]: '[位置消息]',
  [ChatMsgType.Card]: '[名片消息]',
  [ChatMsgType.Forward]: '[转发消息]',
  [ChatMsgType.Login]: '[登录消息]',
  [ChatMsgType.Vote]: '[投票消息]',
  [ChatMsgType.Code]: '[代码消息]',
  [ChatMsgType.Mixed]: '[图文消息]',
  [ChatMsgType.GroupNotice]: '[群公告]',
  [ChatMsgType.SysText]: '[系统消息]',
  [ChatMsgType.SysGroupCreate]: '[创建群消息]',
  [ChatMsgType.SysGroupMemberJoin]: '[加入群消息]',
  [ChatMsgType.SysGroupMemberQuit]: '[退出群消息]',
  [ChatMsgType.SysGroupMemberKicked]: '[踢出群消息]',
  [ChatMsgType.SysGroupMessageRevoke]: '[撤回消息]',
  [ChatMsgType.SysGroupDismissed]: '[群解散消息]',
  [ChatMsgType.SysGroupMuted]: '[群禁言消息]',
  [ChatMsgType.SysGroupCancelMuted]: '[群解除禁言消息]',
  [ChatMsgType.SysGroupMemberMuted]: '[群成员禁言消息]',
  [ChatMsgType.SysGroupMemberCancelMuted]: '[群成员解除禁言消息]'
}

// 可转发的消息类型
export const ForwardableMessageType = [
  ChatMsgType.Text,
  ChatMsgType.Code,
  ChatMsgType.Image,
  ChatMsgType.Audio,
  ChatMsgType.Video,
  ChatMsgType.File,
  ChatMsgType.Location,
  ChatMsgType.Card
]

// 消息状态常量
export const MessageStatus = {
    SENT: 1, // 发送成功
    PENDING: 2, // 发送中
    FAILED: 3 // 发送失败
}
export type MessageStatus = (typeof MessageStatus)[keyof typeof MessageStatus]
