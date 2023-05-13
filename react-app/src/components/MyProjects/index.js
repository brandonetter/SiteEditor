import { getProjects } from '../../store/projects';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TemplateBox from './ProjectBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './MyTemplates.css';
function MyTemplates() {
    const dispatch = useDispatch();
    const [templates, setTemplates] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [displayClass, setDisplayClass] = useState('my-templates');
    const templatesState = useSelector((state) => state.projects.projects);
    useEffect(() => {
        async function get() {
            let templatess = await dispatch(getProjects());
            //setTemplates(templatess.templates);
        }

        get();
    }, [])
    useEffect(() => {
        console.log(templatesState);
        if (!templatesState) return;
        setTimeout(() => setLoaded(true), 600);
        if (templatesState.projects)
            setTemplates(templatesState.projects);
        else
            setTemplates(templatesState);
    }, [templatesState])
    useEffect(() => {
        if (loaded) {
            setDisplayClass('my-templates my-templates-show');
        }
        console.log(templates);
    }, [loaded])

    return (
        <div>

            <div className={displayClass}>

                {loaded && templates.map && templates.map((template) => {

                    return (
                        <TemplateBox name={template.name} key={template.id} id={template.id} />
                    )
                })}
            </div>
            {!loaded && <>
                <div className='my-templates my-templates-show'>
                    <div className='loading-icon-container'>
                        <FontAwesomeIcon icon={faSpinner} className="template-box-loading-icon-2" />
                    </div>
                </div>
            </>
            }

        </div>
    )
}
export default MyTemplates
