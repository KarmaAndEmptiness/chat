import { post } from "@/utils/request";

export type UserInfo = {
  uid: number;
  nickname: string;
  avatar: string;
  motto: string;
  gender: number;
  is_qiye: boolean;
  mobile: string;
  email: string;
};
export type ConfigInfo = {
  theme_mode: string;
  theme_bag_img: string;
  theme_color: string;
  notify_cue_tone: string;
  keyboard_event_notify: string;
};

export type UserInfoResponse = {
  user_info: UserInfo;
  setting: ConfigInfo;
};
export const getUserInfo: () => Promise<UserInfoResponse> = () => {
  return post<UserInfoResponse>("/api/v1/user/setting");
};
