import React from 'react'
import { Search as SearchIcon, GroupAddOutlined as GroupAddOutlinedIcon } from '@mui/icons-material'
import { Divider, IconButton, InputBase, Paper } from '@mui/material'

function Search({ onAddIconClick }) {
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
            <IconButton color="primary" sx={{ p: '5px' }} onClick={onAddIconClick} >
                <GroupAddOutlinedIcon />
            </IconButton>
        </Paper>
    )
}

export default Search
// const Search = () => {
//     return (
//         <Paper
//             sx={{ display: 'flex', alignItems: 'center', width: '100%', border: '1px solid rgba(0, 0, 0, 0.12)' }}
//             elevation={0}
//         >
//             <InputBase
//                 sx={{
//                     ml: 1, flex: 1, display: 'inline-flex', alignItems: 'center',
//                     '& > input': {
//                         padding: '0px',
//                         fontSize: '13px'
//                     }
//                 }}
//                 placeholder="搜索好友/群聊"
//             />
//             <IconButton type="button" sx={{ p: '5px' }}>
//                 <SearchIcon />
//             </IconButton>
//             <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
//             <IconButton color="primary" sx={{ p: '5px' }} >
//                 <GroupAddOutlinedIcon />
//             </IconButton>
//         </Paper>
//     )
// }