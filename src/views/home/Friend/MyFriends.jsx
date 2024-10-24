import React from 'react'
import { Tabs, Tab, Box, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Badge, Divider } from '@mui/material'
import { styled } from '@mui/material/styles'

import { friends } from '~/data/friends.js'
import avatar from '~/assets/img/bg.jpg'

const tabsLi = [
    {
        label: '全部'
    }
]


export default function MyFriends() {
    const [value, setValue] = React.useState(0);
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
        <>
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: '1rem' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        {
                            tabsLi.map((tab, idx) => (
                                <Tab label={tab.label} />
                            ))
                        }
                    </Tabs>
                </Box>
            </Box>
            <List
                sx={
                    {
                        overflow: 'auto',
                        maxHeight: '100%',
                        scrollbarWidth: 'thin',
                    }
                }
            >
                {
                    friends && friends.map((friend, index) => (
                        <React.Fragment key={`react-fragment-${friend.username}`}>
                            <ListItemButton
                                selected={selectedIndex === index}
                                onClick={(event) => handleListItemClick(event, index)}
                            >
                                <ListItemAvatar>
                                    <StyledBadge
                                        overlap="circular"
                                        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                        variant="dot"
                                        sx={
                                            {
                                                ...(friend.online && {
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
                                        <Avatar alt={friend.name} src={avatar} />
                                    </StyledBadge>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={friend.name}
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
                                        {friend.comment}
                                    </span>} />
                                <ListItemText secondary={<span style={
                                    {
                                        fontSize: '12px',
                                    }
                                }>
                                    {friend.phone}
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