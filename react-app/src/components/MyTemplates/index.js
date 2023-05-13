import { getTemplates } from '../../store/templates';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import TemplateBox from './TemplateBox';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import './MyTemplates.css';
function MyTemplates() {
    const dispatch = useDispatch();
    const [templates, setTemplates] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [displayClass, setDisplayClass] = useState('my-templates');
    const templatesState = useSelector((state) => state.shared.templates);
    useEffect(() => {
        async function get() {
            let templatess = await dispatch(getTemplates());
            //setTemplates(templatess.templates);
        }

        get();
    }, [])
    useEffect(() => {
        console.log(templatesState);
        if (!templatesState) return;
        setTimeout(() => setLoaded(true), 600);
        if (templatesState.templates)
            setTemplates(templatesState.templates);
        else
            setTemplates(templatesState);
    }, [templatesState])
    useEffect(() => {
        if (loaded) {
            setDisplayClass('my-templates my-templates-show');
        }
    }, [loaded])

    return (
        <div>

            <div className={displayClass}>

                {loaded && templates.map((template) => {
                    // remove double single quotes
                    template.content = template.content.replace(/''/g, "'");
                    // replace single quotes with double quotes
                    template.content = template.content.replace(/'/g, '"');
                    let content = JSON.parse(template.content);

                    return (
                        <TemplateBox name={template.name} templateData={content} id={template.id} key={template.id} />
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
