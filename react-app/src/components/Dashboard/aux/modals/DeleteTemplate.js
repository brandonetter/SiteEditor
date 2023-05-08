import './DeleteTemplate.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeleteTemplate } from '../../../../store/modals'
import { deleteTemplate } from '../../../../store/templates'
import { addToast } from '../../../../store/session'
function DeleteTemplate() {

    const dispatch = useDispatch();
    const deleteID = useSelector((state) => state.modals.deleteID);
    return (
        <div className="delete-template">
            <div className="delete-template-content">
                <h1>Are you sure you want to delete this template?</h1>
                <div className="delete-template-modal-buttons">
                    <div className="delete-template-modal-button" onClick={
                        async () => {
                            let res = await dispatch(deleteTemplate(deleteID));
                            if (res.errors) {
                                dispatch(addToast({ type: 'error', message: res.errors[0] }));
                                return;
                            }
                            dispatch(addToast({ type: 'delete', message: 'Template deleted successfully' }));
                            dispatch(toggleDeleteTemplate());
                        }
                    }>Yes</div>
                    <div className="delete-template-modal-button" onClick={
                        () => dispatch(toggleDeleteTemplate())
                    }>No</div>
                </div>
            </div>
        </div>
    )


}
export default DeleteTemplate
