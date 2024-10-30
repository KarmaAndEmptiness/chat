import React from 'react'
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Divider, IconButton, Stack, Switch, TextField } from '@mui/material'
import { Close as CloseIcon } from '@mui/icons-material'

export default function NoteSetting() {
    const [selectedSwitchLi, setSelectedSwitchLi] = React.useState([false, false, false]);
    const handleChange = (e, key) => {
        let li = selectedSwitchLi.map((item, idx) => {
            if (idx == key)
                return !item;
            else
                return item;
        })
        setSelectedSwitchLi(li);
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
                    <Box>新消息提示音</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '14px',
                                marginTop: '1px'
                            }
                        }
                    >新消息提示音：{selectedSwitchLi[0] ? '已开启' : '已关闭'}</Box>
                </Stack>
                <Switch
                    checked={selectedSwitchLi[0]}
                    onChange={e => handleChange(e, 0)}
                />
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
                    <Box>推送键盘键入消息</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '14px',
                                marginTop: '1px'
                            }
                        }
                    >推送键盘键入消息 ：{selectedSwitchLi[1] ? '已开启' : '已关闭'}</Box>
                </Stack>
                <Switch
                    checked={selectedSwitchLi[1]}
                    onChange={e => handleChange(e, 1)}
                />

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
                    <Box>消息通知</Box>
                    <Box
                        sx={
                            {
                                color: 'gray',
                                fontSize: '14px',
                                marginTop: '1px'
                            }
                        }
                    >消息通知 ：{selectedSwitchLi[2] ? '已开启' : '已关闭'}</Box>
                </Stack>
                <Switch
                    checked={selectedSwitchLi[2]}
                    onChange={e => handleChange(e, 2)}
                />
            </Stack>
            <Divider />
        </>
    )
}


