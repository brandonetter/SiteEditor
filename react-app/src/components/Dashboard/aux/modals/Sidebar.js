import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../../store/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTableColumns, faPlus, faFolder, faSave, faRemove, faUser } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';
import { Route, Switch } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
import FileView from '../../../FileView';
import { toggleTemplateSave, toggleCreateProject, toggleUser } from '../../../../store/modals';
function Sidebar({ state }) {
    const dispatch = useDispatch();
    const history = useHistory();
    const modals = useSelector((state) => state.modals);
    const template = useSelector((state) => state.shared.template);
    const showHideSidebar = () => {
        dispatch(toggleSidebar());
    }
    const showHideUserBar = () => {
        dispatch(toggleUser());
    }

    let sidebarClass = "sidebar";
    if (state) {
        sidebarClass += " sidebar sidebar-show";
    }

    return (
        <div className={sidebarClass}>
            <div className="sidebar-header">
                <FontAwesomeIcon icon={faBars} className="dashboard-header-icon" onClick={showHideSidebar} />
                <div className=''>
                    <FontAwesomeIcon icon={faUser} className="dashboard-header-icon sidebar-user"
                        onClick={showHideUserBar}
                    />

                </div>
            </div>
            <div className="sidebar-content">
                <div className="sidebar-button" onClick={
                    () => {
                        dispatch(toggleCreateProject());
                    }
                }>
                    <div className="sidebar-button-content">
                        <FontAwesomeIcon icon={faPlus} className="sidebar-button-icon" />
                        Create Project</div>
                </div>
                <Link to="/dashboard/newTemplate" className='hide-defaults'>
                    <div className="sidebar-button-two">

                        <div className="sidebar-button-content">

                            <FontAwesomeIcon icon={faTableColumns} className="sidebar-button-icon" />New Template</div> </div>
                </Link>

                <div className="sidebar-divider"></div>
                <Link to="/dashboard/myProjects" className="sidebar-directory">

                    <FontAwesomeIcon icon={faFolder} className="sidebar-button-icon" />
                    My Projects
                </Link>


                <Link to="/dashboard/myTemplates" className="sidebar-directory">
                    <FontAwesomeIcon icon={faTableColumns} className="sidebar-button-icon" />
                    My Templates
                </Link>

                <Switch>
                    <Route path="/dashboard/newTemplate">
                        <div className="sidebar-end"></div>
                        <div className="sidebar-divider"></div>
                        <div className="sidebar-button" onClick={
                            () => {
                                dispatch(toggleTemplateSave());
                            }
                        }>
                            <div className="sidebar-button-content">
                                <FontAwesomeIcon icon={faSave} className="sidebar-button-icon" />
                                Save Template</div>
                        </div>

                        <div className="sidebar-button red" onClick={
                            () => {

                                // console.log("template", template);
                                window.location.reload();
                            }
                        }>
                            <div className="sidebar-button-content">
                                <FontAwesomeIcon icon={faRemove} className="sidebar-button-icon" />
                                Reset Template</div>
                        </div>



                    </Route>
                    <Route path="/dashboard/projects/:id" component={FileView} />



                </Switch>
            </div >
        </div >
    )
}
export default Sidebar
