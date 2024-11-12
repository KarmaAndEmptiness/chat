import React, { useState } from 'react'
import { Avatar, Box, List, ListItem, ListItemAvatar, ListItemText, Typography } from '@mui/material'
import { chats } from '~/data/message.js'
import avatar from '~/assets/img/bg.jpg'
import { InsertDriveFileSharp as InsertDriveFileSharpIcon } from '@mui/icons-material';
import Picker from 'emoji-picker-react';
function MessagePane() {
    return (
        <>
            <Box>
                {/* Header */}
                <Header />

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
                    <ChatList />

                    {/* message input */}
                    <MessageInput />
                </Box>
            </Box >
        </>
    )
}

export default MessagePane

const ChatList = () => {
    return (
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
                                                    theme =>
                                                    (
                                                        {
                                                            borderRadius: '0 10px 10px',

                                                            backgroundColor: '#fff',
                                                            ...theme.applyStyles('dark', {
                                                                backgroundColor: 'yellowgreen'
                                                            }),
                                                            width: 'fit-content',
                                                            padding: '8px',
                                                            maxWidth: '435px'
                                                        }
                                                    )
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
                                                    sx={theme =>
                                                    (
                                                        {
                                                            borderRadius: '0 10px 10px',
                                                            backgroundColor: '#fff',
                                                            ...theme.applyStyles('dark', {
                                                                backgroundColor: 'yellowgreen'
                                                            }),
                                                            width: 'fit-content',
                                                            padding: '8px',
                                                            maxWidth: '435px'
                                                        }
                                                    )
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


    )
}
const Header = () => {
    return (
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


    )
}
const MessageInput = () => {
    const [message, setMessage] = useState('');  // 保存文本消息
    const [showEmojiPicker, setShowEmojiPicker] = useState(false);  // 控制表情选择器显示
    const [selectedImage, setSelectedImage] = useState(null);  // 保存选择的图片

    // 更新消息输入框内容
    const handleInputChange = (event) => {
        setMessage(event.target.value);
    };

    // 选择表情并添加到消息输入框
    const onEmojiClick = (emojiObject) => {
        setMessage((prevMessage) => prevMessage + emojiObject.emoji);
    };

    // 选择图片文件
    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedImage(URL.createObjectURL(file));
        }
    };

    // 发送消息
    const handleSendMessage = () => {
        const messageData = {
            text: message,
            image: selectedImage,
        };
        console.log("发送的消息:", messageData);

        // 发送消息后清空输入框和图片
        setMessage('');
        setSelectedImage(null);
    };
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <div style={{ marginBottom: '10px' }}>
                <textarea
                    rows="3"
                    placeholder="输入消息..."
                    value={message}
                    onChange={handleInputChange}
                    style={{ width: '100%', padding: '5px', resize: 'none' }}
                />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                {/* 表情选择按钮 */}
                <button onClick={() => setShowEmojiPicker((prev) => !prev)}>
                    😀
                </button>
                {showEmojiPicker && <Picker onEmojiClick={onEmojiClick} />}

                {/* 图片上传按钮 */}
                <input type="file" accept="image/*" onChange={handleImageUpload} style={{ display: 'none' }} id="upload" />
                <label htmlFor="upload" style={{ cursor: 'pointer', padding: '5px 10px', backgroundColor: '#eee', borderRadius: '3px' }}>上传图片</label>

                {/* 发送按钮 */}
                <button onClick={handleSendMessage} style={{ padding: '5px 10px', backgroundColor: '#007bff', color: '#fff', borderRadius: '3px', border: 'none' }}>
                    发送
                </button>
            </div>

            {/* 预览选择的图片 */}
            {selectedImage && (
                <div style={{ marginTop: '10px' }}>
                    <img src={selectedImage} alt="Preview" style={{ width: '100%', borderRadius: '5px' }} />
                </div>
            )}
        </div>
    );
}