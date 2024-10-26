import React from 'react'
// import PropTypes from 'prop-types'
import { Close as CloseIcon } from '@mui/icons-material'
import { Avatar, Box, Button, Dialog, DialogActions, DialogContent, IconButton } from '@mui/material';

import avatar from '~/assets/img/bg.jpg'

// 好友详细信息模态框
function FriendInfoDialog({ open, onClose, infoData }) {
    return (
        <>
            <Dialog
                open={open}
                onClose={onClose}
            >
                <IconButton
                    onClick={onClose}
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
                        }>{infoData && infoData.nickname}</Box>
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
                    <Button variant='contained' onClick={onClose} sx={
                        {
                            width: '60%'
                        }
                    }>
                        发送消息
                    </Button>
                </DialogActions>
            </Dialog >
        </>
    )
}

// FriendInfoDialog.propTypes = {
//     open: PropTypes.bool,
//     onClose: PropTypes.func
// }

export default FriendInfoDialog



