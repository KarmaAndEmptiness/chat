import { getUserInfo } from "@/apis/user";
import { removeToken } from "@/utils/auth";
import storage from "@/utils/storage";
import type { StoreDefinition } from "pinia";
type UserStoreId = "user";
type UserStoreState = {
  uid: number; // 用户ID
  mobile: string;
  avatar: string;
  online: boolean;
};

interface IUserStoreGetters {}

interface IUserStoreActions {
  logout(): void;
  updateOnlineStatus(status: boolean): void;
  getUserInfo(): Promise<void>;
}

export const useUserStore: StoreDefinition<
  UserStoreId,
  UserStoreState,
  IUserStoreGetters,
  IUserStoreActions
> = defineStore("user", {
  state: (): UserStoreState => ({
    uid: 0, // 用户ID
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
    async getUserInfo () {
      const data = await getUserInfo();
      const {uid,mobile,avatar} = data.user_info
      this.uid = uid
      this.mobile = mobile
      this.avatar = avatar
      storage.set("user_info", data.user_info)
    }
  },
});
