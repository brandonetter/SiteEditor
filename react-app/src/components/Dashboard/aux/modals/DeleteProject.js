import './DeleteTemplate.css'
import { useDispatch, useSelector } from 'react-redux'
import { toggleDeleteProject } from '../../../../store/modals'
import { deleteProject } from '../../../../store/projects'
import { addToast } from '../../../../store/session'
function DeleteProject() {

    const dispatch = useDispatch();
    const deleteID = useSelector((state) => state.modals.deleteProjectID);
    return (
        <div className="delete-template">
            <div className="delete-template-content">
                <h1>Are you sure you want to delete this Project?</h1>
                <div className="delete-template-modal-buttons">
                    <div className="delete-template-modal-button" onClick={
                        async () => {
                            let res = await dispatch(deleteProject(deleteID));
                            if (res.errors) {
                                dispatch(addToast({ type: 'error', message: res.errors[0] }));
                                return;
                            }
                            dispatch(addToast({ type: 'delete', message: 'Project deleted successfully' }));
                            dispatch(toggleDeleteProject());
                        }
                    }>Yes</div>
                    <div className="delete-template-modal-button" onClick={
                        () => dispatch(toggleDeleteProject())
                    }>No</div>
                </div>
            </div>
        </div>
    )


}
export default DeleteProject
