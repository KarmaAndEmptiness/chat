import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, TextField } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

export default function BindSetting() {
    const [selectedDialog, setSelectedDialog] = React.useState(-1);
    const [formData, setFormData] = React.useState({
        account: '',
        email: '',
        nickname: '',
        gender: '',
        birthday: '',
        signature: ''
    });
    const handleDialogClose = () => {
        setSelectedDialog(-1);
    }
    const handleClick = (e, key) => {
        setSelectedDialog(key);
    }
    const handleInputChange = () => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }
    return (
        <>
            <Box
                sx={
                    {
                        fontSize: '20px',
                        padding: '10px 10px',
                    }
                }
            >安全设置</Box>
            <Divider />

            <Stack
                direction='row'
                sx={
                    {
                        justifyContent: 'space-between',
                        padding: '15px 20px'
                    }
                }
            >
                <Stack
                    direction='column'
                >
                    <Box>绑定github</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '14px',
                                marginTop: '1px'
                            }
                        }
                    >当前未绑定github账号</Box>
                </Stack>
                <Button variant='text' onClick={e => handleClick(e, 0)}>设置</Button>
            </Stack>
            <Divider />
            <Stack
                direction='row'
                sx={
                    {
                        justifyContent: 'space-between',
                        padding: '15px 20px'
                    }
                }
            >
                <Stack
                    direction='column'
                >
                    <Box>绑定gitee</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '14px',
                                marginTop: '1px'
                            }
                        }
                    >当前未绑定gitee账号</Box>
                </Stack>
                <Button variant='text' onClick={e => handleClick(e, 1)}>设置</Button>
            </Stack>
            <Divider />
            <SettingDialog title='绑定github' open={selectedDialog == 0} onClose={handleDialogClose}>
                绑定github
            </SettingDialog>

            <SettingDialog title='绑定gitee' open={selectedDialog == 1} onClose={handleDialogClose}>
                绑定gitee
            </SettingDialog>
        </>
    )
}

const SettingDialog = ({ open, title, children, onClose }) => {
    return (
        <Dialog
            open={open}
            onClose={onClose}
        >
            <DialogTitle sx={{ m: 0, p: 2 }} id="customized-dialog-title">
                {title}
            </DialogTitle>
            <IconButton
                onClick={onClose}
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
                {children}
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={onClose}>
                    取消
                </Button>
                <Button onClick={onClose} variant='contained'>
                    保存修改
                </Button>
            </DialogActions>
        </Dialog>

    )
}

