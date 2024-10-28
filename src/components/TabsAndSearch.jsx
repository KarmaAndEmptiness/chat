import React from 'react'
import { Box, Stack, Tab, Tabs } from '@mui/material';
import Search from './Search'
function TabsAndSearch({ tabs, onAddIconClick }) {
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
                <Search onAddIconClick={onAddIconClick} />
            </Box>
        </Stack>
    )
}
export default TabsAndSearch
