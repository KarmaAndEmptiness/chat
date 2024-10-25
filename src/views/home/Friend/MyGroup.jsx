import React from 'react'
import { Avatar, Box, Button, Divider, Drawer, List, Paper, Popover, Stack, Tab, Tabs, TextField, Typography } from '@mui/material'
import { styled } from '@mui/material/styles';

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
    const [groupInfoDrawerOpen, setGroupInfoDrawerOpen] = React.useState(true);
    const [businessCardOpenAnchorEl, setBusinessCardOpenAnchorEl] = React.useState(null);

    const editBusinessCardOpen = Boolean(businessCardOpenAnchorEl);
    const handleChangeGroup = (event, selectedGroup) => {
        setActiveGroup(selectedGroup)
    }
    const handleGroupInfoDrawerClose = () => {
        setGroupInfoDrawerOpen(false);
    }

    const handleGroupPaperClick = (index) => {
        setGroupInfoDrawerOpen(true);
    }

    const handleEditGroupBusinessCardOpen = (event) => {
        setBusinessCardOpenAnchorEl(event.currentTarget);
    }
    const handleEditGroupBusinessCardClose = () => {
        setBusinessCardOpenAnchorEl(null);
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
                                    (event) => handleGroupPaperClick(idx)
                                }
                                sx={
                                    {
                                        display: 'flex',
                                        alignItems: 'center'
                                    }
                                }>
                                <Avatar src={avatar} alt={group.groupName} sx={
                                    {
                                        background: 'pink'
                                    }
                                } />
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

            {/* 群信息drawer */}
            <Drawer
                anchor='right'
                open={groupInfoDrawerOpen}
                onClose={handleGroupInfoDrawerClose}
                sx={
                    {
                        zIndex: 1202,
                        alignItems: 'center'
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
                    spacing={1}
                >
                    <Box>
                        <Box>群名称</Box>
                        <span style={
                            {
                                color: 'gray',
                                fontSize: 14
                            }
                        }>234</span>
                    </Box>
                    <Box>
                        <Box>群简介</Box>
                        <span style={
                            {
                                color: 'gray',
                                fontSize: 14
                            }
                        }>暂无群简介</span>
                    </Box>
                    <Box>
                        <Box
                            sx={
                                {
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '0 5px 0 0px'
                                }
                            }
                        >
                            <Box>群名片</Box>
                            <Button onClick={handleEditGroupBusinessCardOpen} variant='outlined'>
                                设置
                            </Button>

                            <Popover
                                open={editBusinessCardOpen}
                                anchorEl={businessCardOpenAnchorEl}
                                onClose={handleEditGroupBusinessCardClose}
                                anchorOrigin={{
                                    vertical: 'center',
                                    horizontal: 'left',
                                }}
                                transformOrigin={
                                    {
                                        vertical: 'center',
                                        horizontal: 'right'
                                    }
                                }
                            >
                                <Box sx={{ fontSize: 15 }}>设置我的群名片</Box>
                                <Divider />
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    id="groupBussinessCard"
                                    name="groupBussinessCard"
                                    label="群名片"
                                    type="text"
                                    fullWidth
                                    variant="standard"
                                />
                                <Button variant='contained'>确定</Button>
                            </Popover>
                        </Box>
                        <span style={
                            {
                                color: 'gray',
                                fontSize: 14
                            }
                        }>234</span>
                    </Box>
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
                            <Box>群成员</Box>
                            <Box>
                                3人
                            </Box>
                        </Box>
                        <span style={
                            {
                                color: 'gray',
                                fontSize: 14
                            }
                        }>234</span>
                    </Box>
                    <Box>
                        <Box>群公告</Box>
                        <span style={
                            {
                                color: 'gray',
                                fontSize: 14
                            }
                        }>wewe</span>
                    </Box>
                </Stack>

                <Button variant="contained"
                    sx={
                        {
                            width: '80%',
                            margin: 'auto 10% 20px 10%',
                        }
                    }
                >群聊管理</Button>
            </Drawer>
        </>
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