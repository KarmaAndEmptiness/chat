import React from 'react'
import { Box, Divider, IconButton, InputBase, Paper, Stack, Tab, Tabs } from '@mui/material';
import { Search as SearchIcon, GroupAddOutlined as GroupAddOutlinedIcon } from '@mui/icons-material'

function TabsAndSearch({ tabs }) {
    const [activeTab, setActiveTap] = React.useState(0);
    const handleChangeTab = (event, selectedTap) => {
        setActiveTap(selectedTap)
    }
    return (
        <Stack
            direction='row'
            sx={{ width: '100%', alignItems: 'center', justifyContent: 'space-between', borderBottom: 1, borderColor: 'divider', padding: '0 3rem 0 1rem' }}>
            <Box>
                <Tabs value={activeTab} onChange={handleChangeTab}>
                    {
                        tabs && tabs.map((tab, idx) => (
                            <Tab key={tab.name} label={tab.name} />
                        ))
                    }
                </Tabs>
            </Box>
            <Box

            >
                <Search />
            </Box>
        </Stack>
    )
}
export default TabsAndSearch


// 搜索模块
const Search = () => {
    return (
        <Paper
            sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid rgba(0, 0, 0, 0.12)' }}
            elevation={0}
        >
            <InputBase
                sx={{
                    ml: 1, flex: 1, display: 'inline-flex', alignItems: 'center',
                    '& > input': {
                        padding: '0px',
                        fontSize: '13px'
                    }
                }}
                placeholder="搜索好友/群聊"
            />
            <IconButton type="button" sx={{ p: '5px' }}>
                <SearchIcon />
            </IconButton>
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton color="primary" sx={{ p: '5px' }} >
                <GroupAddOutlinedIcon />
            </IconButton>
        </Paper>
    )
}