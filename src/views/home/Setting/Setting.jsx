import React, { Suspense } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, CircularProgress } from '@mui/material'
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

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

const LeftBox = function () {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        navigate(`/setting/${path}`, { replace: false });
    };
    return (
        <List component="nav" >
            {
                navs.map((nav, idx) => (
                    <ListItemButton
                        selected={selectedIndex === idx}
                        onClick={(event) => handleListItemClick(event, idx, nav.path)}
                        key={nav.name}
                    >
                        <ListItemIcon>
                            {selectedIndex === idx ? <nav.activeIcon /> : <nav.icon />}
                        </ListItemIcon>
                        <ListItemText primary={nav.name} />
                    </ListItemButton>
                ))
            }
        </List>
    )
}

export default function Setting() {

    return (
        <>
            <div style={headerStyle}>我的设置</div>
            <Divider />

            <div style={containerStyle}>
                <div style={leftContainerStyle}>
                    {/* 左部导航栏 */}
                    <LeftBox />
                </div>

                <div style={rightContainerStyle}>
                    <Suspense
                        fallback={
                            <div style={
                                {
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }>
                                <CircularProgress />
                            </div>
                        }
                    >
                        <Routes>
                            <Route index path='user-center' element={<UserCenter />} />
                            <Route path='security-setting' element={<SecuritySetting />} />
                            <Route path='personal-setting' element={<PersonalSetting />} />
                            <Route path='bind-setting' element={<BindSetting />} />
                            <Route path='note-setting' element={<NoteSetting />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>

        </>
    )
}

const headerStyle = {
    fontSize: '1.5rem',
    fontWeight: '400',
    padding: '1rem 0rem 1rem 1rem'
}

const containerStyle = {
    display: 'flex',
}
const leftContainerStyle = {
    width: '180px',
    borderRight: '1px solid #ccc',
    flexShrink: 0,
    height: 'calc(100vh - 133px)'
}

const rightContainerStyle = {
    width: 'calc(100% - 180px)',
}