import { isLogin } from "@/utils/auth";
import wsSingleton from "@/utils/ws-singleton";

export const useWsAutoConnect = () => {
  watchEffect(() => {
    if (isLogin() && !wsSingleton.isConnected()) {
      wsSingleton.connect();
    }
  });

};
