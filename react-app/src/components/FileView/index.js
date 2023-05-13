import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, setFileS, addFileClick, updateFile } from '../../store/files'
import { setProjectThunk } from '../../store/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { addToast } from '../../store/session';
import { faSpinner, faPlus, faTrash, faPencil, faSave } from '@fortawesome/free-solid-svg-icons';
import { toggleAddFile, toggleDeleteFile } from '../../store/modals'
import './FileView.css'
function FileView(props) {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [templateData, setTemplateData] = useState(null)
    const [classState, setClassState] = useState('file-view')
    const [editName, setEditName] = useState('')
    const projectID = props.match.params.id
    const project = useSelector(state => state.projects.project)
    const files = useSelector(state => state.files.files)
    const selectedFile = useSelector(state => state.files.file)
    const [isEditing, setIsEditing] = useState(false)
    const editingRef = useRef(null)
    useEffect(() => {
        dispatch(getFiles(projectID))
        dispatch(setProjectThunk(projectID))
    }, [dispatch, projectID])

    useEffect(() => {
        if (!files) return

        files[0].template.content = files[0].template.content.replace(/''/g, "'");
        // replace single quotes with double quotes
        files[0].template.content = files[0].template.content.replace(/'/g, '"');
        let content = JSON.parse(files[0].template.content);
        setTemplateData(content)
        console.log(content)
        setTimeout(() => setLoaded(true), 300)
    }, [files])
    useEffect(() => {
        if (loaded && selectedFile) {
            setClassState('file-view file-view-show')
        }
        if (loaded && !selectedFile) {
            setClassState('file-view file-view-show file-select-me')
        }
    }, [loaded, selectedFile])


    const setFileState = (file) => {
        dispatch(setFileS(file))
    }

    return (<>


        <div className="sidebar-divider"></div>


        <br />
        {!loaded &&

            <FontAwesomeIcon icon={faSpinner} className="template-box-loading-icon-2 small" />

        }

        <div className={classState}>
            <div className='file-display'>
                <div className='file-display-project-name'>
                    {project && (project.name)}
                    <div className='file-display-add-file'
                        onClick={() => {
                            dispatch(toggleAddFile())
                        }}>
                        <FontAwesomeIcon icon={faPlus} />
                    </div>
                </div>
                {files && loaded && files.map((file) => {
                    if (file.id === selectedFile?.id) {
                        return (
                            <div className='file file-selected' key={file.id}>
                                {isEditing ? <input ref={editingRef} className='file-name-edit' value={editName} placeholder={file.name} onChange={(e) => setEditName(e.target.value)} /> : file.name}
                                <div className='file-editor-buttons'>
                                    <FontAwesomeIcon icon={isEditing ? faSave : faPencil} className='file-edit'
                                        onClick={async () => {
                                            if (!isEditing) {
                                                setIsEditing(true)
                                                setEditName(file.name)
                                                setTimeout(() => {

                                                    editingRef.current.focus()
                                                }, 1)
                                            } else {
                                                if (file.name === editingRef.current.value) return setIsEditing(false)
                                                let res = await dispatch(updateFile(project.id, file.id, editingRef.current.value))
                                                if (!res.errors) {
                                                    dispatch(addToast({ type: 'update', message: 'File name updated' }))
                                                } else {
                                                    dispatch(addToast({ type: 'error', message: res.errors[0] }))
                                                }

                                                setIsEditing(false)
                                            }
                                        }} />
                                    <FontAwesomeIcon icon={faTrash} className='file-delete' onClick={() => {
                                        dispatch(toggleDeleteFile(2))
                                    }} />
                                </div>
                            </div>
                        )
                    }

                    return (
                        <div className='file' key={file.id} onClick={() => {
                            dispatch(addFileClick())
                            setIsEditing(false)
                            setFileState(file)

                        }}>{file.name}</div>
                    )
                }
                )}
            </div>
        </div >
    </>
    )
}
export default FileView
