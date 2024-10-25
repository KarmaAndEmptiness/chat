import React from 'react'
import { Tabs, Tab, Box, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Badge, Divider, Tooltip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Popover } from '@mui/material'
import { Chat as ChatIcon, MoreHoriz as MoreHorizIcon, Close as CloseIcon } from '@mui/icons-material';
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
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [friendInfoDialogOpen, setfriendInfoDialogOpen] = React.useState(false);
    const [editCommentDialogOpen, setEditCommentDialogOpen] = React.useState(false);
    const [confirmDeleteFriendDialog, setConfirmDeleteFriendDialog] = React.useState(false);
    const open = Boolean(anchorEl);

    const handlePopoverOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };
    const handlePopoverClose = () => {
        setAnchorEl(null);
    };
    const handleSelectMenu = (event, id) => {
        event.stopPropagation();
        switch (id) {
            case 0:
                setEditCommentDialogOpen(true);
                break;
            case 1:
                setConfirmDeleteFriendDialog(true);
                break;
        }
    };
    const handleSelectMenuClose = (event) => {
        event.stopPropagation();
        setAnchorEl(null);
    };
    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
        setfriendInfoDialogOpen(true);
    };

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlefriendInfoDialogClose = () => {
        setfriendInfoDialogOpen(false);
    }

    const handleSendMsgIconClick = (event) => {
        event.stopPropagation();
    }
    const handleConfirmDeleteFriendDialogClose = (event) => {
        event.stopPropagation();
        setConfirmDeleteFriendDialog(false);
    }
    const handleEditCommentDialogClose = (event) => {
        event.stopPropagation();
        setEditCommentDialogOpen(false);
    }
    return (
        <>
            {/* 列表顶部的分类导航栏 */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: '1rem' }}>
                    <Tabs value={value} onChange={handleChange} aria-label="tabs">
                        {
                            tabsLi.map((tab, idx) => (
                                <Tab key={tab.label} label={tab.label} />
                            ))
                        }
                    </Tabs>
                </Box>
            </Box>

            {/* 好友列表 */}
            <List
                sx={
                    {
                        overflow: 'auto',
                        maxHeight: '111%',
                        scrollbarWidth: 'thin',
                    }
                }
            >
                {
                    friends && friends.map((friend, index) => (
                        <React.Fragment key={`friends-${friend.username}-${friend.id}`}>
                            <ListItemButton
                                // selected={selectedIndex === index}
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
                                        个性签名：{friend.personalSign === null || friend.personalSign === ' ' ? '暂无' : friend.personalSign}
                                    </span>} />
                                <ListItemText secondary={<span style={
                                    {
                                        fontSize: '12px',
                                    }
                                }>
                                    <Tooltip title="发消息">
                                        <IconButton onClick={handleSendMsgIconClick}>
                                            <ChatIcon />
                                        </IconButton>
                                    </Tooltip>

                                    <IconButton
                                        onMouseEnter={handlePopoverOpen}
                                        onMouseLeave={handlePopoverClose}
                                    >
                                        <MoreHorizIcon />
                                    </IconButton>

                                    <Popover
                                        anchorEl={anchorEl}
                                        open={open}
                                        onClose={handleSelectMenuClose}
                                        anchorOrigin={{
                                            vertical: 'center',
                                            horizontal: 'left',
                                        }}
                                        transformOrigin={{
                                            vertical: 'center',
                                            horizontal: 'right',
                                        }}
                                        elevation={1}
                                    >
                                        <MenuItem elevation={1} onClick={(event) => handleSelectMenu(event, 0)}>编辑备注</MenuItem>
                                        <MenuItem elevation={1} onClick={(event) => handleSelectMenu(event, 1)}>删除</MenuItem>
                                    </Popover>
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

            {/* 好友详细信息模态框 */}
            <Dialog
                open={friendInfoDialogOpen}
                onClose={handlefriendInfoDialogClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <IconButton
                    aria-label="close"
                    onClick={handlefriendInfoDialogClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                        width: '20px',
                        height: '20px'
                    })}
                >
                    <CloseIcon sx={
                        {
                            fontSize: '20px',
                            color: '#fff'
                        }
                    } />
                </IconButton>
                <DialogContent sx={
                    {
                        width: 360, height: 460,
                        padding: 0,
                        background: 'skyblue'
                    }
                }>
                    <Box sx={
                        {
                            display: 'flex',
                            justifyContent: 'center',
                            flexWrap: 'wrap',
                            paddingTop: 10
                        }
                    }>
                        <Avatar src={avatar} sx={
                            {
                                width: 50, height: 50
                            }
                        } />
                        <Box sx={
                            {
                                width: '100%',
                                fontSize: 20,
                                fontWeight: 700,
                                textAlign: 'center'
                            }
                        }>hola world</Box>
                    </Box>

                    <Box sx={
                        {
                            background: '#fff',
                            padding: '5px 10px',
                            height: 'calc(100% - 160px)'
                        }
                    }>
                        <Box>个性签名：hhhhh</Box>
                        <Box>手机：12345645</Box>
                        <Box>用户名：0v0</Box>
                        <Box>性别：男</Box>
                        <Box>邮箱：男</Box>
                        <Box>分组：全部</Box>
                        <Box>备注：1</Box>
                    </Box>
                </DialogContent>
                <DialogActions
                    sx={
                        {
                            display: 'flex',
                            justifyContent: 'center'
                        }
                    }
                >
                    <Button variant='contained' onClick={handlefriendInfoDialogClose} sx={
                        {
                            width: '60%'
                        }
                    }>
                        发送消息
                    </Button>
                </DialogActions>
            </Dialog >

            {/* 编辑备注模态框 */}
            <Dialog
                open={editCommentDialogOpen}
                onClose={handleEditCommentDialogClose}
                PaperProps={{
                    component: 'form',
                    // onSubmit: (event) => {
                    //     event.preventDefault();
                    //     const formData = new FormData(event.currentTarget);
                    //     const formJson = Object.fromEntries(formData.entries());
                    //     const email = formJson.email;
                    //     console.log(email);
                    //     handleClose();
                    // },
                }}
            >
                <DialogTitle>修改备注</DialogTitle>
                <DialogContent>
                    <TextField
                        autoFocus
                        margin="dense"
                        id="name"
                        name="email"
                        label="好友备注"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleEditCommentDialogClose}>取消</Button>
                    <Button onClick={handleEditCommentDialogClose}>确定</Button>
                </DialogActions>
            </Dialog>

            {/* 删除好友确认模态框 */}
            <Dialog
                open={confirmDeleteFriendDialog}
                keepMounted
                onClose={handleConfirmDeleteFriendDialogClose}
                aria-describedby="alert-dialog-slide-description"
            >
                <DialogTitle>{"Use Google's location service?"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-slide-description">
                        Let Google help apps determine location. This means sending anonymous
                        location data to Google, even when no apps are running.
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleConfirmDeleteFriendDialogClose}>取消</Button>
                    <Button onClick={handleConfirmDeleteFriendDialogClose}>确认</Button>
                </DialogActions>
            </Dialog>
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