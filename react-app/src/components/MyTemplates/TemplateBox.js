import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinnerThird, faPencil, faTrash } from '@fortawesome/free-solid-svg-icons';
import { useDispatch } from 'react-redux';
import { toggleDeleteTemplate } from '../../store/modals';
function TemplateBox({ name, templateData, id }) {
    const dispatch = useDispatch();
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
                <p className={nameClass}>{name}</p>
                <div className="template-box-loading-icon-container">
                    <FontAwesomeIcon icon={faPencil} className="template-box-name-icon" />
                    <FontAwesomeIcon icon={faTrash} className="template-box-name-icon" onClick={
                        () => dispatch(toggleDeleteTemplate(id))
                    } />
                </div>
            </div>
        </div>
    )
}
export default TemplateBox
