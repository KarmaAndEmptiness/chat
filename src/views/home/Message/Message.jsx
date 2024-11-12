import React, { useState } from 'react'
import { Box } from '@mui/material';

import Search from '@/components/Search'
import AddGroupMemberDialog from '@/components/AddGroupMemberDialog'
import SessionList from './SessionList';
import MessagePane from './MessagePane';


const Message = () => {
    const [leftBoxWidth, setLeftBoxWidth] = useState(350)
    const [startX, setStartX] = useState(0)
    const [mouseDown, setMouseDown] = useState(false)
    const [addGroupMemberDialogOpen, setAddGroupMemberDialogOpen] = useState(false);

    const handleSearchAddClick = () => {
        setAddGroupMemberDialogOpen(true);
    }

    const handleMemberDialogClose = (event) => {
        setAddGroupMemberDialogOpen(false);
    }
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
    const handleMouseLeave = () => {
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
                onMouseLeave={handleMouseLeave}
            >

                {/* 左侧区域 */}
                <Box sx={
                    {
                        width: `${leftBoxWidth}px`,
                        minWidth: '200px',
                        maxWidth: '500px',
                        padding: '20px 5px 0px 5px',
                    }
                }>
                    {/* 搜索 */}
                    <Search onAddIconClick={handleSearchAddClick} />
                    <AddGroupMemberDialog open={addGroupMemberDialogOpen} onClose={handleMemberDialogClose} />

                    {/* 会话记录 */}
                    <SessionList />
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
                    <MessagePane />
                </Box>
            </Box>
        </>
    )
}
export default Message;

