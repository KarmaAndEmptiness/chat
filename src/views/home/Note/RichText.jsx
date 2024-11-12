import React from 'react'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css'; // 引入样式
import { useDropzone } from 'react-dropzone';



function RichText() {
    const [editorValue, setEditorValue] = React.useState('');
    const quillRef = React.useRef(null);

    // 图片上传处理
    const handleImageUpload = (file) => {
        const formData = new FormData();
        formData.append('file', file);

        // // 这里可以将图片上传到你的服务器，以下是模拟上传
        const uploadImage = (file) => {
            // 模拟上传的url
            return new Promise((resolve) => {
                setTimeout(() => {
                    resolve({ url: URL.createObjectURL(file) }); // 返回图片的url
                }, 1000);
            });
        };

        uploadImage(file).then((res) => {
            const imageUrl = res.url;

            // 获取编辑器实例
            const editor = quillRef.current.getEditor();

            // 插入图片到编辑器中
            const range = editor.getSelection();
            editor.insertEmbed(range.index, 'image', imageUrl);
        });
    };

    const { getRootProps, getInputProps } = useDropzone({
        onDrop: (acceptedFiles) => handleImageUpload(acceptedFiles[0]),
        accept: 'image/*',
    });


    return (
        <>
            <ReactQuill
                style={
                    {
                        width: '100%'
                    }
                }
                ref={quillRef}
                value={editorValue}
                onChange={setEditorValue}
                modules={{
                    toolbar: [
                        [{ header: '1' }, { header: '2' }, { font: [] }],
                        [{ list: 'ordered' }, { list: 'bullet' }],
                        ['bold', 'italic', 'underline'],
                        ['link', 'image'], // 支持图片插入
                    ],
                }}
            />
        </>
    );
};

export default RichText

// const toolbarGroups = [
//     [
//         {
//             icon: <UndoOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 // 撤消功能
//                 const newState = EditorState.undo(editorState);
//                 setEditorState(newState);
//             },
//         },
//         {
//             icon: <RedoOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = EditorState.redo(editorState);
//                 setEditorState(newState);
//             },
//         },
//     ],
//     [
//         {
//             icon: < FormatBoldOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleInlineStyle(editorState, 'BOLD');
//                 setEditorState(newState);
//             },

//         },
//         {
//             icon: <FormatUnderlinedOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleInlineStyle(editorState, 'UNDERLINE');
//                 setEditorState(newState);
//             },

//         },
//         ,
//         {
//             icon: <FormatItalicOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleInlineStyle(editorState, 'ITALIC');
//                 setEditorState(newState);
//             },
//         },
//         ,
//         {
//             icon: < ViewHeadlineOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleBlockType(editorState, 'header-one');
//                 setEditorState(newState);
//             },

//         },
//         ,
//         {
//             icon: <StrikethroughSOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleInlineStyle(editorState, 'STRIKETHROUGH');
//                 setEditorState(newState);
//             },

//         },
//         ,
//         {
//             icon: <FormatListNumberedOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleBlockType(editorState, 'ordered-list-item');
//                 setEditorState(newState);
//             },

//         },
//         ,
//         {
//             icon: <FormatListBulletedOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const newState = RichUtils.toggleBlockType(editorState, 'unordered-list-item');
//                 setEditorState(newState);
//             },

//         },
//     ],
//     [
//         {
//             icon: <PanoramaOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {
//                 const fileInput = document.createElement('input');
//                 fileInput.type = 'file';
//                 fileInput.accept = 'image/*';
//                 fileInput.onchange = async (event) => {
//                     const file = event.target.files[0];
//                     if (file) {
//                         const reader = new FileReader();
//                         reader.onloadend = () => {
//                             const contentState = editorState.getCurrentContent();
//                             const contentStateWithImage = contentState.createEntity('IMAGE', 'IMMUTABLE', { src: reader.result });
//                             const entityKey = contentStateWithImage.getLastCreatedEntityKey();
//                             const newState = EditorState.set(editorState, { currentContent: contentStateWithImage });
//                             setEditorState(AtomicBlockUtils.insertAtomicBlock(newState, entityKey, ' '));
//                         };
//                         reader.readAsDataURL(file);
//                     }
//                 };
//                 fileInput.click();
//             },
//         },
//         {
//             icon: <TableViewOutlinedIcon />,
//             tip: () => null,
//             func: (editorState, setEditorState) => {

//             },
//         },
//     ]

// ]