import React from 'react'
import { Alert, Box, Button, Divider, IconButton, InputBase, MenuItem, OutlinedInput, Snackbar, Stack, Tooltip } from '@mui/material'
import { PanoramaOutlined as PanoramaOutlinedIcon, TableViewOutlined as TableViewOutlinedIcon, FormatListBulletedOutlined as FormatListBulletedOutlinedIcon, FormatListNumberedOutlined as FormatListNumberedOutlinedIcon, ViewHeadlineOutlined as ViewHeadlineOutlinedIcon, FormatUnderlinedOutlined as FormatUnderlinedOutlinedIcon, StrikethroughSOutlined as StrikethroughSOutlinedIcon, FormatSizeOutlined as FormatSizeOutlinedIcon, FormatColorTextOutlined as FormatColorTextOutlinedIcon, FormatQuoteOutlined as FormatQuoteOutlinedIcon, FormatItalicOutlined as FormatItalicOutlinedIcon, UndoOutlined as UndoOutlinedIcon, RedoOutlined as RedoOutlinedIcon, FormatBoldOutlined as FormatBoldOutlinedIcon, FormatAlignCenterOutlined as FormatAlignCenterOutlinedIcon, FormatAlignLeftOutlined as FormatAlignLeftOutlinedIcon, FormatAlignRightOutlined as FormatAlignRightOutlinedIcon, AddRounded as AddRoundedIcon, Close as CloseIcon, ManageSearchOutlined as ManageSearchOutlinedIcon } from '@mui/icons-material'
import 'draft-js/dist/Draft.css'
import { Editor, EditorState, RichUtils, Modifier, AtomicBlockUtils } from 'draft-js'
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

const toolbarGroups = [
    [
        {
            icon: <UndoOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                // 撤消功能
                const newState = EditorState.undo(editorState);
                setEditorState(newState);
            },
        },
        {
            icon: <RedoOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = EditorState.undo(editorState);
                setEditorState(newState);
            },
        },
    ],
    [
        {
            icon: < FormatBoldOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
                setEditorState(newState);
            },

        },
        {
            icon: <FormatUnderlinedOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
                setEditorState(newState);
            },

        },
        ,
        {
            icon: <FormatItalicOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
                setEditorState(newState);
            },
        },
        ,
        {
            icon: < ViewHeadlineOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleBlockType(editorState, 'header-one');
                setEditorState(newState);
            },

        },
        ,
        {
            icon: <StrikethroughSOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
                setEditorState(newState);
            },

        },
        ,
        {
            icon: <FormatListNumberedOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
                setEditorState(newState);
            },

        },
        ,
        {
            icon: <FormatListBulletedOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                const newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
                setEditorState(newState);
            },

        },
    ],
    [
        {
            icon: <PanoramaOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {
                // const fileInput = document.createElement('input');
                // fileInput.type = 'file';
                // fileInput.accept = 'image/*';
                // fileInput.onchange = async (event) => {
                //     const file = event.target.files[0];
                //     const reader = new FileReader();
                //     reader.onloadend = () => {
                //         const contentState = editorState.getCurrentContent();
                //         const contentStateWithImage = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: reader.result });
                //         const entityKey = contentStateWithImage.getLastCreatedEntityKey();
                //         if (!entityKey) {
                //             console.error('Entity Key is undefined');
                //             return; // 提前返回以避免后续错误
                //         }
                //         const newState = EditorState.push(editorState, contentStateWithImage, 'insert-characters');
                //         setEditorState(AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' '));
                //     };
                //     reader.readAsDataURL(file);
                // };
                // fileInput.click();
            },
        },
        {
            icon: <TableViewOutlinedIcon />,
            tip: () => null,
            func: (editorState, setEditorState) => {

            },
        },
    ]

]

const Image = (props) => {
    const { src } = props.contentState.getEntity(props.entityKey).getData();
    return <img src={src} alt="Uploaded" style={{ maxWidth: '100%' }} />;
};
const blockRenderer = (block) => {
    if (block.getType() === 'atomic') {
        return {
            component: Image,
            editable: false,
        };
    }
    return null;
};


const RichText = () => {
    const [editorState, setEditorState] = React.useState(() =>
        EditorState.createEmpty(),
    );
    const handleToolbarClick = (func) => {
        func(editorState, setEditorState);
    }
    return (
        <>
            <Box
                sx={
                    {
                        width: '100%',
                        padding: '10px 5px'
                    }
                }
            >
                <InputBase placeholder='请输入标题'
                    sx={
                        {
                            '& > input': {
                                padding: '10px 5px',
                                fontSize: '20px',
                                width: '100%',
                            }
                        }
                    }
                />
            </Box>

            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 1,
                    bgcolor: 'background.paper',
                    color: 'text.secondary',
                    '& svg': {
                        m: 1,
                    },
                    '& > .MuiButtonBase-root': {
                        padding: '0px'
                    }
                }}
            >
                {
                    toolbarGroups.map((group, Idx) => (
                        <React.Fragment key={Idx}>
                            {
                                group.map((item, idx) => (
                                    <Tooltip
                                        key={idx}
                                        title={item.tip()}
                                    >
                                        <IconButton
                                            onClick={() => item.func(editorState, setEditorState)}
                                        >{item.icon}</IconButton>
                                    </Tooltip>
                                ))
                            }

                            {

                                (Idx !== toolbarGroups.length - 1) && (<Divider orientation="vertical" flexItem />)
                            }
                        </React.Fragment>
                    ))
                }

            </Box>
            <Editor editorState={editorState} onChange={setEditorState}
            // blockRendererFn={blockRenderer}
            />
        </>

    )
}
