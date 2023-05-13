import './CreateProject.css'
import { useDispatch } from 'react-redux'
import { toggleCreateProject } from '../../../../store/modals'
import { createProject, getProjects } from '../../../../store/projects'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import { useState, useEffect } from 'react';
import { getTemplates } from '../../../../store/templates'
import { addToast } from '../../../../store/session'
function CreateProject() {
    const [blur, setBlur] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        async function fetchData() {

            let t = await dispatch(getTemplates())
            if (t.templates.length === 0) {
                // dispatch(toggleCreateProject());
                setBlur(true);
                return;

            }
            setTemplate(t.templates[0].id);
            setTemplates(t.templates);
        }
        fetchData()

    }, [dispatch])
    const [templates, setTemplates] = useState([]);
    const [template, setTemplate] = useState('default');

    const create = async () => {
        let projectName = document.getElementById('project-name').value;
        console.log(projectName);
        let res = await dispatch(createProject(projectName, template));
        if (res.errors) {
            dispatch(addToast({ type: 'error', message: res.errors[0] }));
            return;
        }
        dispatch(addToast({ type: 'save', message: 'Project created successfully' }));
        dispatch(getProjects());
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
                {blur && <div className='warning'>You need to create a Template First!</div>}
                <div className={blur ? 'blurred' : ''}>
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
                        </div></div>
                </div>
            </div>
        </div>
    )

}
export default CreateProject
