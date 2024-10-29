import React from 'react'
import { Route } from 'react-router-dom'
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import SubNav from '../../../components/SubNav';

const FriendNote = React.lazy(() => import('./FriendNote'))
const GroupNote = React.lazy(() => import('./GroupNote'))
const MyFriends = React.lazy(() => import('./MyFriends'))
const MyGroup = React.lazy(() => import('./MyGroup'))
const OpenGroup = React.lazy(() => import('./OpenGroup'))

const navs = [
    {
        name: '好友通知',
        path: 'friend-note',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon,
        showTitle: true
    },
    {
        name: '群聊通知',
        path: 'group-note',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon,
        showTitle: true
    },
    {
        name: '我的好友',
        path: 'my-friends',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon,
        showTitle: false
    }
    ,
    {
        name: '我的群聊',
        path: 'my-group',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon,
        showTitle: false
    },
    {
        name: '公开群聊',
        path: 'open-group',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon,
        showTitle: false
    }
]
export default function Friend() {
    const [selectedNav, setSelectedNav] = React.useState(navs[0]);
    return (
        <>
            <SubNav title='通讯录' navs={navs} baseRoute='friend'>
                <Route index path='friend-note' element={<FriendNote />} />
                <Route path='group-note' element={<GroupNote />} />
                <Route path='my-friends' element={<MyFriends />} />
                <Route path='my-group' element={<MyGroup />} />
                <Route path='open-group' element={<OpenGroup />} />
            </SubNav>
        </>
    )
}
