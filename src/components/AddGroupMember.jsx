import React from 'react'
import { Box, Button, Checkbox, Dialog, DialogActions, DialogContent, DialogTitle, FormControlLabel, FormGroup, IconButton, Stack } from '@mui/material';
import { Close as CloseIcon } from '@mui/icons-material'

import { friends } from '~/data/friends.js'

const friendIdLi = friends.map((friend) => friend.id);
function AddGroupMember() {
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [checkedMemberList, setCheckedMemberList] = React.useState([]);
    const handleAddMember = (event) => {
        event.stopPropagation();
        setDialogOpen(true);
    }
    const handleDialogClose = (event) => {
        // 这里要阻止事件冒泡，不然会导致组件关闭后直接重新打开
        event.stopPropagation();
        setDialogOpen(false);
    }

    // 切换选中状态
    const handleToggle = (id) => {
        setCheckedMemberList(prevList =>
            prevList.includes(id)
                ? prevList.filter(memberId => memberId !== id)
                : [...prevList, id]
        );
    }

    const handleCheckedAll = () => {
        setCheckedMemberList(friendIdLi);
    }
    const handleClearAll = () => {
        setCheckedMemberList([]);
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
                sx={
                    {
                        'div.css-1t1j96h-MuiPaper-root-MuiDialog-paper': {
                            maxWidth: 'initial',
                            width: '650px',
                            height: '460px',
                            overflow: 'initial'
                        }
                    }
                }
            >
                <DialogTitle sx={{ m: 0, p: 2 }}>
                    邀请好友
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
                <DialogContent dividers
                    sx={
                        {
                            width: '100%',
                            padding: '0px 24px'
                        }
                    }
                >
                    <Stack
                        direction='row'
                        sx={
                            {
                                '& > div': {
                                    padding: '16px 0px',
                                    maxHeight: '341px',
                                    overflow: 'auto',
                                    scrollbarWidth: 'thin'
                                }
                            }
                        }
                    >
                        {/* left box */}
                        <Box
                            sx={
                                {
                                    width: '50%',
                                    fontSize: '.9rem',
                                    borderRight: '1px solid rgba(0, 0, 0, 0.12)'
                                }
                            }
                        >
                            <Box>
                                <Button variant='text' onClick={handleCheckedAll}>全选</Button>
                            </Box>
                            <Box>
                                <FormGroup>
                                    {
                                        friends.map((friend, idx) => (
                                            <FormControlLabel key={friend.id}
                                                control={
                                                    <Checkbox
                                                        checked={checkedMemberList.includes(friend.id)}
                                                        onChange={() => handleToggle(friend.id)}
                                                        sx={
                                                            {
                                                                fontSize: '.9rem'
                                                            }
                                                        }
                                                    />}
                                                label={friend.nickname} />
                                        ))
                                    }
                                </FormGroup>
                            </Box>
                        </Box>

                        {/* right box */}
                        <Box
                            sx={
                                {
                                    width: '50%',
                                    fontSize: '.9rem',
                                    paddingLeft: '24px !important'
                                }
                            }
                        >
                            <Box>
                                <Button variant='text' onClick={handleClearAll}>清除</Button>
                            </Box>
                            <Box>
                                {
                                    friends.filter((friend) => checkedMemberList.includes(friend.id)).map((friend, idx) => (
                                        <Box
                                            sx={
                                                {
                                                    fontSize: '.9rem'
                                                }
                                            }
                                        >
                                            {friend.nickname}
                                        </Box>
                                    ))
                                }
                            </Box>
                        </Box>
                    </Stack>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDialogClose}>
                        取消
                    </Button>
                    <Button onClick={handleDialogClose}>
                        提交
                    </Button>
                </DialogActions>
            </Dialog>
        </Stack>
    )
}
export default AddGroupMember
