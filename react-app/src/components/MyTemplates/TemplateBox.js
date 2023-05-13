import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faPencil, faTrash, faSave } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { updateTemplate } from '../../store/templates'
import { toggleDeleteTemplate } from '../../store/modals';
import { addToast } from '../../store/session';
function TemplateBox({ name, templateData, id }) {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [name2, setName] = useState(name);
    const nameEdit = useRef();
    const generateTemplatePreview = () => {
        if (!templateData) return;
        let templatePreview = {
            position: "relative",
            display: "grid",
            gridTemplate: templateData.template,


        };
        let divs = templateData.divs;
        let divData = '';
        for (let i = 0; i < divs.length; i++) {
            let { startColumn, endColumn, startRow, endRow, color } = divs[i];
            divData += `
           <div style="width:100%;height:100%;grid-column: ${startColumn} / span ${endColumn}; grid-row: ${startRow} / span ${endRow}; background-color: ${color};"></div>
           `

        }
        return (
            <div style={templatePreview} className="save-template-preview" dangerouslySetInnerHTML={{ __html: divData }} >

            </div >
        )

    }
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
        <div className="template-box">
            {generateTemplatePreview()}

            <div className="template-box-name">
                {editing ? <input className='template-edit' type="text" ref={nameEdit} value={name2} onChange={(e) => setName(e.target.value)} /> :
                    <p className={nameClass}>{name}</p>
                }
                <div className="template-box-loading-icon-container">
                    <FontAwesomeIcon icon={editing ? faSave : faPencil} className="template-box-name-icon"
                        onClick={async () => {
                            if (editing) {
                                // dispatch an action to update the template name
                                let res = await dispatch(updateTemplate({ id, name: name2 }));
                                if (res.errors) {
                                    dispatch(addToast({ message: res.errors[0], type: 'error' }));
                                    setEditing(false);
                                } else

                                    if (res.name == name2) {
                                        dispatch(addToast({ message: "Template name changed", type: 'update' }));
                                        setEditing(false);
                                    } else {
                                        dispatch(addToast('Something went wrong. Please try again.', 'error'));
                                    }
                            } else {
                                setEditing(true);
                                setTimeout(() => {
                                    nameEdit.current.focus();
                                }, 0);
                            }
                        }} />
                    <FontAwesomeIcon icon={faTrash} className="template-box-name-icon" onClick={
                        () => dispatch(toggleDeleteTemplate(id))
                    } />
                </div>
            </div>
        </div>
    )
}
export default TemplateBox
