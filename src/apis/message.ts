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
export const getMessageList: () => Promise<MessageListResponse> =
  (): Promise<MessageListResponse> => {
    return post<MessageListResponse>("/api/v1/talk/session-list");
  };

export const getMessageRecords: (
  params: MessageRecordsRequest
) => Promise<MessageRecordsResponse> = (params: MessageRecordsRequest) => {
  return post<MessageRecordsResponse>("/api/v1/message/records", params);
};
