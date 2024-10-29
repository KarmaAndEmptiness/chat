import React, { Suspense } from 'react'
import { Routes, useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemIcon, ListItemText, Divider, CircularProgress } from '@mui/material'

const LeftBox = function ({ navs, baseRoute, onNavChange }) {
    const [selectedIndex, setSelectedIndex] = React.useState(0);
    const navigate = useNavigate();
    const handleListItemClick = (event, index, path) => {
        setSelectedIndex(index);
        navigate(`/${baseRoute}/${path}`, { replace: false });
        onNavChange(navs[index]);
    };
    return (
        <List>
            {
                navs && navs.map((nav, idx) => (
                    <ListItemButton
                        selected={selectedIndex === idx}
                        onClick={(event) => handleListItemClick(event, idx, nav.path)}
                        key={nav.name}
                        sx={
                            {
                                '& > div.css-cveggr-MuiListItemIcon-root':
                                {
                                    minWidth: '30px',
                                }
                            }
                        }
                    >
                        <ListItemIcon
                            sx={
                                {
                                    '& > .css-i4bv87-MuiSvgIcon-root': {
                                        fontSize: '1.3rem'
                                    },
                                    minWidth: '0px',
                                    paddingRight: '10px'
                                }
                            }
                        >
                            {selectedIndex === idx ? <nav.activeIcon /> : <nav.icon />}
                        </ListItemIcon>
                        <ListItemText
                            sx={
                                {
                                    '& > .css-10hburv-MuiTypography-root ': {
                                        fontSize: '12px'
                                    }
                                }
                            }
                            primary={nav.name} />
                    </ListItemButton>
                ))
            }
        </List>
    )
}

export default function SubNav({ navs, title, children, baseRoute }) {
    const [selectedNav, setSelectedNav] = React.useState(navs[0]);
    return (
        <>
            <div style={headerStyle}>{title}</div>
            <Divider />

            <div style={containerStyle}>
                <div style={leftContainerStyle}>
                    {/* 左部导航栏 */}
                    <LeftBox onNavChange={(nav) => setSelectedNav(nav)} navs={navs} baseRoute={baseRoute} />
                </div>

                <div style={rightContainerStyle}>
                    {selectedNav.showTitle && (<>
                        <div style={_headerStyle}>{selectedNav.name}</div>
                        <Divider />
                    </>)}
                    <Suspense
                        fallback={
                            <div style={
                                {
                                    height: '90%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                }
                            }>
                                <CircularProgress />
                            </div>
                        }
                    >
                        <Routes>
                            {children}
                        </Routes>
                    </Suspense>
                </div>
            </div>

        </>
    )
}

const headerStyle = {
    fontSize: '1.2rem',
    fontWeight: '700',
    padding: '.6rem'
}
const _headerStyle = {
    fontSize: '1rem',
    padding: '1rem 0 1rem 1rem',
}
const containerStyle = {
    display: 'flex',
}
const leftContainerStyle = {
    width: '130px',
    borderRight: '1px solid #ccc',
    flexShrink: 0,
    height: 'calc(100vh - 133px)'
}

const rightContainerStyle = {
    width: 'calc(100% - 130px)',
    height: 'calc(100vh - 239px)',
    backGroundColor: 'pink'
}