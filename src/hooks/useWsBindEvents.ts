import {useMessageStore} from "@/stores/message"
import {useUserStore} from "@/stores/user"
import wsSingleton from "@/utils/ws-singleton"

export const useWsBindEvents = () => {
    wsSingleton.onOpen = ()=>{
        useMessageStore().loadMessageList()
        useUserStore().updateOnlineStatus(true)
    }
}

