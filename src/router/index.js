import React from 'react'
import { createBrowserRouter, Navigate } from 'react-router-dom'

import Login from '@/views/login/Login'
import Register from '@/views/register/Register'
import Home from '@/views/home/Home'

const Message = React.lazy(() => import('@/views/home/Message'))
const Friend = React.lazy(() => import('@/views/home/Friend/Friend'))
const Note = React.lazy(() => import('@/views/home/Note'))
const Setting = React.lazy(() => import('@/views/home/Setting/Setting'))

const FriendNote = React.lazy(() => import('@/views/home/Friend/FriendNote'))
const GroupNote = React.lazy(() => import('@/views/home/Friend/GroupNote'))
const MyFriends = React.lazy(() => import('@/views/home/Friend/MyFriends'))
const MyGroup = React.lazy(() => import('@/views/home/Friend/MyGroup'))
const OpenGroup = React.lazy(() => import('@/views/home/Friend/OpenGroup'))

const UserCenter = React.lazy(() => import('@/views/home/Setting/UserCenter'))
const SecuritySetting = React.lazy(() => import('@/views/home/Setting/SecuritySetting'))
const PersonalSetting = React.lazy(() => import('@/views/home/Setting/PersonalSetting'))
const BindSetting = React.lazy(() => import('@/views/home/Setting/BindSetting'))
const NoteSetting = React.lazy(() => import('@/views/home/Setting/NoteSetting'))



const router = createBrowserRouter([
    {
        path: 'login',
        element: <Login />,

    },
    {
        path: 'register',
        element: <Register />,

    },
    {
        path: '/',
        element: <Home />,
        children: [
            {
                path: '',
                element: <Navigate to="message" /> // 直接重定向到 /message
            },
            {
                path: 'message',
                element: <Message />,
            },
            {
                path: 'friend',
                element: <Friend />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="friend-note" /> // 直接重定向到 /friend-note
                    },
                    {
                        path: 'friend-note',
                        element: <FriendNote />,
                    },
                    {
                        path: 'group-note',
                        element: <GroupNote />
                    },
                    {
                        path: 'my-friends',
                        element: <MyFriends />
                    },
                    {
                        path: 'my-group',
                        element: <MyGroup />
                    },
                    {
                        path: 'open-group',
                        element: <OpenGroup />
                    }
                ]
            },
            {
                path: 'note',
                element: <Note />
            },
            {
                path: 'setting',
                element: <Setting />,
                children: [
                    {
                        path: '',
                        element: <Navigate to="user-center" /> // 直接重定向到 /user-center
                    },
                    {
                        path: 'user-center',
                        element: <UserCenter />,
                    },
                    {
                        path: 'security-setting',
                        element: <SecuritySetting />
                    },
                    {
                        path: 'personal-setting',
                        element: <PersonalSetting />
                    },
                    {
                        path: 'bind-setting',
                        element: <BindSetting />
                    },
                    {
                        path: 'note-setting',
                        element: <NoteSetting />
                    }
                ]
            }
        ]
    }
])
export default router;