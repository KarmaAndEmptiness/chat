import { getUserInfo } from "@/apis/user";
import { removeToken } from "@/utils/auth";
import storage from "@/utils/storage";
import type { StoreDefinition } from "pinia";
type UserStoreId = "user";
type UserStoreState = {
  uid: number; // 用户ID
  nickname: string;
  mobile: string;
  avatar: string;
  online: boolean;
};

interface IUserStoreGetters {}

interface IUserStoreActions {
  logout(): void;
  updateOnlineStatus(status: boolean): void;
  loadUserInfo(): Promise<void>;
}

export const useUserStore: StoreDefinition<
  UserStoreId,
  UserStoreState,
  IUserStoreGetters,
  IUserStoreActions
> = defineStore("user", {
  state: (): UserStoreState => ({
    uid: 0, // 用户ID
    nickname: "",
    mobile: "",
    avatar: "",
    online: false,
  }),
  getters: {},
  actions: {
    logout() {
      this.$reset();
      removeToken();
      location.reload();
    },
    updateOnlineStatus(status: boolean) {
      this.online = status;
    },
    async loadUserInfo() {
      const data = await getUserInfo();
      const { uid, mobile, avatar, nickname } = data.user_info;
      this.uid = uid;
      this.nickname = nickname;
      this.mobile = mobile;
      this.avatar = avatar;
      storage.set("user_info", data.user_info);
    },
  },
});
