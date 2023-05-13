import './AddFile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { toggleDeleteFile } from '../../../../store/modals'
import { getTemplates } from '../../../../store/templates'
import { createNewFile, deleteFile } from '../../../../store/files'
function DeleteFile() {
    const dispatch = useDispatch()
    const [fileName, setFileName] = useState('')
    const [template, setTemplate] = useState('')
    const [templates, setTemplates] = useState([])
    const project = useSelector(state => state.projects.project)
    const selectedFile = useSelector(state => state.files.file)
    const files = useSelector(state => state.files.files)
    const deleteFileID = useSelector(state => state.modals.deleteFileID)

    useEffect(() => {
        async function fetchData() {

            let t = await dispatch(getTemplates())
            setTemplate(t.templates[0].id);
            setTemplates(t.templates);
        }
        fetchData()

    }, [dispatch])


    return (
        <div className='add-file-modal'>
            <div className='add-file-modal-content delete'>
                {files.length > 1 && <>
                    <div className='add-file-modal-header'>
                        Delete File ?
                    </div>
                    <div className='add-file-modal-body delete'>
                        <label>Name:{selectedFile.name}</label>

                        <div className='add-image-footer'>
                            <button className='add-file-modal-body-buttons-cancel' onClick={() => dispatch(toggleDeleteFile())}>Cancel</button>
                            <button className='add-file-modal-body-buttons-add delete'
                                onClick={() => {
                                    dispatch(deleteFile(project.id, selectedFile.id))
                                    dispatch(toggleDeleteFile())
                                }}

                            >Delete</button>
                        </div>

                    </div>
                </>}
                {files.length === 1 && <>
                    <div className='add-file-modal-header nodelete'>
                        This is the last file in the project. You cannot delete it. <br />
                        You can delete the project instead.
                    </div>
                    <div className='add-file-modal-body delete'>

                        <div className='add-image-footer'>
                            <button className='add-file-modal-body-buttons-cancel nodelete' onClick={() => dispatch(toggleDeleteFile())}>Cancel</button>
                        </div>

                    </div>
                </>
                }

            </div>
        </div>
    )

}
export default DeleteFile
