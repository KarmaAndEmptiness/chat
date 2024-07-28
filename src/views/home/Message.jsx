import React, { useState } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import SearchIcon from '@mui/icons-material/Search';

// 搜索模块
const Search = () => {
    return (
        <Paper
            component="form"
            sx={{ p: '2px 4px', display: 'flex', alignItems: 'center', width: '100%', marginTop: '10px' }}
        >
            <InputBase
                sx={{ ml: 1, flex: 1 }}
                placeholder="搜索好友/群聊"
            />
            <IconButton type="button" sx={{ p: '10px' }}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '10px' }} >
                <GroupAddOutlinedIcon />
            </IconButton>
        </Paper>
    )
}

// 会话记录
const SessionList = () => {

}

const Message = () => {
    const [leftBoxWidth, setLeftBoxWidth] = useState(350)
    const [startX, setStartX] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    const handleMouseMove = (e) => {
        if (mouseDown) {
            if (e.target.style.userSelect !== 'none') {
                e.target.style.userSelect = 'none'
            }
            const offsetX = e.clientX - startX
            if (leftBoxWidth < 200) {
                setLeftBoxWidth(200)
                return
            }
            if (leftBoxWidth > 500) {
                setLeftBoxWidth(500)
                return
            }
            setLeftBoxWidth(prev => (prev + offsetX))

            // 以上一次的位置为起点算位移
            setStartX(e.clientX)
        }
        else {
            if (e.target.style.userSelect === 'none') {
                e.target.style.userSelect = ''
            }
        }
    }
    const handleMouseDown = (e) => {
        setMouseDown(true)
        setStartX(e.clientX)
        e.preventDefault()
    }
    const handleMouseUp = () => {
        setMouseDown(false)
    }

    return (
        <>
            <Box sx={
                {
                    height: '100%',
                    display: 'flex',

                }
            }
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}

            >

                {/* 左侧区域 */}
                <Box sx={
                    {
                        width: `${leftBoxWidth}px`,
                        minWidth: '200px',
                        maxWidth: '500px',
                        padding: '0 5px'
                    }
                }>
                    <Search />
                </Box>

                {/* 调整宽度线 */}
                <Box sx={
                    {
                        width: '2px',
                    }
                }
                    onMouseDown={handleMouseDown}
                >
                    <Box
                        sx={
                            {
                                width: '1px',
                                height: '100%',
                                backgroundColor: 'rgba(0, 0, 0, 0.12)',
                                '&:hover': {
                                    width: '2px',
                                    backgroundColor: '#1890ff',
                                    cursor: 'col-resize'
                                }
                            }
                        }
                    ></Box>
                </Box>

                {/* 右侧区域 */}
                <Box sx={
                    {
                        flex: 'auto',
                    }
                }>
                    right
                </Box>
            </Box>
        </>
    )
}
export default Message;