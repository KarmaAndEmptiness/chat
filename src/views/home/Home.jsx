import React, { useState, Suspense } from 'react'

import { styled, useTheme } from '@mui/material/styles';

import { CircularProgress, Box, Avatar, Drawer as MuiDrawer, AppBar as MuiAppBar, Toolbar, List, Typography, Divider, IconButton, Badge, ListItem, ListItemAvatar, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';

import { ExitToAppOutlined as ExitToAppOutlinedIcon, ChevronLeft as ChevronLeftIcon, MessageOutlined as MessageOutlinedIcon, MessageRounded as MessageRoundedIcon, AccountBoxOutlined as AccountBoxOutlinedIcon, AccountBoxRounded as AccountBoxRoundedIcon, NoteAltOutlined as NoteAltOutlinedIcon, NoteAltRounded as NoteAltRoundedIcon, SettingsOutlined as SettingsOutlinedIcon, Settings as SettingsIcon } from '@mui/icons-material';

const Message = React.lazy(() => import('./Message'))

import avatar from '~/assets/img/bg.jpg'


const drawerWidth = 240;
const navs = [
    {
        name: '消息',
        icon: MessageOutlinedIcon,
        activeIcon: MessageRoundedIcon,
        path: '/message'
    },
    {
        name: '通讯录',
        icon: AccountBoxOutlinedIcon,
        activeIcon: AccountBoxRoundedIcon,
        path: '/friend'
    },
    {
        name: '笔记',
        icon: NoteAltOutlinedIcon,
        activeIcon: NoteAltRoundedIcon,
        path: '/note'
    },
    {
        name: '设置',
        icon: SettingsOutlinedIcon,
        activeIcon: SettingsIcon,
        path: '/settings'
    }
]
const openedMixin = (theme) => ({
    width: drawerWidth,
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
    }),
    overflowX: 'hidden',
});

const closedMixin = (theme) => ({
    transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: `calc(${theme.spacing(7)} + 1px)`,
    [theme.breakpoints.up('sm')]: {
        width: `calc(${theme.spacing(8)} + 1px)`,
    },
});

const DrawerHeader = styled('div')(({ theme }) => ({
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open',
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        width: drawerWidth,
        flexShrink: 0,
        whiteSpace: 'nowrap',
        boxSizing: 'border-box',
        ...(open && {
            ...openedMixin(theme),
            '& .MuiDrawer-paper': openedMixin(theme),
        }),
        ...(!open && {
            ...closedMixin(theme),
            '& .MuiDrawer-paper': closedMixin(theme),
        }),
    }),
);
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        backgroundColor: '#44b700',
        color: '#44b700',
        boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
        '&::after': {
            position: 'absolute',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            borderRadius: '50%',
            animation: 'ripple 1.2s infinite ease-in-out',
            border: '1px solid currentColor',
            content: '""',
        },
    },
    '@keyframes ripple': {
        '0%': {
            transform: 'scale(.8)',
            opacity: 1,
        },
        '100%': {
            transform: 'scale(2.4)',
            opacity: 0,
        },
    },
}));
const Home = () => {
    const theme = useTheme();
    const [open, setOpen] = useState(false);
    const [selectedNavIndex, setSelectedNavIndex] = useState(0)

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    const handleListItemClick = (event, index) => {
        setSelectedNavIndex(index);
    };

    return (
        <>
            <Box sx={{ display: 'flex' }}>

                {/* 顶部导航栏 */}
                <AppBar position="fixed" open={open}>
                    <Toolbar>

                        {/* 头像按钮：打开左侧导航栏 */}
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={handleDrawerOpen}
                            edge="start"
                            sx={{
                                marginRight: 5,
                                ...(open && { display: 'none' }),
                            }}
                        >
                            <StyledBadge
                                overlap="circular"
                                anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                variant="dot"
                            >
                                <Avatar
                                    alt="Remy Sharp"
                                    src={avatar}
                                    sx={{ width: 38, height: 38 }}
                                />
                            </StyledBadge>

                        </IconButton>

                        <Typography variant="h6" noWrap component="div">
                            Hola World
                        </Typography>
                    </Toolbar>
                </AppBar>


                <Drawer variant="permanent" open={open}>

                    {/* 导航栏头部 */}
                    <DrawerHeader sx={
                        {
                            justifyContent: 'space-between',
                            paddingLeft: '14px'
                        }
                    }>
                        {open && (
                            <List>
                                <ListItemButton>
                                    <ListItemAvatar>
                                        {/* 头像 */}
                                        <StyledBadge
                                            overlap="circular"
                                            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                                            variant="dot"
                                        >
                                            <Avatar
                                                alt="Remy Sharp"
                                                src={avatar}
                                            />
                                        </StyledBadge>
                                    </ListItemAvatar>
                                    <ListItemText
                                        // 昵称
                                        primary={"Remy Sharp"}

                                        // 个性签名
                                        secondary={"hola world."} />
                                </ListItemButton>
                            </List>
                        )}


                        {/* 收起导航栏按钮 */}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? null : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>

                    {/* 左侧导航栏菜单列表 */}
                    <List
                        sx={
                            {
                                flex: 'auto',
                                display: 'flex',
                                flexDirection: 'column'
                            }
                        }
                    >
                        {navs.map((nav, index) => (
                            <ListItem key={nav.name} disablePadding>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                    selected={selectedNavIndex === index}
                                    onClick={(event) => handleListItemClick(event, index)}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        {selectedNavIndex === index ? <nav.activeIcon /> : <nav.icon />}
                                    </ListItemIcon>
                                    <ListItemText primary={nav.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
                        <ListItem key="nav-quit" disablePadding sx={
                            {
                                marginTop: 'auto',
                            }
                        }>
                            <ListItemButton
                                sx={
                                    {
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }
                                }
                            >
                                <ListItemIcon
                                    sx={{
                                        minWidth: 0,
                                        mr: open ? 3 : 'auto',
                                        justifyContent: 'center',

                                    }}
                                >
                                    <ExitToAppOutlinedIcon />
                                </ListItemIcon>

                                <ListItemText primary="退出登录" sx={{ opacity: open ? 1 : 0 }} />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Drawer>

                {/* 右侧主区域 */}
                <Box component="main" sx={{
                    flexGrow: 1, height: 'calc(100vh - 56px)',
                    [theme.breakpoints.up('sm')]: {
                        height: 'calc(100vh - 64px)'
                    }
                }}>
                    <DrawerHeader />
                    <Suspense fallback={
                        <div style={
                            {
                                height: '100vh',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center'
                            }
                        }>
                            <CircularProgress />
                        </div>
                    }
                    >
                        <Message />
                    </Suspense>
                </Box>
            </Box>
        </>
    )
}
export default Home;