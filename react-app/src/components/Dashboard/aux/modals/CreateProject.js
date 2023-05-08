import './CreateProject.css'
import { useDispatch } from 'react-redux'
import { toggleCreateProject } from '../../../../store/modals'
import { createProject } from '../../../../store/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getTemplates } from '../../../../store/templates'
function CreateProject() {

    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {

            let t = await dispatch(getTemplates())
            setTemplate(t.templates[0].id);
            setTemplates(t.templates);
        }
        fetchData()

    }, [dispatch])
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('default');
    const create = () => {
        let projectName = document.getElementById('project-name').value;
        console.log(projectName);
        dispatch(createProject(projectName));
        dispatch(toggleCreateProject());
    }

    return (
        <div className='create-project'>
            <div className='create-project-content'>
                <div className='x-button' onClick={
                    () => {
                        dispatch(toggleCreateProject());
                    }
                }>
                    <FontAwesomeIcon icon={faTimes} className="x-button-icon" />
                </div>
                <h1>Create Project</h1>
                <div>
                    <div className='create-project-input-container'>
                        <label htmlFor='project-name'>Project Name</label>
                        <input type='text' id='project-name' placeholder='Project Name' />
                        <label>Template:</label><select value={template} onChange={(e) => setTemplate(e.target.value)}>
                            {templates && templates.map((template) => {
                                return (



                                    <option value={template.id} key={template.id}>{template.name}</option>



                                )
                            })}
                        </select>
                    </div>
                </div>
                <div className='create-project-button-container'>
                    <div className='create-project-button'
                        onClick={
                            () => {
                                create();
                            }

                        }>Create</div>
                    <div className='create-project-button' onClick={
                        () => {
                            dispatch(toggleCreateProject());
                        }
                    }>Cancel</div>
                </div>
            </div>
        </div>
    )

}
export default CreateProject
