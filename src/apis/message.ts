import type { Message, MessageRecord } from "@/types/message";
import { post } from "@/utils/request";

export type MessageListResponse = {
  items?: Message[];
};

export type MessageRecordsRequest = {
  talk_mode: number;
  to_from_id: number;
  cursor: number;
  limit: number;
};

export type MessageRecordsResponse = {
  items: MessageRecord[];
  cursor: number;
};

export type SendMessageRequest = {
  type: string
  quote_id?: string
  body: any
  talk_mode: number
  to_from_id: number
  msg_id: string
};

export type SendMessageResponse = {
  message_id: string;
};

export const getMessageList: () => Promise<MessageListResponse> =
  (): Promise<MessageListResponse> => {
    return post<MessageListResponse>("/api/v1/talk/session-list");
  };

export const getMessageRecords: (
  params: MessageRecordsRequest
) => Promise<MessageRecordsResponse> = (params: MessageRecordsRequest) => {
  return post<MessageRecordsResponse>("/api/v1/message/records", params);
};

export const sendMessage:(data:SendMessageRequest) => Promise<SendMessageResponse> = (data: SendMessageRequest) => {
  return post<SendMessageResponse>("/api/v1/message/send", data);
}
