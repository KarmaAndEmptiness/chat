import React from 'react'
import { Avatar, Box, Button, Divider, IconButton, MenuItem, Stack, TextField } from '@mui/material'
import avatar from '~/assets/img/bg.jpg'

export default function UserCenter() {
    const [mAvatar, setMAvatar] = React.useState(avatar); // 头像 URL
    const fileInputRef = React.useRef(null);
    const [formData, setFormData] = React.useState({
        account: '',
        email: '',
        nickname: '',
        gender: '',
        birthday: '',
        signature: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleSubmit = () => {
        // 在这里处理表单提交逻辑，例如保存数据到服务器
        console.log('提交的表单数据:', formData);
    };
    const handleSetAvatar = () => {
        // 点击时触发隐藏的 input 选择文件
        fileInputRef.current.click();
    };

    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const url = URL.createObjectURL(file); // 将文件转换为 URL
            setMAvatar(url); // 设置头像 URL
        }
    };

    return (
        <>
            <Box
                sx={
                    {
                        fontSize: '20px',
                        padding: '10px 10px'
                    }
                }
            >个人信息</Box>
            <Divider />
            <Stack
                direction='row'
                spacing={2}
                sx={
                    {
                        padding: '20px'
                    }
                }
            >
                <Stack
                    direction='column'
                    spacing={1}
                    sx={
                        {
                            alignItems: 'center'
                        }
                    }
                >
                    <IconButton
                        onClick={handleSetAvatar}
                    >
                        <Avatar
                            sx={
                                {
                                    width: '150px',
                                    height: '150px'
                                }
                            }
                            src={mAvatar}
                            alt='nickname'
                        />

                    </IconButton>
                    <Box
                        sx={
                            {
                                fontSize: '20px'
                            }
                        }
                    >点击更换头像</Box>
                </Stack>

                {/* form表单 */}
                <Box sx={{ width: 'fit-content' }}>
                    <Stack spacing={2} sx={
                        {
                            width: '408px'
                        }
                    }>
                        <TextField
                            label="登录账号"
                            name="account"
                            variant="outlined"
                            fullWidth
                            value={formData.account}
                            onChange={handleChange}
                        />
                        <TextField
                            label="电子邮箱"
                            name="email"
                            variant="outlined"
                            fullWidth
                            value={formData.email}
                            onChange={handleChange}
                        />
                        <TextField
                            label="我的昵称"
                            name="nickname"
                            variant="outlined"
                            fullWidth
                            value={formData.nickname}
                            onChange={handleChange}
                        />
                        <TextField
                            select
                            label="我的性别"
                            name="gender"
                            variant="outlined"
                            fullWidth
                            value={formData.gender}
                            onChange={handleChange}
                        >
                            <MenuItem value="male">男</MenuItem>
                            <MenuItem value="female">女</MenuItem>
                            <MenuItem value="other">其他</MenuItem>
                        </TextField>
                        <TextField
                            label="我的生日"
                            name="birthday"
                            type="date"
                            variant="outlined"
                            fullWidth
                            value={formData.birthday}
                            onChange={handleChange}
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <TextField
                            label="个性签名"
                            name="signature"
                            variant="outlined"
                            multiline
                            rows={4}
                            fullWidth
                            value={formData.signature}
                            onChange={handleChange}
                        />
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleSubmit}
                        >
                            保存修改
                        </Button>
                    </Stack>
                </Box>
            </Stack>
            {/* 隐藏的文件选择器 */}
            <input
                type="file"
                ref={fileInputRef}
                style={{ display: 'none' }}
                accept="image/*"
                onChange={handleFileChange}
            />
        </>
    )
}

