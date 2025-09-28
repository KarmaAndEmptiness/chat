import { post } from "@/utils/request";
export type Platform = "web" | "windows" | "mac";

export type LoginRequest = {
  mobile: string;
  password: string;
  platform: Platform;
};

export type LoginResponse = {
  token: string;
  access_token: string;
  expires_in: number;
};

// 登录
export const login: (data: LoginRequest) => Promise<LoginResponse> = (
  data: LoginRequest
): Promise<LoginResponse> => {
  return post<LoginResponse>("/api/v1/auth/login", data);
};
