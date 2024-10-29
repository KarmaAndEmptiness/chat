import React, { useContext } from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, FormControl, FormControlLabel, IconButton, Radio, RadioGroup, Stack, TextField } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'
import { ThemeContext } from '@/App';
export default function PersonalSetting() {
    const [selectedDialog, setSelectedDialog] = React.useState(-1);
    // const [mode, toggleTheme] = useContext(ThemeContext) || {};
    // const [mode, toggleTheme] = React.useState('light');
    const  {mode, toggleTheme} = useContext(ThemeContext);//context要使用这种解构方式

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
    const handleThemeChange = (e) => {
        toggleTheme(e.target.value);
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
            >个性设置</Box>
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
                    <Box>主题颜色</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '13px',
                                marginTop: '1px'
                            }
                        }
                    >当前主题颜色：{mode}</Box>
                </Stack>
                <FormControl
                >
                    <RadioGroup
                        row
                        name="row-radio-buttons-group"
                        value={mode}
                        onChange={handleThemeChange}
                    >
                        <FormControlLabel value="light" control={<Radio />} label="浅色" />
                        <FormControlLabel value="dark" control={<Radio />} label="深色" />
                        <FormControlLabel value="system" control={<Radio />} label="跟随系统" />
                    </RadioGroup>
                </FormControl>
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
                    <Box>我的名片</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '13px',
                                marginTop: '1px'
                            }
                        }
                    >当前未设置名片背景</Box>
                </Stack>
                <Button variant='text' onClick={e => handleClick(e, 1)}>修改</Button>

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
                    <Box>聊天背景图</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '13px',
                                marginTop: '1px'
                            }
                        }
                    >当前未设置聊天背景图</Box>
                </Stack>
                <Button variant='text' onClick={e => handleClick(e, 2)}>修改</Button>
            </Stack>
            <Divider />

            <SettingDialog title='修改密码' open={selectedDialog == 0} onClose={handleDialogClose}>
                <Stack
                    direction='column'
                    spacing={1}>
                    <TextField
                        label="登录密码"
                        name="account"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="设置新密码"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="确认新密码"
                        name="nickname"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />

                </Stack>
            </SettingDialog>

            <SettingDialog title='换绑手机' open={selectedDialog == 1} onClose={handleDialogClose}>
                <Stack
                    direction='column'
                    spacing={1}
                >
                    <TextField
                        label="登录密码"
                        name="account"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="设置新手机号"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <TextField
                            label="短信验证码"
                            name="nickname"
                            variant="outlined"
                            value={formData.account}
                            onChange={handleInputChange}
                            sx={
                                {
                                    width: '80%'
                                }
                            }
                        />
                        <Button
                            sx={
                                {
                                    width: '20%',
                                    fontSize: '10px',
                                    padding: '5px'
                                }
                            }
                            variant='outlined'
                        >获取验证码</Button>
                    </Stack>
                </Stack>
            </SettingDialog>

            <SettingDialog title='绑定邮箱' open={selectedDialog == 2} onClose={handleDialogClose}>
                <Stack
                    direction='column'
                    spacing={1}
                >
                    <TextField
                        label="登录密码"
                        name="account"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <TextField
                        label="新邮箱"
                        name="email"
                        variant="outlined"
                        fullWidth
                        value={formData.account}
                        onChange={handleInputChange}
                    />
                    <Stack
                        direction='row'
                        spacing={1}
                    >
                        <TextField
                            label="短信验证码"
                            name="nickname"
                            variant="outlined"
                            value={formData.account}
                            onChange={handleInputChange}
                            sx={
                                {
                                    width: '80%'
                                }
                            }
                        />
                        <Button
                            sx={
                                {
                                    width: '20%',
                                    fontSize: '10px',
                                    padding: '5px'
                                }
                            }
                            variant='outlined'
                        >获取验证码</Button>
                    </Stack>
                </Stack>
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