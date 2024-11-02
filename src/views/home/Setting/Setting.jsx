import React from 'react'
import { Outlet } from 'react-router-dom'
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import SubNav from '../../../components/SubNav';
const navs = [
    {
        name: '个人中心',
        path: 'user-center',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon
    },
    {
        name: '安全设置',
        path: 'security-setting',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon
    },
    {
        name: '个性设置',
        path: 'personal-setting',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon
    },
    {
        name: '绑定设置',
        path: 'bind-setting',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon
    },
    {
        name: '通知设置',
        path: 'note-setting',
        icon: NotificationsNoneOutlinedIcon,
        activeIcon: NotificationsIcon
    }
]
export default function Setting() {

    return (
        <>
            <SubNav navs={navs} title='我的设置' baseRoute='setting'>
                <Outlet />
            </SubNav>
        </>
    )
}
