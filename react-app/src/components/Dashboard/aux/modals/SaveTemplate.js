import './SaveTemplate.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTableColumns, faPlus, faFolder, faSave, faX } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import { toggleTemplateSave } from '../../../../store/modals';
import { saveTemplate } from '../../../../store/templates';
import { useState } from 'react';
function SaveTemplate() {
    const dispatch = useDispatch();
    const template = useSelector((state) => state.shared.template);
    const [name, setname] = useState('');
    const trySaveTemplate = () => {
        if (!name || !template) return;
        let { gridTemplate, divs } = template;
        let templateData = {
            name: name,
            gridTemplate: gridTemplate,
            divs: divs
        }
        dispatch(saveTemplate(templateData));
    }

    const generateTemplatePreview = () => {
        if (!template) return;
        let { gridTemplate, divs } = template;
        let templatePreview = {
            position: "relative",
            display: "grid",
            gridTemplate: gridTemplate,


        };
        let divData = '';
        for (let i = 0; i < divs.length; i++) {
            let { startColumn, endColumn, startRow, endRow, color } = divs[i];
            divData += `
           <div style="width:100%;height:100%;grid-column: ${startColumn} / span ${endColumn}; grid-row: ${startRow} / span ${endRow}; background-color: ${color};"></div>
           `

        }
        divData += `<div class="save-template-preview-end">PREVIEW</div>`
        return (
            <div style={templatePreview} className="save-template-preview" dangerouslySetInnerHTML={{ __html: divData }} >

            </div >
        )

    }
    return (
        <div className="save-template">
            <div className="save-template-content">
                <div className="x-button" onClick={
                    () => {
                        dispatch(toggleTemplateSave());
                    }

                }>
                    <FontAwesomeIcon icon={faX} className="x-button-icon" />
                </div>
                {generateTemplatePreview()
                }
                <div className="save-template-form">
                    <input type="text" className="save-template-input" placeholder="Template Name" value={name} onChange={
                        (e) => {
                            setname(e.target.value);
                        }

                    } />
                    <div className="save-template-button" onClick={trySaveTemplate}>Save</div>
                </div>
            </div>
        </div>
    )
}
export default SaveTemplate
