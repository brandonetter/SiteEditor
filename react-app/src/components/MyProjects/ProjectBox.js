import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom'
import { useState } from 'react';
import { toggleDeleteProject } from '../../store/modals';
function TemplateBox({ name, templateData, id }) {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    // cut off the template name if it's too long
    let nameClass = 'name-big';
    switch (true) {
        case (name.length > 10 && name.length <= 15):
            nameClass = 'name-medium';
            break;
        case (name.length > 15):
            nameClass = 'name-small';
            break;
        default:
            break;
    }


    if (name.length > 15) {
        name = name.slice(0, 15) + '...';
    }

    return (
        <div className="project-box">

            <div className="template-box-name">
                <p className={nameClass}>{name}</p>
                {redirect && <Redirect to={`./projects/${id}`} />}
                <div className="template-box-loading-icon-container">
                    <FontAwesomeIcon icon={faPencil} className="template-box-name-icon" onClick={
                        () => {
                            setRedirect(true);
                        }

                    }
                    />
                    <FontAwesomeIcon icon={faTrash} className="template-box-name-icon" onClick={
                        () => dispatch(toggleDeleteProject(id))
                    } />
                </div>
            </div>
        </div>
    )
}
export default TemplateBox
