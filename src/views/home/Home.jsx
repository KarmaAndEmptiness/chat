import React, { Suspense } from 'react'
import CircularProgress from '@mui/material/CircularProgress';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Badge from '@mui/material/Badge';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import MessageRoundedIcon from '@mui/icons-material/MessageRounded';
import AccountBoxRoundedIcon from '@mui/icons-material/AccountBoxRounded';
import NoteAltRoundedIcon from '@mui/icons-material/NoteAltRounded';
import SettingsIcon from '@mui/icons-material/Settings';
import avatar from '~/assets/img/bg.jpg'
const Message = React.lazy(() => import('./Message'))
const drawerWidth = 240;
const navs = [
    {
        name: '消息',
        icon: MessageRoundedIcon,
        path: '/message'
    },
    {
        name: '通讯录',
        icon: AccountBoxRoundedIcon,
        path: '/friend'
    },
    {
        name: '笔记',
        icon: NoteAltRoundedIcon,
        path: '/note'
    },
    {
        name: '设置',
        icon: SettingsIcon,
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
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };



    return (
        <>
            <Box sx={{ display: 'flex' }}>

                {/* 顶部导航栏 */}
                <AppBar position="fixed" open={open}>
                    <Toolbar sx={
                        {
                            paddingLeft: '14px !important',
                            [theme.breakpoints.up('sm')]: {
                                paddingLeft: '18px !important'
                            },
                            transition: theme.transitions.create('padding-left', {
                                easing: theme.transitions.easing.sharp,
                                duration: theme.transitions.duration.leavingScreen,
                            }),
                        }
                    }>


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

                        {/* 头像 */}
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


                        <Box sx={
                            {
                                flex: 'auto',
                                paddingLeft: '10px',
                                height: '75%'
                            }
                        }>

                            {/* 昵称 */}
                            <Box sx={
                                {
                                    height: '40%',
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }>1</Box>

                            {/* 个性签名 */}
                            <Box sx={
                                {
                                    fontSize: '12px',
                                    height: '60%',
                                    border: '1px solid #ccc',
                                    display: 'flex',
                                    alignItems: 'center'
                                }
                            }>2</Box>
                        </Box>

                        {/* 收起导航栏按钮 */}
                        <IconButton onClick={handleDrawerClose}>
                            {theme.direction === 'rtl' ? null : <ChevronLeftIcon />}
                        </IconButton>
                    </DrawerHeader>

                    {/* 分割线 */}
                    <Divider />

                    {/* 左侧导航栏菜单列表 */}
                    <List>
                        {navs.map(nav => (
                            <ListItem key={nav.name} disablePadding sx={{ display: 'block' }}>
                                <ListItemButton
                                    sx={{
                                        minHeight: 48,
                                        justifyContent: open ? 'initial' : 'center',
                                        px: 2.5,
                                    }}
                                >
                                    <ListItemIcon
                                        sx={{
                                            minWidth: 0,
                                            mr: open ? 3 : 'auto',
                                            justifyContent: 'center',

                                        }}
                                    >
                                        {<nav.icon />}
                                    </ListItemIcon>
                                    <ListItemText primary={nav.name} sx={{ opacity: open ? 1 : 0 }} />
                                </ListItemButton>
                            </ListItem>
                        ))}
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