import React from 'react'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, Drawer, Grid, IconButton, List, Paper, Popover, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { MoreHorizOutlined as MoreHorizOutlinedIcon, Close as CloseIcon } from '@mui/icons-material';
import { styled } from '@mui/material/styles';

import FriendInfoDialog from '@/components/FriendInfoDialog';
import { groups } from '~/data/groups.js'
import avatar from '~/assets/img/bg.jpg'

const tabsLi = [
    {
        name: '全部群聊'
    },
    {
        name: '我创建的'
    },
    {
        name: '我加入的'
    },

]

export default function MyGroup() {
    const [activeGroup, setActiveGroup] = React.useState(0);
    const [groupInfoDrawerOpen, setGroupInfoDrawerOpen] = React.useState(false);
    const [currentOpenGroup, setCurrentOpenGroup] = React.useState(null);

    const handleChangeGroup = (event, selectedGroup) => {
        setActiveGroup(selectedGroup)
    }
    const handleGroupInfoDrawerClose = () => {
        setGroupInfoDrawerOpen(false);
    }

    const handleGroupPaperClick = (index) => {
        setCurrentOpenGroup(groups[index])
        setGroupInfoDrawerOpen(true);
    }
    return (
        <>
            {/* 列表顶部的分类导航栏 */}
            <Box sx={{ width: '100%' }}>
                <Box sx={{ borderBottom: 1, borderColor: 'divider', paddingLeft: '1rem' }}>
                    <Tabs value={activeGroup} onChange={handleChangeGroup} aria-label="tabs">
                        {
                            tabsLi.map((tab, idx) => (
                                <Tab key={tab.name} label={tab.name} />
                            ))
                        }
                    </Tabs>
                </Box>
            </Box>

            {/* 群聊列表 */}
            <GroupsList onGroupItemClick={handleGroupPaperClick} />

            {/* 群聊详细信息 */}
            <GroupDetailInfo open={groupInfoDrawerOpen} groupInfo={currentOpenGroup} onClose={handleGroupInfoDrawerClose} />
        </>
    )
}

//群聊详细信息组件
const GroupDetailInfo = ({ open, groupInfo, onClose }) => {
    return (
        <Drawer
            anchor='right'
            open={open}
            onClose={onClose}
            sx={
                {
                    zIndex: 1202,
                    alignItems: 'center',
                    '& > .css-1160xiw-MuiPaper-root-MuiDrawer-paper': {
                        maxWidth: '400px',
                    }
                }
            }
        >
            <Box
                sx={
                    {
                        width: 400,
                    }
                }
            >
                <Box
                    sx={
                        {
                            textAlign: 'center',
                            padding: '20px 0'
                        }
                    }
                >
                    群信息
                </Box>
            </Box>
            <Divider />

            <Stack
                sx={
                    {
                        padding: '10px 10px'
                    }
                }
                spacing={2}
            >

                {/* 群名称 */}
                <Box>
                    <Box>群名称</Box>
                    <span style={
                        {
                            color: 'gray',
                            fontSize: 14
                        }
                    }>{groupInfo && groupInfo.groupName}</span>
                </Box>

                {/* 群简介 */}
                <Box>
                    <Box>群简介</Box>
                    <span style={
                        {
                            color: 'gray',
                            fontSize: 14
                        }
                    }>{groupInfo && groupInfo.groupDesc}</span>
                </Box>

                {/* 群名片 */}
                <GroupCard groupInfo={groupInfo} />

                {/* 群成员 */}
                <GroupMemembers group={groupInfo} />

                {/* 群公告 */}
                <Box>
                    <Box>群公告</Box>
                    <span style={
                        {
                            color: 'gray',
                            fontSize: 14
                        }
                    }>{groupInfo && groupInfo.announcement}</span>
                </Box>
            </Stack>

            {/* 群聊管理 */}
            <Button variant="contained"
                sx={
                    {
                        width: '80%',
                        margin: 'auto 10% 20px 10%',
                    }
                }
            >群聊管理</Button>
        </Drawer>
    )
}

// 群组列表
const GroupsList = ({ onGroupItemClick }) => {
    return (
        <List
            sx={
                {
                    overflow: 'auto',
                    maxHeight: '111%',
                    scrollbarWidth: 'thin',
                    padding: '10px 10px'
                }
            }
        >
            <Stack direction="row" spacing={2}>
                {
                    groups.map((group, idx) => (
                        <GroupPaper key={group.groupName} variant='outlined' square={false}
                            onClick={
                                (event) => onGroupItemClick(idx)
                            }
                            sx={
                                {
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }>
                            <Avatar src={avatar} alt={group.groupName} />
                            <Box sx={
                                {
                                    marginLeft: 1
                                }
                            }>
                                {group.groupName}
                            </Box>
                        </GroupPaper>
                    ))
                }
            </Stack>
        </List>


    )
}

// 群组名片组件
const GroupCard = ({ groupInfo }) => {
    const [businessCardOpenAnchorEl, setBusinessCardOpenAnchorEl] = React.useState(null);
    const editBusinessCardOpen = Boolean(businessCardOpenAnchorEl);
    const handleEditGroupBusinessCardOpen = (event) => {
        setBusinessCardOpenAnchorEl(event.currentTarget);
    }
    const handleEditGroupBusinessCardClose = () => {
        setBusinessCardOpenAnchorEl(null);
    }
    return (
        <Box>
            <Stack
                direction='row'
                sx={
                    {
                        justifyContent: 'space-between',
                        padding: '0 5px 0 0px',
                    }
                }
            >
                <Stack
                    direction='row'
                    sx={
                        {
                            justifyContent: 'space-between',
                            alignItems: 'center',
                            width: '100%'
                        }
                    }
                >
                    <Box>群名片</Box>
                    <Button
                        sx={
                            {
                                fontSize: 14
                            }
                        }
                        onClick={handleEditGroupBusinessCardOpen} variant='text'>
                        设置
                    </Button>
                </Stack>

                <Popover
                    open={editBusinessCardOpen}
                    anchorEl={businessCardOpenAnchorEl}
                    onClose={handleEditGroupBusinessCardClose}
                    disableScrollLock={false}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'left',
                    }}
                    sx={
                        {
                            '& > .css-3bmhjh-MuiPaper-root-MuiPopover-paper': {
                                overflowX: 'initial',
                                overflowY: 'initial',
                                maxHeight: 'initial',
                                height: 100
                            }
                        }
                    }
                    transformOrigin={
                        {
                            vertical: 'center',
                            horizontal: 'right'
                        }
                    }
                >
                    <Box sx={
                        {
                            fontSize: 18,
                            padding: '5px'
                        }
                    }>设置我的群名片</Box>
                    <Divider
                        sx={
                            {
                                marginBottom: '13px'
                            }
                        }
                    />

                    <Stack direction='row' spacing={1}
                        sx={
                            {
                                width: '243px',
                                padding: '0 5px'
                            }
                        }
                    >
                        <TextField
                            autoFocus
                            margin="dense"
                            id="groupBussinessCard"
                            name="groupBussinessCard"
                            label="群名片"
                            type="text"
                            fullWidth
                            variant="outlined"
                            size='small'
                        />
                        <Button variant='contained'>确定</Button>
                    </Stack>

                </Popover>
            </Stack>
            <span style={
                {
                    color: 'gray',
                    fontSize: 14
                }
            }>{groupInfo && groupInfo.groupCard}</span>
        </Box>


    )
}
//群组成员
const GroupMemembers = ({ group }) => {
    const [currentMember, setCurrentMember] = React.useState(null);
    const [memberInfoOpen, setMemberInfoOpen] = React.useState(false);
    const handleMemberInfoOpen = (idx) => {
        setCurrentMember(group.members[idx]);
        setMemberInfoOpen(true);
    }
    const handleMemberInfoClose = () => {
        setMemberInfoOpen(false);
    }
    return (
        <Box>
            <Box
                sx={
                    {
                        display: 'flex',
                        justifyContent: 'space-between',
                        padding: '0 5px 0 0'
                    }
                }
            >
                <Box
                    sx={
                        {
                            marginBottom: '10px'
                        }
                    }
                >群成员</Box>
                <Box
                    sx={
                        {
                            marginRight: '19px',
                            fontSize: 14
                        }
                    }
                >
                    {group && group.members.length}人
                </Box>
            </Box>

            {/* 群成员列表 */}
            <Grid container
                direction='row'
                columns={5}
                spacing={1}
                sx={
                    {
                        padding: '5px 10px',
                        justifyContent: 'space-between'
                    }
                }
            >
                {
                    group && group.members.slice(0, 12).map((member, idx) => (
                        <Grid item
                            onClick={event => handleMemberInfoOpen(idx)}
                            key={member.nickname}
                        >
                            <Stack
                                direction='column'
                                spacing={0}
                                key={member.nickname}
                                sx={
                                    {
                                        alignItems: 'center',
                                        marginBottom: '3px',
                                        cursor: 'pointer'
                                    }
                                }
                            >
                                <Avatar src={avatar} alt={member.nickname} />
                                <Box
                                    sx={
                                        {
                                            fontSize: '12px',
                                            color: 'gray'
                                        }
                                    }
                                >{member.nickname.length > 3 ? member.nickname.slice(0, 3) + ' ...' : member.nickname}</Box>
                            </Stack>
                        </Grid>
                    ))
                }

                {/* 添加成员 */}
                <Grid item
                >
                    <AddMember />
                </Grid>

                {/* 查看更多 */}
                <Grid item>
                    <Stack
                        direction='column'
                        spacing={0}
                        sx={
                            {
                                alignItems: 'center',
                                marginBottom: '3px',
                                cursor: 'pointer'
                            }
                        }
                    >
                        <Box
                            sx={
                                {
                                    width: '40px',
                                    height: '40px',
                                    border: '1px solid #ccc',
                                    borderRadius: '50%',
                                    display: 'inline-flex',
                                    alignItems: 'center',
                                    justifyContent: 'center'
                                }
                            }
                        >
                            <MoreHorizOutlinedIcon
                                sx={
                                    {
                                        fontSize: '1.5rem',
                                    }
                                }
                            />
                        </Box>
                        <Box
                            sx={
                                {
                                    fontSize: '12px',
                                    color: 'gray'
                                }
                            }
                        >查看更多</Box>
                    </Stack>
                </Grid>
            </Grid>

            {/* 成员详细信息模态框 */}
            <FriendInfoDialog open={memberInfoOpen} onClose={handleMemberInfoClose} infoData={currentMember} />
        </Box>


    )
}

//添加成员组件
const AddMember = () => {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const handleAddMember = () => {
        setDialogOpen(true);
    }
    const handleDialogClose = () => {
        setDialogOpen(false);
    }
    return (
        <Stack
            direction='column'
            spacing={0}
            sx={
                {
                    alignItems: 'center',
                    marginBottom: '3px',
                    cursor: 'pointer'
                }
            }
            onClick={handleAddMember}
        >
            <Box
                sx={
                    {
                        width: '40px',
                        height: '40px',
                        border: '1px solid #ccc',
                        borderRadius: '50%',
                        fontSize: '1.5rem',
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'center'
                    }
                }
            >
                +
            </Box>
            <Box
                sx={
                    {
                        fontSize: '12px',
                        color: 'gray'
                    }
                }
            >添加成员</Box>
            <Dialog
                open={dialogOpen}
                onClose={handleDialogClose}
            >
                <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                    Modal title
                </DialogTitle>
                <IconButton
                    onClick={handleDialogClose}
                    sx={(theme) => ({
                        position: 'absolute',
                        right: 8,
                        top: 8,
                        color: theme.palette.grey[500],
                    })}
                >
                    <CloseIcon />
                </IconButton>
                <DialogContent dividers>
                    <Typography gutterBottom>
                        Cras mattis consectetur purus sit amet fermentum. Cras justo odio,
                        dapibus ac facilisis in, egestas eget quam. Morbi leo risus, porta ac
                        consectetur ac, vestibulum at eros.
                    </Typography>
                    <Typography gutterBottom>
                        Praesent commodo cursus magna, vel scelerisque nisl consectetur et.
                        Vivamus sagittis lacus vel augue laoreet rutrum faucibus dolor auctor.
                    </Typography>
                    <Typography gutterBottom>
                        Aenean lacinia bibendum nulla sed consectetur. Praesent commodo cursus
                        magna, vel scelerisque nisl consectetur et. Donec sed odio dui. Donec
                        ullamcorper nulla non metus auctor fringilla.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        Save changes
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}

const GroupPaper = styled(Paper)(({ theme }) => ({
    width: 260,
    height: 100,
    padding: theme.spacing(2),
    ...theme.typography.body2,
    textAlign: 'center',
    cursor: 'pointer',
    '&:hover': {
        border: '1px solid #1976d2'
    }
}));