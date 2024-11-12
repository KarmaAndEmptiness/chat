import React from 'react'
import { Alert, Box, Button, Divider, IconButton, InputBase, MenuItem, OutlinedInput, Snackbar, Stack } from '@mui/material'
import { AddRounded as AddRoundedIcon, Close as CloseIcon, ManageSearchOutlined as ManageSearchOutlinedIcon } from '@mui/icons-material'
import { HomeContext } from '../Home'
import RichText from './RichText'

const menus = [
    {
        name: "近期编辑",
        sub: false
    }, {
        name: "我的收藏",
        sub: false
    }, {
        name: "我的分类",
        sub: true
    }
]

export default function Note() {

    return (
        <>
            <Stack
                direction='row'
                sx={
                    {
                        height: 'calc(100vh - 64px)'
                    }
                }
            >
                <LeftNav />
                <Divider orientation="vertical" />

                <RightBox />
            </Stack >

        </>
    )
}

const LeftNav = () => {
    const [groups, setGroups] = React.useState(['默认分类']);
    const [snackbarOpen, setSnackbarOpen] = React.useState(false);
    const [addGroupInputOpen, setAddGroupInputOpen] = React.useState(false);
    const [groupName, setGroupName] = React.useState("");

    const handleAddGroup = () => {
        setGroupName("");
        setAddGroupInputOpen(true);
    }

    const handleSnackbarClose = () => {
        setSnackbarOpen(false);
    }

    const handleAddGroupInputClose = (e) => {
        if (groupName.trim() === "") {
            setAddGroupInputOpen(false);
            return;
        }
        if (groups.includes(groupName)) {
            setGroupName("");
            setAddGroupInputOpen(false);
            setSnackbarOpen(true);
            return;
        }
        setGroups([...groups, groupName]);
        setAddGroupInputOpen(false);

    }
    const handleGroupNameChange = (event) => {
        setGroupName(event.target.value);
    }

    return (
        <>
            <Stack
                direction='column'
                sx={
                    {
                        width: '230px',
                    }
                }
            >
                <Stack
                    direction='row'
                    spacing={1}
                    sx={
                        {
                            justifyContent: 'space-between',
                            padding: '10px 5px',
                        }
                    }
                >
                    <Button
                        sx={
                            {
                                flex: 'auto'
                            }
                        }
                        variant='contained'>
                        新建笔记
                    </Button>
                    <IconButton
                        sx={
                            {
                                border: '1px solid gray',
                            }
                        }
                        onClick={handleAddGroup}
                    >
                        <AddRoundedIcon />
                    </IconButton>
                </Stack>
                <Stack
                    direction='row'
                    sx={{
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '5px',
                    }}
                >
                    <Box
                        sx={
                            {
                                fontSize: '18px'
                            }
                        }
                    >我的笔记</Box>
                    <Button
                        variant="outlined" color="error"
                        sx={
                            {
                                fontSize: '12px'
                            }
                        }
                    >回收站</Button>
                </Stack>

                {
                    menus.map((menu, idx) => (
                        <React.Fragment key={idx}>
                            <MenuItem>
                                <Box>{menu.name}</Box>
                            </MenuItem>
                            <Stack
                                direction='column'
                                sx={
                                    {
                                        padding: '6px 16px'
                                    }
                                }
                            >
                                {
                                    menu.sub && addGroupInputOpen && (
                                        <OutlinedInput autoFocus
                                            value={groupName}
                                            onChange={handleGroupNameChange}
                                            sx={
                                                {
                                                    '& > input': {
                                                        padding: '5px'
                                                    }
                                                }
                                            }
                                            onKeyDown={e => { e.code === "Enter" ? handleAddGroupInputClose(e) : '' }}
                                            onBlur={handleAddGroupInputClose}
                                        />
                                    )
                                }
                                {
                                    menu.sub &&
                                    groups.map((group, idx) => (
                                        <MenuItem key={group}>{group}</MenuItem>
                                    ))
                                }
                            </Stack>
                        </React.Fragment>
                    ))
                }
            </Stack>
            <Snackbar
                action={
                    <React.Fragment>
                        <Button color="secondary" size="small" onClick={handleSnackbarClose}>
                            UNDO
                        </Button>
                        <IconButton
                            color="inherit"
                            sx={{ p: 0.5 }}
                            onClick={handleSnackbarClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </React.Fragment>
                }

                open={snackbarOpen} autoHideDuration={3000} onClose={handleSnackbarClose}>
                <Alert
                    onClose={handleSnackbarClose}
                    severity="success"
                    variant="filled"
                    sx={{ width: '100%' }}
                >
                    分类已存在
                </Alert>
            </Snackbar>
        </>
    )
}

const RightBox = () => {
    const { homeLeftNavOpen } = React.useContext(HomeContext);
    return (
        <>
            <Stack
                direction='row'
                sx={
                    {
                        width: 'calc(100vw - 311px)',
                        maxWidth: 'calc(100vw - 311px)'
                    }
                }
            >
                <Stack
                    direction='column'
                    sx={
                        {
                            width: '373px'
                        }
                    }
                >
                    <Stack
                        direction='row'
                        spacing={1}
                        sx={
                            {
                                padding: '10px 5px',
                                alignItems: 'center'
                            }
                        }
                    >
                        <ManageSearchOutlinedIcon
                            sx={
                                {
                                    paddingBottom: '3px',
                                    fontSize: '28px'
                                }
                            }
                        />
                        <InputBase placeholder='搜索我的笔记'
                            sx={
                                {
                                    '& > input': {
                                        padding: '0px',
                                        fontSize: '14px',
                                        width: '267px'
                                    }
                                }
                            }
                        />
                    </Stack>
                    <Divider />

                </Stack>
                <Divider orientation='vertical'
                    sx={
                        {
                            '&:hover': {
                                cursor: 'col-resize',
                                backgroundColor: 'skyblue'
                            }
                        }
                    }
                />
                <Box
                    sx={
                        {
                            height: '100%',
                            flex: 'auto'
                        }
                    }
                >
                    <RichText />
                </Box>

            </Stack>
        </>
    )
}

