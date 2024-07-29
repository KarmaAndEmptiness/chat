import React, { useState } from 'react'

import { styled } from '@mui/material/styles'

import { Box, Badge, Paper, InputBase, Divider, IconButton, Typography, List, ListItemButton, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';

import { chats } from '~/data/message.js'
import avatar from '~/assets/img/bg.jpg'

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));


// 搜索模块
const Search = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', marginTop: '10px', border: '1px solid rgba(0, 0, 0, 0.12)' }}
            elevation={0}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="搜索好友/群聊"
            />
            <IconButton type="button" sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} >
                <GroupAddOutlinedIcon />
            </IconButton>
        </Paper>
    )
}

// 会话记录
const SessionList = () => {
    const [selectedSessionIndex, setSelectedSessionIndex] = useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedSessionIndex(index);
    };

    return (
        <>
            <Typography sx={
                {
                    marginTop: '10px',
                    marginBottom: '5px'
                }
            }>会话记录</Typography>

            <Divider sx={
                {
                    marginBottom: '5px'
                }
            } />
            <List sx={
                {
                    overflow: 'auto',
                    maxHeight: 'calc(100% - 104.1px)',
                    scrollbarWidth: 'thin',
                }
            }>
                {
                    chats && chats.map((chat, index) => (
                        <React.Fragment key={`react-fragment-${chat.id}`}>
                            <ListItemButton
                                selected={selectedSessionIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}
                            >
                                <ListItemAvatar>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        sx={
                                            {
                                                ...(chat.sender.online && {
                                                    '& .MuiBadge-badge':
                                                    {
                                                        backgroundColor: 'grey',
                                                        color: 'grey',
                                                        '&::after': {
                                                            animation: 'none !important'
                                                        }
                                                    }
                                                }),
                                            }
                                        }
                                    >
                                        <Avatar alt={chat.sender.name} src={avatar} />
                                    </StyledBadge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={chat.sender.name}
                                    secondary={<span
                                        style={
                                            {
                                                display: 'block',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                overflow: 'hidden',
                                                maxWidth: '150px'
                                            }
                                        }
                                    >
                                        {chat.messages[chat.messages.length - 1].content}
                                    </span>} />
                                <ListItemText secondary={<span style={
                                    {
                                        fontSize: '12px',
                                    }
                                }>
                                    {chat.messages[chat.messages.length - 1].timestamp}
                                </span>}
                                    sx={
                                        {
                                            marginRight: 'auto',
                                            textAlign: 'end',
                                            height: '100%',
                                        }
                                    }
                                />
                            </ListItemButton>
                            <Divider variant="inset" component="li" />
                        </React.Fragment>
                    ))
                }
            </List>

        </>
    )

}

// 消息面板
const MessagesPane = () => {
    const [bottomBoxWidth, setBottomBoxWidth] = useState(200)
    const [startY, setStartY] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    const handleMouseMove = (e) => {
        if (mouseDown) {
            if (e.target.style.userSelect !== 'none') {
                e.target.style.userSelect = 'none'
            }
            const offsetY = e.clientY - startY
            if (bottomBoxWidth < 200) {
                setBottomBoxWidth(200)
                return
            }
            if (bottomBoxWidth > 500) {
                setBottomBoxWidth(500)
                return
            }

            // 上面的盒子越大，底下的盒子越小 所以是 prev - offsetY
            setBottomBoxWidth(prev => (prev - offsetY))

            // 以上一次的位置为起点算位移
            setStartY(e.clientY)
        }
        else {
            if (e.target.style.userSelect === 'none') {
                e.target.style.userSelect = ''
            }
        }
    }
    const handleMouseDown = (e) => {
        setMouseDown(true)
        setStartY(e.clientY)
        e.preventDefault()
    }
    const handleMouseUp = () => {
        setMouseDown(false)
    }

    const handleMouseLeave = () => {
        setMouseDown(false)
    }
    return (
        <>
            <Box onMouseLeave={handleMouseLeave}>
                {/* Header */}
                <List sx={{ borderBottom: '1px solid rgba(0, 0, 0, 0.12)' }}>
                    <ListItem>
                        <ListItemAvatar>
                            <Avatar alt={chats[0].sender.name} src={avatar} />
                        </ListItemAvatar>
                        <ListItemText
                            primary={
                                <Box sx={
                                    {
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }>
                                    <Box sx={
                                        {
                                            marginRight: '5px'
                                        }
                                    }>
                                        {chats[0].sender.name}
                                    </Box>
                                    <Box
                                        sx={
                                            {
                                                border: '1px solid #ccc',
                                                display: 'flex',
                                                alignItems: 'center',
                                                fontSize: '12px',
                                                padding: '5px 8px',
                                                borderRadius: '10px'
                                            }
                                        }
                                    >
                                        {
                                            chats[0].sender.online ? (
                                                <>
                                                    <Box sx={{
                                                        marginRight: '5px',
                                                        position: 'relative',
                                                        backgroundColor: '#44b700',
                                                        borderRadius: '50%',
                                                        width: '8px',
                                                        height: '8px',
                                                        color: '#44b700',
                                                        '&::after': {
                                                            position: 'absolute',
                                                            top: 0,
                                                            left: 0,
                                                            right: 0,
                                                            bottom: 0,
                                                            borderRadius: '50%',
                                                            animation: 'ripple 1.2s infinite ease-in-out',
                                                            border: '1px solid currentColor',
                                                            content: '""',
                                                            margin: 'auto',
                                                        },
                                                        '@keyframes ripple': {
                                                            '0%': {
                                                                transform: 'scale(.8)',
                                                                opacity: 1,
                                                            },
                                                            '100%': {
                                                                transform: 'scale(2.4)',
                                                                opacity: 0,
                                                            },
                                                        },
                                                    }}></Box>
                                                    在线
                                                </>
                                            ) : (<>
                                                <Box sx={{
                                                    position: 'relative',
                                                    backgroundColor: 'grey',
                                                    borderRadius: '50%',
                                                    width: '8px',
                                                    height: '8px',
                                                    marginRight: '5px',
                                                }}></Box>
                                                离线
                                            </>)
                                        }

                                    </Box>

                                </Box>
                            }
                            secondary={
                                chats[0].sender.username
                            }
                        />

                    </ListItem>
                </List>

                {/* Main */}
                <Box sx={
                    {
                        height: 'calc(100vh - 159px)',
                        display: 'flex',
                        flexDirection: 'column',
                        background: 'rgba(25, 118, 210, 0.08)'
                    }
                }

                    onMouseMove={handleMouseMove}
                    onMouseUp={handleMouseUp}
                >

                    {/* chatList */}
                    <Box sx={
                        {
                            flex: 'auto',
                        }
                    }>
                        <Box
                            sx={
                                {
                                    borderRadius: '0 10px 10px',
                                    backgroundColor: '#daf3fd',
                                    width: 'fit-content'
                                }
                            }
                        >

                            {chats[0].messages[0].content}
                        </Box>
                    </Box>
                    {/* 调整高度线 */}
                    <Box sx={
                        {
                            height: '2px',
                        }
                    }
                        onMouseDown={handleMouseDown}
                    >
                        <Box
                            sx={
                                {
                                    height: '1px',
                                    width: '100%',
                                    background: 'rgba(0, 0, 0, 0.12)',
                                    '&:hover': {
                                        height: '2px',
                                        background: '#1890ff',
                                        cursor: 'row-resize'
                                    }
                                }
                            }
                        ></Box>
                    </Box>

                    {/* message input */}
                    <Box
                        sx={
                            {
                                minHeight: '200px',
                                maxHeight: '500px',
                                height: `${bottomBoxWidth}px`,
                            }
                        }
                    >
                        1
                    </Box>

                </Box>
            </Box >
        </>
    )
}

const Message = () => {
    const [leftBoxWidth, setLeftBoxWidth] = useState(350)
    const [startX, setStartX] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    const handleMouseMove = (e) => {
        if (mouseDown) {
            if (e.target.style.userSelect !== 'none') {
                e.target.style.userSelect = 'none'
            }
            const offsetX = e.clientX - startX
            if (leftBoxWidth < 200) {
                setLeftBoxWidth(200)
                return
            }
            if (leftBoxWidth > 500) {
                setLeftBoxWidth(500)
                return
            }
            setLeftBoxWidth(prev => (prev + offsetX))

            // 以上一次的位置为起点算位移
            setStartX(e.clientX)
        }
        else {
            if (e.target.style.userSelect === 'none') {
                e.target.style.userSelect = ''
            }
        }
    }
    const handleMouseDown = (e) => {
        setMouseDown(true)
        setStartX(e.clientX)
        e.preventDefault()
    }
    const handleMouseUp = () => {
        setMouseDown(false)
    }
    const handleMouseLeave = () => {
        setMouseDown(false)
    }

    return (
        <>
            <Box sx={
                {
                    height: '100%',
                    display: 'flex',

                }
            }
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
            >

                {/* 左侧区域 */}
                <Box sx={
                    {
                        width: `${leftBoxWidth}px`,
                        minWidth: '200px',
                        maxWidth: '500px',
                        padding: '0 5px'
                    }
                }>
                    {/* 搜索 */}
                    <Search />

                    {/* 会话记录 */}
                    <SessionList />
                </Box>

                {/* 调整宽度线 */}
                <Box sx={
                    {
                        width: '2px',
                    }
                }
                    onMouseDown={handleMouseDown}
                >
                    <Box
                        sx={
                            {
                                width: '1px',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                '&:hover': {
                                    width: '2px',
                                    backgroundColor: '#1890ff',
                                    cursor: 'col-resize'
                                }
                            }
                        }
                    ></Box>
                </Box>

                {/* 右侧区域 */}
                <Box sx={
                    {
                        flex: 'auto',
                    }
                }>
                    <MessagesPane />
                </Box>
            </Box>
        </>
    )
}
export default Message;