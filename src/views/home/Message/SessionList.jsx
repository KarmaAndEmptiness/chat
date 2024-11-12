import React, { useState } from 'react'
import { styled } from '@mui/material/styles'
import { chats } from '~/data/message.js'
import avatar from '~/assets/img/bg.jpg'
import { Avatar, Divider, Badge, List, ListItemAvatar, ListItemButton, ListItemText, Typography } from '@mui/material';
function SessionList() {
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

export default SessionList
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