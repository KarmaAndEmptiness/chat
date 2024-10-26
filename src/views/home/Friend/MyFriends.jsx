import React from 'react'
import { Tabs, Tab, Box, List, ListItemButton, ListItemAvatar, Avatar, ListItemText, Badge, Divider, Tooltip, IconButton, Menu, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions, Button, TextField, Popover, Slide } from '@mui/material'
import { Chat as ChatIcon, MoreHoriz as MoreHorizIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles'

import { friends } from '~/data/friends.js'
import avatar from '~/assets/img/bg.jpg'
import FriendInfoDialog from '@/components/FriendInfoDialog';

const tabsLi = [
    {
        label: '全部'
    }
]


export default function MyFriends() {
    const [value, setValue] = React.useState(0);
    const [morePopoverAnchorEl, setMorePopoverAnchorEl] = React.useState(null);
    const [friendInfoDialogOpen, setfriendInfoDialogOpen] = React.useState(false);
    const [selectedFriend, setSelectedFriend] = React.useState(null);
    const [editCommentDialogOpen, setEditCommentDialogOpen] = React.useState(false);
    const [confirmDeleteFriendDialog, setConfirmDeleteFriendDialog] = React.useState(false);
    const morePopoverOpen = Boolean(morePopoverAnchorEl);

    const handleMorePopoverOpen = (event, friend) => {
        event.stopPropagation();
        setSelectedFriend(friend);
        setMorePopoverAnchorEl(event.currentTarget);
    };
    const handleMorePopoverClose = () => {
        setMorePopoverAnchorEl(null);
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
        setMorePopoverAnchorEl(null);
    };

    // 好友列表项点击处理函数
    const handleListItemClick = (event, friend) => {
        setSelectedFriend(friend);
        setfriendInfoDialogOpen(true);
    };

    //顶部分组导航栏切换处理函数
    const handleNavChange = (event, newValue) => {
        setValue(newValue);
    };

    const handlefriendInfoDialogClose = () => {
        setfriendInfoDialogOpen(false);
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
                    <Tabs value={value} onChange={handleNavChange} aria-label="tabs">
                        {
                            tabsLi.map((tab, idx) => (
                                <Tab key={tab.label} label={tab.label} />
                            ))
                        }
                    </Tabs>
                </Box>
            </Box>

            {/* 好友列表 */}
            <FriendsList
                morePopoverOpen={morePopoverOpen}
                morePopoverAnchorEl={morePopoverAnchorEl}

                onMorePopoverClose={handleMorePopoverClose}
                onMorePopoverOpen={handleMorePopoverOpen}
                onListItemClick={handleListItemClick}
                onMoreSelected={handleSelectMenu}
            />


            {/* 好友详细信息模态框 */}
            <FriendInfoDialog open={friendInfoDialogOpen} onClose={handlefriendInfoDialogClose} infoData={selectedFriend} />

            {/* 编辑备注模态框 */}
            <Dialog
                open={editCommentDialogOpen}
                onClose={handleEditCommentDialogClose}
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
            <ConfirmDeleteFriendDialog friendInfo={selectedFriend} open={confirmDeleteFriendDialog} onClose={handleConfirmDeleteFriendDialogClose} />

        </>

    )
}

//删除好友模态框的过渡组件
const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});
// 删除好友确认模态框
const ConfirmDeleteFriendDialog = ({ open, onClose, friendInfo }) => {
    return (
        <Dialog
            open={open}
            TransitionComponent={Transition}
            keepMounted
            onClose={onClose}
        >
            <DialogTitle>
                你确定删除好友{friendInfo && friendInfo.nickname}吗？
            </DialogTitle>
            <DialogContent>
                <DialogContentText >
                    请注意，删除操作将永久切断与该联系人的消息往来，您将不再接收任何来自他(她)们的信息。
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>取消</Button>
                <Button onClick={onClose}>确定</Button>
            </DialogActions>
        </Dialog>
    )
}

//好友列表
const FriendsList = ({ onListItemClick, onMoreSelected, morePopoverOpen, morePopoverAnchorEl, onMorePopoverOpen, onMorePopoverClose }) => {

    const handleSendMsgIconClick = (event) => {
        event.stopPropagation();
    }
    return (
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
                            onClick={(event) => onListItemClick(event, friend)}
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
                                    <Avatar alt={friend.nickname} src={avatar} />
                                </StyledBadge>
                            </ListItemAvatar>
                            <ListItemText
                                primary={friend.nickname}
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
                                    onClick={event => onMorePopoverOpen(event, friend)}
                                >
                                    <MoreHorizIcon />
                                </IconButton>

                                <Popover
                                    anchorEl={morePopoverAnchorEl}
                                    open={morePopoverOpen}
                                    onClose={onMorePopoverClose}
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
                                    <MenuItem elevation={1} onClick={(event) => onMoreSelected(event, 0)}>编辑备注</MenuItem>
                                    <MenuItem elevation={1} onClick={(event) => onMoreSelected(event, 1)}>删除</MenuItem>
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