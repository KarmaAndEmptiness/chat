import React, { Suspense } from 'react'
import { Route, Routes, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, CircularProgress } from '@mui/material'
import { NotificationsNoneOutlined as NotificationsNoneOutlinedIcon, Notifications as NotificationsIcon } from '@mui/icons-material';

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

const LeftBox = function ({ onNavChange }) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        navigate(`/friend/${path}`, { replace: false });
        onNavChange(navs[index]);
    };
    return (
        <List component="nav" >
            {
                navs.map((nav, idx) => (
                    <ListItemButton
                        selected={selectedIndex === idx}
                        onClick={(event) => handleListItemClick(event, idx, nav.path)}
                        key={nav.name}
                        sx={
                            {
                                '& > div.css-cveggr-MuiListItemIcon-root':
                                {
                                    minWidth: '30px'
                                }
                            }
                        }
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

export default function Friend() {
    const [selectedNav, setSelectedNav] = React.useState(navs[0]);
    return (
        <>
            <div style={headerStyle}>通讯录</div>
            <Divider />

            <div style={containerStyle}>
                <div style={leftContainerStyle}>
                    {/* 左部导航栏 */}
                    <LeftBox onNavChange={(nav) => setSelectedNav(nav)} />
                </div>

                <div style={rightContainerStyle}>
                    {selectedNav.showTitle && (<>
                        <div style={_headerStyle}>{selectedNav.name}</div>
                        <Divider />
                    </>)}
                    <Suspense
                        fallback={
                            <div style={
                                {
                                    height: '90%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }>
                                <CircularProgress />
                            </div>
                        }
                    >
                        <Routes>
                            <Route index path='friend-note' element={<FriendNote />} />
                            <Route path='group-note' element={<GroupNote />} />
                            <Route path='my-friends' element={<MyFriends />} />
                            <Route path='my-group' element={<MyGroup />} />
                            <Route path='open-group' element={<OpenGroup />} />
                        </Routes>
                    </Suspense>
                </div>
            </div>

        </>
    )
}

const headerStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '.6rem'
}
const _headerStyle = {
    fontSize: '1rem',
    padding: '1rem 0 1rem 1rem',
}
const containerStyle = {
    display: 'flex',
}
const leftContainerStyle = {
    width: '130px',
    borderRight: '1px solid #ccc',
    flexShrink: 0,
    height: 'calc(100vh - 133px)'
}

const rightContainerStyle = {
    width: 'calc(100% - 130px)',
    height: 'calc(100vh - 239px)',
    backGroundColor: 'pink'
}