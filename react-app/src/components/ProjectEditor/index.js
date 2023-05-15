import { Editor, EditorState, RichUtils, ContentState, Modifier, convertToRaw, CompositeDecorator, convertFromRaw, AtomicBlockUtils } from 'draft-js';
import 'draft-js/dist/Draft.css';
import './ProjectEditor.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBold, faPlus, faDownload, faArrowUp, faMinus, faQuestionCircle, faItalic, faUnderline, faStrikethrough, faSave, faAlignJustify, faImage, faUpload, faSpinner, faLink, faSquare, faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useEffect, useState, useRef } from 'react';
import StyleButton from './StyleButton';
import { useDispatch, useSelector } from 'react-redux';
import { BLOCK_TYPES, styleMap } from './BlockTypes';
import { stateToHTML } from 'draft-js-export-html';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import { convertFromHTML, convertToHTML } from "draft-convert"
import { ENTITY_TYPE, BLOCK_TYPE } from 'draftail';
import { saveFileContents, addFileClick } from '../../store/files';
import { addToast } from '../../store/session';
import JSZip from 'jszip';
import FileSaver from 'file-saver';
import { toggleAlign, toggleColor, setPrevColor, setColorFunctionS, setAddLinkFunctionS, toggleAddLink, setAlignFunctionS, hideAlignModal, showAddImageModal, hideAddImageModal, setAddImageFunctionS, toggleAddImage } from '../../store/modals';
function ProjectEditor(props) {


    const [boldState, setBoldState] = useState('inactive-button');
    const file = useSelector(state => state.files.file);
    const files = useSelector(state => state.files.files);
    const fileClick = useSelector(state => state.files.fileClick);
    const sideBar = useSelector(state => state.modals.sidebar);
    const project = useSelector(state => state.projects.project);
    const addImageModal = useSelector(state => state.modals.addImage);
    const dispatch = useDispatch();
    const editor = useRef(null);
    const [classPreview, setClassPreview] = useState('project-editor-template-small');
    const [editorClass, setEditorClass] = useState('editor');
    const [topBarClass, setTopBarClass] = useState('top-bar');
    const [workingContents, setWorkingContents] = useState(null);
    const previewRef = useRef(null);
    const [previewDimensionHard, setPreviewDimensionHard] = useState(null);
    const [previewDimensions, setPreviewDimensions] = useState(null);
    const [previewContents, setPreviewContents] = useState(null);
    const [previewID, setPreviewID] = useState(null);
    const [divStyles, setDivStyles] = useState(null);
    const [divFontSize, setDivFontSize] = useState(null);
    const [divFontFamily, setDivFontFamily] = useState(null);
    const [divBackground, setDivBackground] = useState(null);

    const [save, setSave] = useState(false);
    const [fullPreview, setFullPreview] = useState(false);
    const [saveButtonLoader, setSaveButtonLoader] = useState(false);

    useEffect(() => {
        // setWorkingContents('');
        // setPreviewContents('');
        // setPreviewID('');
        setPreviewDimensions(false);
        setEditorState(EditorState.createEmpty());


    }, [fileClick])

    const hideAlignModalS = () => {
        dispatch(hideAlignModal());
    }
    useEffect(() => {
        if (save) {
            setTimeout(() => {
                dispatch(addToast({ type: 'save', message: 'File Saved' }))
                setSaveButtonLoader(false);
            }, 200)
        }
    }, [save])
    const exporterConfig = {
        blockToHTML: (block) => {
            if (block.type === BLOCK_TYPE.BLOCKQUOTE) {
                return <blockquote />
            }

            // Discard atomic blocks, as they get converted based on their entity.
            if (block.type === BLOCK_TYPE.ATOMIC) {
                return {
                    start: "",
                    end: "",
                }
            }
            if (block.type === ENTITY_TYPE.LINK) {
                return <a href={block.data.url}>{block.text}</a>
            }
            if (block.type === 'image') {
                return <img src={block.data.src} alt={block.data.alt} style={{ float: block.data.float, height: block.data.height + 'px' }} />
            }
            if (block.type === 'link' || block.type === "LINK") {
                return <a href={block.data.url} data-local={block.data.isLocal}>{block.data.anchor}</a>
            }

            return null
        },

        entityToHTML: (entity, originalText) => {


            if (entity.type === 'image' || entity.type === "IMAGE") {
                return <img src={entity.data.src} alt={entity.data.alt} style={{ float: entity.data.float, height: entity.data.height + 'px' }} />
            }
            if (entity.type === 'link' || entity.type === "LINK") {
                return <a href={entity.data.url} data-local={entity.data.isLocal}>{entity.data.anchor}</a>
            }
            if (entity.type === ENTITY_TYPE.HORIZONTAL_RULE) {
                return <hr />
            }

            return originalText
        },
    }

    const toHTML = (raw) =>
        raw ? convertToHTML(exporterConfig)(convertFromRaw(raw)) : ""
    const [editorState, setEditorState] = useState(EditorState.createEmpty());

    // add align-center entity to editorState



    useEffect(() => {
        if (file?.template) {
            let templateData = file.template;
            let template = templateData;
            template.content = template.content.replace(/''/g, "'");
            // // replace single quotes with double quotes
            template.content = template.content.replace(/'/g, '"');
            let content = JSON.parse(template.content);
            let divs = content.divs;
            let divContent = [];
            let divStylesList = [];
            let divFontSizeList = [];
            let divBackgroundList = [];
            let divFontFamilyList = [];
            let loadedContent = file.content;
            loadedContent = loadedContent.split("</head>");
            loadedContent = loadedContent[1];
            let element = document.createElement('div');
            element.innerHTML = loadedContent;
            let main = element?.children[0]?.children;
            for (let i = 0; i < divs.length; i++) {
                if (loadedContent) {
                    divContent.push(main[i].innerHTML);
                    divBackgroundList.push(main[i].style.backgroundColor);
                    if (main[i].style.fontFamily) {
                        divFontFamilyList.push(main[i].style.fontFamily);
                    } else {
                        divFontFamilyList.push('Arial');
                    }

                    if (main[i].style.fontSize) {
                        divFontSizeList.push(main[i].style.fontSize);
                    } else {
                        divFontSizeList.push('16px');
                    }

                    if (main[i].style?.display === 'flex') {
                        let obj = {
                            display: main[i].style.display,
                            justifyContent: main[i].style.justifyContent,
                            alignItems: main[i].style.alignItems,
                            flexDirection: main[i].style.flexDirection,
                        }
                        divStylesList.push(obj);
                    } else {
                        divStylesList.push('');
                    }
                } else {
                    divContent.push('');
                    divStylesList.push('');
                    divFontSizeList.push('16px');
                }
            }
            setDivBackground(divBackgroundList);
            setDivStyles(divStylesList);
            setWorkingContents(divContent);
            setDivFontFamily(divFontFamilyList);
            setDivFontSize(divFontSizeList);
            // set editor state to loaded content
            setPreviewDimensions(false);
            //setEditorState(EditorState.createEmpty());
        }
    }, [file])
    // useEffect(() => {
    //     console.log("previewRef.currenAdasadadt");

    useEffect(() => {
        if (previewDimensions) {
            exportHTML();
        }
    }, [editorState])

    // }, [previewCount])
    useEffect(() => {
        if (sideBar) {
            setClassPreview('project-editor-template')
            setEditorClass('editor-small')
            setTopBarClass('top-bar-small')
        } else {
            setClassPreview('project-editor-template-small')
            setEditorClass('editor')
            setTopBarClass('top-bar')
        }
    }, [sideBar])
    useEffect(() => {
    }, [workingContents])

    const importerConfig = {
        htmlToEntity: (nodeName, node, createEntity) => {
            // a tags will become LINK entities, marked as mutable, with only the URL as data.
            if (nodeName === "a") {
                let isLocal = node.getAttribute('data-local');

                return createEntity('link', "MUTABLE", { url: node.href, anchor: node.innerText, isLocal: isLocal })
            }
            if (nodeName === "span") {
                return null
            }
            if (nodeName === "img") {
                // remove 'px' from height
                let height = node.style.height;

                height = height.replace('px', '');
                return createEntity('image', "IMMUTABLE", {
                    src: node.src,
                    height: height,
                    float: node.style.float,
                })
            }

            if (nodeName === "hr") {
                return createEntity(ENTITY_TYPE.HORIZONTAL_RULE, "IMMUTABLE", {})
            }

            return null
        },
        htmlToStyle: (nodeName, node, currentStyle) => {
            if (nodeName === "span") {
                return currentStyle.add("red")
            }
            return currentStyle
        },

        htmlToBlock: (nodeName, data) => {
            if (nodeName === "span") {
                return data;
                return {
                    type: "paragraph",
                    style: "unstyled",
                    inlineStyleRanges: [{ offset: 0, style: 'red', length: 25 }],

                    data: {},

                }
            }
            if (nodeName === "hr" || nodeName === "img" || nodeName === "a") {
                // "atomic" blocks is how Draft.js structures block-level entities.
                return "atomic"
            }

            return null
        },
    }

    const fromHTML = (html) => convertToRaw(convertFromHTML(importerConfig)(html))


    const clickController = (e) => {
        hideAlignModalS();
        setTimeout(() => {
            let classes = e.target.classList;
            let etarget = e.target;
            if (!classes.contains('childrenNoSelect')) {
                while (!classes.contains('childrenNoSelect')) {
                    etarget = etarget.parentElement;
                    classes = etarget.classList;
                }
            }
            // get with and height of div
            let width = etarget.offsetWidth;
            let height = etarget.offsetHeight;
            setPreviewDimensionHard([width, height]);
            setPreviewID(etarget.id);
            // get ratio of div
            let ratio = width / height;
            setPreviewDimensions(ratio);
            // convert target innerHTML to draftjs
            let html = etarget.innerHTML;

            setPreviewContents(html);

            //setEditorState(EditorState.createWithContent(state, decorator));

            // convertFromRaw
            let convertedFromRaw = convertFromRaw(fromHTML(html));
            let editorState = EditorState.createWithContent(convertedFromRaw);
            setEditorState(editorState);
            // let { contentBlocks, entityMap } = htmlToDraft(html);
            // console.log(entityMap)
            // let contentState = ContentState.createFromBlockArray(contentBlocks, entityMap);
            // let editorState = EditorState.createWithContent(contentState);
            // setEditorState(editorState);
        }, 0)
        // set editor state to draftjs

    }
    const generateTemplatePreview = (templateData, previewClass) => {
        if (!templateData) return;
        let template = templateData;
        template.content = template.content.replace(/''/g, "'");
        // // replace single quotes with double quotes
        template.content = template.content.replace(/'/g, '"');
        let content = JSON.parse(template.content);
        templateData = content;
        let templatePreview = {
            position: "absolute",


            display: "grid",
            gridTemplate: templateData.template,


        };
        let divs = templateData.divs;
        let divData = '';
        for (let i = 0; i < divs.length; i++) {
            let divStyle = divStyles?.[i];
            let fontSizes = divFontSize?.[i];
            let fontFamily = divFontFamily?.[i];
            // convert object to string
            if (typeof divStyle === 'object') {

                divStyle = JSON.stringify(divStyle);
                // remove curly braces
                divStyle = divStyle.slice(1, -1);
                // replace commas with semicolons
                divStyle = divStyle.replace(/,/g, ';');
                // replace quotes with nothing
                divStyle = divStyle.replace(/"/g, '');
                // replace colons with :
                divStyle = divStyle.replace(/:/g, ': ');
                // add semicolon to end
                divStyle += ';';
                // replace justifyContent with justify-content
                divStyle = divStyle.replace(/justifyContent/g, 'justify-content');
                // replace alignItems with align-items
                divStyle = divStyle.replace(/alignItems/g, 'align-items');
                // replace flexDirection with flex-direction
                divStyle = divStyle.replace(/flexDirection/g, 'flex-direction');
                // replace flexWrap with flex-wrap


            }
            let colorOfDiv = divBackground?.[i];
            // remove the first <p></p> from workingContents
            let workingContent = workingContents?.[i];
            if (workingContent) {
                workingContent = workingContent.replace(/<p><\/p>/, '<p style="margin:0;padding:0"></p>');

            }

            let { startColumn, endColumn, startRow, endRow, color } = divs[i];
            divData += `
           <div id=${i}  class='childrenNoSelect' style="
           ${divStyle}
           width:100%;height:100%;font-size: ${fontSizes};font-family:${fontFamily};grid-column: ${startColumn} / span ${endColumn}; grid-row: ${startRow} / span ${endRow}; background-color: ${colorOfDiv || color};">
           ${workingContent}
           </div>



           `

        }
        setTimeout(() => {
            let children = previewRef?.current?.children;
            if (children) {
                for (let i = 0; i < children.length; i++) {
                    // check for event listeners
                    if (children[i].getAttribute('listener')) continue;
                    children[i].setAttribute('listener', true);
                    children[i].addEventListener('click', clickController);
                }
            }
        }, 0)

        setTimeout(() => setFullPreview(`
        <head>
        <script>
        document.addEventListener('DOMContentLoaded', ()=>{
        // get all links
          let links = document.querySelectorAll('[data-local="true"]');
          // loop through links
          for(let i = 0; i < links.length; i++){
              // add event listener
              links[i].addEventListener('click', (e)=>{
                  // prevent default
                  e.preventDefault();
                  // get href
                  let href = e.target.href;
                  // get anchor
                  let anchor = href.split('http://local/')[1];
                  // get element
                  opener.setWindow(anchor);
              }
              )
          }
        })
          </script>
        <style>
        body{
            margin:0;
            padding:0;

        }
        div{
            padding:0;
            margin:0;
        }
        p{
            padding:0;
            margin:0;
        }
        </style>
        </head>
        <div style='position:absolute;width:100%;height:100%;display:grid;grid-template:${templateData.template}'>
        ${divData}
        </div>`
        ), 100);


        return (
            <div ref={previewRef} style={templatePreview} className={previewDimensions ? previewClass : previewClass + " highlight-preview"} dangerouslySetInnerHTML={{ __html: divData }} >

            </div >
        )

    }

    window.setWindow = (anchor) => {
        // this function called from the child window
        // and communicates the new HTML to send to the child window
        let index = files.findIndex(file => file.name === anchor);

        let previewWindow = window.open('', 'preview', `width=${1600 / 1.2},height=${900 / 1.2}`);
        previewWindow.document.write(`

            ${files[index].content}
            `);
        previewWindow.document.close();
    }

    const showFullPreview = () => {
        let previewWindow = window.open('', 'preview', `width=${1600 / 1.2},height=${900 / 1.2}`);
        previewWindow.document.write(`

            ${fullPreview}
            `);
        previewWindow.document.close();
    }

    const exportHTML = () => {
        const rawContentState = convertToRaw(editorState.getCurrentContent());
        let html2 = toHTML(rawContentState);
        setPreviewContents(html2);
        if (!workingContents?.length) return;
        let newWorkingContents = [...workingContents];
        newWorkingContents[previewID] = html2;
        setWorkingContents(newWorkingContents);

    }
    const onChange = (editorState) => {
        setEditorState(editorState);
    }
    function focusEditor() {
        editor.current.focus();
    }
    function toggleBlockType(blockType) {

        onChange(
            RichUtils.toggleBlockType(
                editorState,
                blockType
            )
        );
    }
    function toggleInlineStyle(inlineStyle) {
        onChange(
            RichUtils.toggleInlineStyle(
                editorState,
                inlineStyle
            )
        );
    }




    function BlockStyleControls(props) {
        const selection = editorState.getSelection();
        const blockType = editorState
            .getCurrentContent()
            .getBlockForKey(selection.getStartKey())
            .getType();
        const inlineStyle = editorState.getCurrentInlineStyle();
        return (
            <div className="RichEditor-controls" onClick={focusEditor}>
                {BLOCK_TYPES.map((type) => (

                    <StyleButton
                        key={type.label}
                        active={type.style === blockType || inlineStyle.has(type.style)}
                        label={type.label}
                        focusEditor={focusEditor}
                        onToggle={type.type == true ? toggleInlineStyle : toggleBlockType}
                        style={type.style}
                        isBreak={type.isBreak}
                    />

                ))}
                <div
                    onMouseDown={() => { dispatch(toggleAddImage()); dispatch(setAddImageFunctionS(addImage)); }}
                >
                    <div className='RichEditor-styleButton'>
                        <FontAwesomeIcon icon={faImage} />
                    </div>

                </div>
                <div className='RichEditor-styleButton' onMouseDown={() => {
                    dispatch(toggleAddLink()); dispatch(setAddLinkFunctionS(addLink));
                }}>
                    <FontAwesomeIcon icon={faLink} />
                </div>
                <div className='RichEditor-styleButton' onMouseDown={() => {
                    //dispatch(toggleAddLink()); dispatch(setAddLinkFunctionS(addLink));
                    addStyledDiv({ backgroundColor: 'red', fontFamily: 'Courier New', padding: '10px' }, 'hello');
                }}>
                    <FontAwesomeIcon icon={faSquare} />
                </div>
            </div>
        );
    }
    const setLeft = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }

    const setCenter = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setTopLeft = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setTopCenter = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'center',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setTopRight = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-start',
            alignItems: 'flex-end',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setBottomLeft = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-start',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setBottomCenter = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'center',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setBottomRight = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'flex-end',
            alignItems: 'flex-end',
            flexDirection: 'column',
        }
        setDivStyles(newDivStyles);
    }
    const setRemove = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = '';
        setDivStyles(newDivStyles);
    }
    const setRight = () => {
        let newDivStyles = [...divStyles];
        newDivStyles[previewID] = {
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            flexDirection: 'column',
        }
        // insert new line at end of div

        setDivStyles(newDivStyles);
    }

    const thisIs = (a) => {
        switch (a) {
            case 'left':
                return setLeft();
            case 'center':
                return setCenter();
            case 'right':
                return setRight();
            case 'up-left':
                return setTopLeft();
            case 'up':
                return setTopCenter();
            case 'up-right':
                return setTopRight();
            case 'down-left':
                return setBottomLeft();
            case 'down':
                return setBottomCenter();
            case 'down-right':
                return setBottomRight();
            case 'remove':
                return setRemove();
            default:

                return setLeft();
        }
    }

    const addStyledDiv = (style, text) => {
        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'styledDiv',
            'MUTABLE',
            { text: text, style: style },)
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '  ');
        //dispatch(toggleAddStyledDiv());
        // SETSTATE
        setEditorState(newEditorState);
    }


    const addImage = (url, height, float) => {

        const contentState = editorState.getCurrentContent();
        const contentStateWithEntity = contentState.createEntity(
            'image',
            'MUTABLE',
            { src: url, height: height, float: float },)
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });
        newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '  ');
        dispatch(toggleAddImage());
        // SETSTATE
        setEditorState(newEditorState);
    }

    const addLink = (url, text, isLocal) => {
        const contentState = editorState.getCurrentContent();
        if (isLocal) {
            url = "http://local/" + url;
        }
        const contentStateWithEntity = contentState.createEntity(
            'link',
            'MUTABLE',
            { url: url, anchor: text, isLocal: isLocal },)
        const entityKey = contentStateWithEntity.getLastCreatedEntityKey();
        let newEditorState = EditorState.set(editorState, { currentContent: contentStateWithEntity });

        newEditorState = AtomicBlockUtils.insertAtomicBlock(newEditorState, entityKey, '  ');
        dispatch(toggleAddLink());
        setEditorState(newEditorState);
    }
    const FontSize = () => {
        const [fontSize, setFontSize] = useState(divFontSize?.[previewID]);
        useEffect(() => {
            setFontSize(divFontSize?.[previewID]);
        }, [previewID]);

        return (
            <div className='top-bar-font-size'>
                <input type='text' value={fontSize} onChange={(e) => { setFontSize(e.target.value); }} />
                <div className='font-size-buttons'>
                    <div className='font-size-button-up' onMouseDown={
                        () => {
                            let newDivFontSize = [...divFontSize];
                            newDivFontSize[previewID] = Number(fontSize.split("px")[0]) + 1 + "px";
                            setDivFontSize(newDivFontSize);
                        }

                    }>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                    <div className='font-size-button-down' onMouseDown={
                        () => {
                            let newDivFontSize = [...divFontSize];
                            newDivFontSize[previewID] = Number(fontSize.split("px")[0]) - 1 + "px";
                            setDivFontSize(newDivFontSize);
                        }

                    }>
                        <FontAwesomeIcon icon={faMinus} />
                    </div>
                </div>
            </div>
        )
    }
    const FontFamily = () => {
        const [fontFamily, setFontFamily] = useState(divFontFamily?.[previewID]);
        const [fontFamilyList, setFontFamilyList] = useState([
            'Arial',
            'Times',
            'Courier',
            'Georgia',
            'Verdana',
            'Impact',
            'Lucida',
            'Tahoma',
        ]);
        useEffect(() => {
            setFontFamily(divFontFamily?.[previewID]);
        }, [previewID]);


        return (
            <div className='top-bar-font-family'>
                <select className='top-bar-font-family' onChange={(e) => {
                    setFontFamily(e.target.value);
                    let newDivFontFamily = [...divFontFamily];
                    newDivFontFamily[previewID] = e.target.value;
                    setDivFontFamily(newDivFontFamily);

                }} value={fontFamily}>
                    {fontFamilyList.map((font, index) => {
                        return (
                            <option value={font} key={index} className={"option" + index}>{font}</option>
                        )
                    })}

                </select>
            </div>
        )
    }

    const TopBar = () => {
        return (
            <div className={topBarClass}>
                {!previewDimensions && <div className='top-bar-cover'></div>}
                <div className='top-bar-left'>
                    <div className='top-bar-button' onMouseDown={
                        async () => {
                            setSaveButtonLoader(true);
                            setSave(await dispatch(saveFileContents(file.projectid, file.id, fullPreview)));
                        }
                    }>
                        <FontAwesomeIcon icon={saveButtonLoader ? faSpinner : faSave} className={saveButtonLoader ? 'spinner' : 'none'} /> Save
                    </div><div className='top-bar-preview'>
                        <div
                            onClick={() => { showFullPreview(); }}
                        >
                            <div className='top-bar-button'>
                                Preview
                            </div>
                        </div>

                    </div>
                    <div className='top-bar-button' onClick={() => {
                        const zip = new JSZip();
                        // for each file in project, add the contents to the zip
                        files.forEach((file) => {
                            // if file.name does not end in .html, add .html
                            if (!file.name.endsWith('.html')) {
                                file.name = file.name + '.html';
                            }
                            // in file.content, replace all instances of a href="local with a href="/
                            file.content = file.content.replaceAll('a href="http://local/', 'a href="./');
                            file.contnet = file.content.replaceAll('data-local="true"', '');
                            // use regex to remove anythign between <script> and </script>
                            file.content = file.content.replaceAll(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');

                            zip.file(file.name, file.content);
                        });
                        // add the idlist.txt file


                        zip.file('idlist.txt', 'PMID:29651880\r\nPMID:29303721');

                        zip.generateAsync({ type: 'blob' }).then(function (content) {
                            FileSaver.saveAs(content, `${project.name}.zip`);
                        });
                    }}>
                        <FontAwesomeIcon icon={faDownload} /> Download

                    </div>
                </div>
                <div className='top-bar-right'>
                    <div>
                        <FontFamily />
                    </div>
                    <div >
                        <FontSize />
                    </div>
                    <div
                        onClick={() => { dispatch(toggleAlign()); dispatch(setAlignFunctionS(thisIs)); }}
                    >
                        <div className='top-bar-button'>
                            Align Div
                        </div>
                    </div>


                    <div
                        onClick={() => {
                            // set current divBackground of preview to red
                            dispatch(setPrevColor(divBackground[previewID]));
                            dispatch(toggleColor());
                            dispatch(setColorFunctionS(setDivBackgroundColor));
                        }}
                    >
                        <div className='top-bar-button'>
                            Background Color
                        </div>
                    </div>
                    <div
                        onClick={() => {
                        }
                        }>

                        <div className='top-bar-button'>
                            <FontAwesomeIcon icon={faQuestionCircle} />
                        </div>
                    </div>

                </div>



            </div>
        )
    }
    const setDivBackgroundColor = (color) => {
        let newDivBackground = [...divBackground];
        newDivBackground[previewID] = color;
        setDivBackground(newDivBackground);
    }
    const SelectedPreview = () => {
        // get width and height of the window
        let windowWidth = window.innerWidth;
        let windowHeight = window.innerHeight;
        let width = windowWidth * 1;
        let scale = 'width';
        let height = width / previewDimensions;
        // clamp height to window height
        if (height > windowHeight) {
            height = windowHeight * 1;
            width = height * previewDimensions;
            scale = 'height';
        }
        let scaler = 1;
        if (scale === 'width') {
            scaler = width / previewDimensionHard[0];
        } else {
            scaler = height / previewDimensionHard[1];
        }


        let gap = (windowHeight - height) / 4;
        let bg = divBackground[previewID];
        let style = {
            width: `${previewDimensionHard[0]}px`,
            height: `${previewDimensionHard[1]}px`,
            // width: '100px',
            // height: '100px',
            backgroundColor: bg || 'transparent',
            border: '1px dashed #FFFFFF60',
            position: 'relative',
            fontSize: divFontSize?.[previewID] || '16px',
            fontFamily: divFontFamily?.[previewID] || 'Arial',
            // top: gap + 'px',
            zIndex: '100',
        }
        let style2 = {
            width: sideBar ? '80vw' : '100vw',
            display: 'flex',
            justifyContent: 'flex-start',
            position: 'relative',
            left: 20,
            alignItems: 'flex-start',
            transformOrigin: 'top left',
            transform: `scale(${scaler / 2})`,
        }
        let style3 = divStyles[previewID];
        let style4 = {
            ...style,
            ...style3,
        }
        return (
            <div style={style2}>

                <div style={style4} className='editor-selected-preview' dangerouslySetInnerHTML={{ __html: previewContents }}>


                </div>
            </div>
        )
    }
    const Image = (props) => {
        return <img src={props.src} style={{ float: props.float, height: props.height + "px" }} />;
    };
    const Link = (props) => {
        return <a style={{ padding: 0, margin: 0 }} href={props.url}>{props.anchor}</a>;
    }

    const Media = (props) => {
        const entity = props.contentState.getEntity(
            props.block.getEntityAt(0)
        );
        const { src, height, float, url, anchor, style, text } = entity.getData();
        let type = entity.getType();
        if (type === "IMAGE") {
            type = "image";
        }
        let media;
        if (type === 'image') {
            media = <Image src={src} height={height} float={float} />;
        }
        if (type === 'link') {
            media = <Link url={url} anchor={anchor} />;

        }
        if (type === 'styledDiv') {
            media = <div style={style}>{text}</div>
        }

        return media;
    };
    // make a custom draftail entity for the right component
    function mediaBlockRenderer(block) {
        if (block.getType() === 'atomic') {
            return {
                component: Media,
                editable: false,
            };
        }


        return null;
    }


    return (
        <div>
            {!file && <div className='no-file-selected'>
                <div className='no-file-helper-text'>
                    <FontAwesomeIcon icon={faArrowLeft} />
                    Select a file to begin
                </div>
            </div>}
            <TopBar />
            {file && generateTemplatePreview(file.template, classPreview)}

            {previewDimensions && <SelectedPreview />}
            <div className={editorClass}>
                {!previewDimensions && file && <div className='editor-cover'>

                    <div className='editor-cover-select-template'>
                        <FontAwesomeIcon icon={faArrowUp} />
                        Select a DIV to edit
                    </div>

                </div>}
                <div className='buttons'>
                    <BlockStyleControls />
                </div>
                <Editor ref={editor}
                    onEditorStateChange={onChange}
                    blockRendererFn={mediaBlockRenderer}
                    editorState={editorState} customStyleMap={styleMap} onChange={onChange}
                    handleKeyCommand={(command) => {

                        let newState = RichUtils.handleKeyCommand(editorState, command)

                        if (newState) {
                            onChange(newState)
                            return "handled"
                        }

                        return "not-handled"
                    }} />
            </div>
        </div>
    )
}
export default ProjectEditor
