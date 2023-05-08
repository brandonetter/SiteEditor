import './AddFile.css'
import { useDispatch, useSelector } from 'react-redux'
import { useState, useEffect } from 'react'
import { toggleAddFile } from '../../../../store/modals'
import { getTemplates } from '../../../../store/templates'
import { createNewFile } from '../../../../store/files'
function AddFile() {
    const dispatch = useDispatch()
    const [fileName, setFileName] = useState('')
    const [template, setTemplate] = useState('')
    const [templates, setTemplates] = useState([])
    const project = useSelector(state => state.projects.project)

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
            <div className='add-file-modal-content'>
                <div className='add-file-modal-header'>
                    Add File
                </div>
                <div className='add-file-modal-body'>
                    <label>Name:</label>

                    <input type='text' placeholder='File Name'
                        onChange={(e) => {
                            setFileName(e.target.value)
                        }} />
                    <br />
                    <label>Template:</label><select value={template} onChange={(e) => setTemplate(e.target.value)}>
                        {templates && templates.map((template) => {
                            return (



                                <option value={template.id} key={template.id}>{template.name}</option>



                            )
                        })}
                    </select>
                    <div className='add-image-footer'>
                        <button className='add-file-modal-body-buttons-cancel' onClick={() => dispatch(toggleAddFile())}>Cancel</button>
                        <button className='add-file-modal-body-buttons-add'
                            onClick={() => {
                                dispatch(createNewFile(project.id, fileName, template))
                                dispatch(toggleAddFile())
                            }}

                        >Add</button>
                    </div>

                </div>
            </div>
        </div>
    )

}
export default AddFile
