import React from 'react'
import { Route } from 'react-router-dom'
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, Notifications as NotificationsIcon } from '@mui/icons-material';
import SubNav from '../../../components/SubNav';

const UserCenter = React.lazy(() => import('./UserCenter'))
const SecuritySetting = React.lazy(() => import('./SecuritySetting'))
const PersonalSetting = React.lazy(() => import('./PersonalSetting'))
const BindSetting = React.lazy(() => import('./BindSetting'))
const NoteSetting = React.lazy(() => import('./NoteSetting'))

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
                <Route index path='user-center' element={<UserCenter />} />
                <Route path='security-setting' element={<SecuritySetting />} />
                <Route path='personal-setting' element={<PersonalSetting />} />
                <Route path='bind-setting' element={<BindSetting />} />
                <Route path='note-setting' element={<NoteSetting />} />
            </SubNav>
        </>
    )
}
