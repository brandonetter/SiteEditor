import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles, setFileS } from '../../store/files'
import { setProjectThunk } from '../../store/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner, faPlus } from '@fortawesome/free-solid-svg-icons';
import { toggleAddFile } from '../../store/modals'
import './FileView.css'
function FileView(props) {
    const dispatch = useDispatch()
    const [file, setFile] = useState(null)
    const [loaded, setLoaded] = useState(false)
    const [templateData, setTemplateData] = useState(null)
    const [classState, setClassState] = useState('file-view')
    const projectID = props.match.params.id
    const project = useSelector(state => state.projects.project)
    const files = useSelector(state => state.files.files)

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
        if (loaded) {
            setClassState('file-view file-view-show')
        }
    }, [loaded])


    const setFileState = (file) => {
        dispatch(setFileS(file))
    }

    return (<>


        <div className="sidebar-divider"></div>


        <br />
        {!loaded &&

            <FontAwesomeIcon icon={faSpinner} className="template-box-loading-icon small" />

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
                    return (
                        <div className='file' key={file.id} onClick={() => setFileState(file)}>{file.name}</div>
                    )
                }
                )}
            </div>
        </div >
    </>
    )
}
export default FileView
