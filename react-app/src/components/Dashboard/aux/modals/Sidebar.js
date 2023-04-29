import { useDispatch, useSelector } from 'react-redux';
import { toggleSidebar } from '../../../../store/modals';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTableColumns, faPlus, faFolder } from '@fortawesome/free-solid-svg-icons';
import './Sidebar.css';
import { Link } from 'react-router-dom';
function Sidebar({ state }) {
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modals);
    const showHideSidebar = () => {
        dispatch(toggleSidebar());
    }
    let sidebarClass = "sidebar";
    if (state) {
        sidebarClass += " sidebar sidebar-show";
    }

    return (
        <div className={sidebarClass}>
            <FontAwesomeIcon icon={faBars} className="dashboard-header-icon" onClick={showHideSidebar} />
            <div className="sidebar-content">
                <div className="sidebar-button">
                    <div className="sidebar-button-content">
                        <FontAwesomeIcon icon={faPlus} className="sidebar-button-icon" />
                        Create Project</div>
                </div>
                <div className="sidebar-button-two">
                    <div className="sidebar-button-content">
                        <FontAwesomeIcon icon={faTableColumns} className="sidebar-button-icon" />New Template</div>
                </div>
                <div className="sidebar-divider"></div>
                <Link to="/dashboard" className="sidebar-directory">

                    <FontAwesomeIcon icon={faFolder} className="sidebar-button-icon" />
                    My Projects
                </Link>

                <Link to="/dashboard/newTemplate" className="sidebar-directory">

                    <FontAwesomeIcon icon={faTableColumns} className="sidebar-button-icon" />
                    My Templates
                </Link>
            </div>
        </div>
    )
}
export default Sidebar
