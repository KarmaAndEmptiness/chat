import React, { useState } from 'react'

import { styled } from '@mui/material/styles'

import { Box, Badge, Paper, InputBase, Divider, IconButton, Typography, List, ListItemButton, ListItem, ListItemText, ListItemAvatar, Avatar } from '@mui/material';
import { InsertDriveFileSharp as InsertDriveFileSharpIcon } from '@mui/icons-material';

import Search from '@/components/Search'
import AddGroupMemberDialog from '@/components/AddGroupMemberDialog'
import { chats } from '~/data/message.js'
import avatar from '~/assets/img/bg.jpg'



const Message = () => {
    const [leftBoxWidth, setLeftBoxWidth] = useState(350)
    const [startX, setStartX] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    const [addGroupMemberDialogOpen, setAddGroupMemberDialogOpen] = useState(false);

    const handleSearchAddClick = () => {
        setAddGroupMemberDialogOpen(true);
    }

    const handleMemberDialogClose = (event) => {
        setAddGroupMemberDialogOpen(false);
    }
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
                        padding: '20px 5px 0px 5px',
                    }
                }>
                    {/* 搜索 */}
                    <Search onAddIconClick={handleSearchAddClick} />
                    <AddGroupMemberDialog open={addGroupMemberDialogOpen} onClose={handleMemberDialogClose} />

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

// 搜索模块
// const Search = () => {
//     return (
//         <Paper
//             sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid rgba(0, 0, 0, 0.12)' }}
//             elevation={0}
//         >
//             <InputBase
//                 sx={{
//                     ml: 1, flex: 1, display: 'inline-flex', alignItems: 'center',
//                     '& > input': {
//                         padding: '0px',
//                         fontSize: '13px'
//                     }
//                 }}
//                 placeholder="搜索好友/群聊"
//             />
//             <IconButton type="button" sx={{ p: '5px' }}>
//                 <SearchIcon />
//             </IconButton>
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <IconButton color="primary" sx={{ p: '5px' }} >
//                 <GroupAddOutlinedIcon />
//             </IconButton>
//         </Paper>
//     )
// }

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

    return (
        <>
            <Box>
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
                >

                    {/* chatList */}
                    <Box sx={
                        {
                            flex: 'auto',
                            padding: '10px',
                            overflowY: 'auto',
                            scrollbarWidth: 'thin'
                        }
                    }>
                        {
                            chats[0].messages.map((message) => (
                                message.sender === 'You' ? (
                                    <React.Fragment key={`message-${message.id}`}>
                                        {/* you send */}
                                        <Box
                                            sx={
                                                {
                                                    display: 'flex',
                                                    justifyContent: 'end',
                                                    marginBottom: '20px'
                                                }
                                            }
                                        >
                                            <Box
                                                sx={
                                                    {
                                                        marginRight: '10px'
                                                    }
                                                }
                                            >
                                                <Box
                                                    sx={
                                                        {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }
                                                    }
                                                >
                                                    <Typography>{message.timestamp}</Typography>
                                                    <Typography>{'You'}</Typography>
                                                </Box>

                                                {
                                                    message.attachment ? (
                                                        <>
                                                            {/* file bubble */}
                                                            <Box
                                                                sx={
                                                                    {
                                                                        borderRadius: '10 0 10px 10px',
                                                                        backgroundColor: '#1976d2',
                                                                        width: 'fit-content',
                                                                        padding: '8px',
                                                                        maxWidth: '435px',
                                                                    }
                                                                }
                                                            >
                                                                <Box
                                                                    sx={
                                                                        {
                                                                            display: 'flex',
                                                                            alignItems: 'center'
                                                                        }
                                                                    }
                                                                >
                                                                    <Box
                                                                        sx={
                                                                            {
                                                                                height: '45px',
                                                                                width: '45px',
                                                                                padding: '10px',
                                                                                background: '#E3EFFB',
                                                                                borderRadius: '50%',
                                                                                paddingLeft: '11px'
                                                                            }
                                                                        }>
                                                                        <InsertDriveFileSharpIcon sx={
                                                                            {
                                                                                color: '#12467B'
                                                                            }
                                                                        } />
                                                                    </Box>
                                                                    <Box
                                                                        sx={
                                                                            {
                                                                                fontSize: '14px',
                                                                                marginLeft: '10px',
                                                                                color: '#fff'
                                                                            }
                                                                        }
                                                                    >
                                                                        <Box>
                                                                            {message.attachment.fileName}
                                                                        </Box>
                                                                        <Box>
                                                                            {message.attachment.size}
                                                                        </Box>
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </>
                                                    ) : (<>
                                                        {/* chat bubble */}
                                                        <Box
                                                            sx={
                                                                {
                                                                    borderRadius: '10px 0 10px 10px',
                                                                    backgroundColor: '#1976d2',
                                                                    width: 'fit-content',
                                                                    padding: '8px',
                                                                    maxWidth: '435px',
                                                                    color: '#fff'
                                                                }
                                                            }
                                                        >

                                                            {message.content}
                                                        </Box>
                                                    </>)
                                                }

                                            </Box>

                                            <Avatar alt="r" src={avatar} />
                                        </Box>
                                    </React.Fragment>
                                ) : (
                                    <React.Fragment key={`message-${message.id}`}>
                                        {/* friend send */}
                                        <Box
                                            sx={
                                                {
                                                    display: 'flex',
                                                    marginBottom: '20px'
                                                }
                                            }
                                        >
                                            <Avatar alt="r" src={avatar} />
                                            <Box
                                                sx={
                                                    {
                                                        marginLeft: '10px'
                                                    }
                                                }
                                            >
                                                <Box
                                                    sx={
                                                        {
                                                            display: 'flex',
                                                            justifyContent: 'space-between',
                                                        }
                                                    }
                                                >
                                                    <Typography>{message.sender.name}</Typography>
                                                    <Typography>{message.timestamp}</Typography>
                                                </Box>



                                                {
                                                    message.attachment ? (<>
                                                        {/* file bubble */}
                                                        <Box
                                                            sx={
                                                                {
                                                                    borderRadius: '0 10px 10px',
                                                                    backgroundColor: '#fff',
                                                                    width: 'fit-content',
                                                                    padding: '8px',
                                                                    maxWidth: '435px'
                                                                }
                                                            }
                                                        >
                                                            <Box
                                                                sx={
                                                                    {
                                                                        display: 'flex',
                                                                        alignItems: 'center'
                                                                    }
                                                                }
                                                            >
                                                                <Box
                                                                    sx={
                                                                        {
                                                                            height: '45px',
                                                                            width: '45px',
                                                                            padding: '10px',
                                                                            background: '#E3EFFB',
                                                                            borderRadius: '50%',
                                                                            paddingLeft: '11px'
                                                                        }
                                                                    }>
                                                                    <InsertDriveFileSharpIcon sx={
                                                                        {
                                                                            color: '#12467B'
                                                                        }
                                                                    } />
                                                                </Box>
                                                                <Box
                                                                    sx={
                                                                        {
                                                                            fontSize: '14px',
                                                                            marginLeft: '10px'
                                                                        }
                                                                    }
                                                                >
                                                                    <Box>
                                                                        {message.attachment.fileName}
                                                                    </Box>
                                                                    <Box>
                                                                        {message.attachment.size}
                                                                    </Box>
                                                                </Box>
                                                            </Box>
                                                        </Box>
                                                    </>) : (
                                                        <>
                                                            {/* chat bubble */}
                                                            <Box
                                                                sx={
                                                                    {
                                                                        borderRadius: '0 10px 10px',
                                                                        backgroundColor: '#fff',
                                                                        width: 'fit-content',
                                                                        padding: '8px',
                                                                        maxWidth: '435px'
                                                                    }
                                                                }
                                                            >
                                                                {message.content}
                                                            </Box>
                                                        </>
                                                    )
                                                }
                                            </Box>
                                        </Box>
                                    </React.Fragment>
                                )
                            ))
                        }
                    </Box>

                    {/* message input */}
                    <Box
                        sx={
                            {
                                flex: '1 0 165px',
                                padding: '0 16px 24px',
                                maxHeight: '200px'
                            }
                        }
                    >

                        <Box sx={
                            {
                                borderRadius: '6px',
                                backgroundColor: '#fff',
                                width: '100%',
                                height: '100%',
                                outline: '1px solid #ccc',
                                padding: '0 5px',
                                display: 'flex',
                                flexDirection: 'column'
                            }
                        }>
                            <textarea placeholder='type something here ....' style={
                                {
                                    flex: '1 1 70%',
                                    resize: 'none',
                                    outline: 'none',
                                    border: 'none',
                                    width: "100%",
                                    borderBottom: '1px solid #ccc',
                                    padding: '5px 0 5px 12px',
                                }
                            }>

                            </textarea>
                            <div style={
                                {
                                    flex: '0 0 30%',
                                    width: '100%',
                                }
                            }>
                            </div>
                        </Box>
                    </Box>

                </Box>
            </Box >
        </>
    )
}

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

