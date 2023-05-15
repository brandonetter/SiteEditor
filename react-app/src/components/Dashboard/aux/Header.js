import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../store/modals';
import { useState, useEffect } from 'react';
import { toggleCreateProject } from '../../../store/modals'
import { getNextToast } from '../../../store/session'
function Header() {
    const dispatch = useDispatch();
    const [showTooltip, setShowTooltip] = useState(false);
    const [intervalID, setIntervalID] = useState(null);
    const [currentToast, setCurrentToast] = useState({});
    const modals = useSelector((state) => state.modals);
    const toasts = useSelector((state) => state.session.toasts);
    useEffect(() => {
        if (!toasts?.length) return;
        async function getToast() {
            const toast = await dispatch(getNextToast());
            setCurrentToast(toast?.[0]);
            setTimeout(() => {
                setCurrentToast(false);
            }, 2000);
        }
        getToast();
    }, [toasts])
    useEffect(() => {
        return () => {
            if (intervalID) {
                clearInterval(intervalID);
            }
        }
    }, [])

    const showHideSidebar = () => {
        dispatch(toggleSidebar());
    }
    const ttEnter = () => {
        setShowTooltip(true);
        if (intervalID) {
            clearInterval(intervalID);
        }
    }

    const ttLeave = () => {
        const id = setInterval(() => {
            setShowTooltip(false);
        }
            , 300);
        setIntervalID(id);

    }
    const Toast = ({ type, message }) => {
        return (
            <div className={`toast ${type}`}>
                {message}
            </div>
        )
    }


    return (
        <div className="dashboard-header">
            <FontAwesomeIcon icon={faBars} className="dashboard-header-icon" onClick={showHideSidebar} />
            {currentToast?.type && <Toast type={currentToast.type} message={currentToast.message} />}
            <FontAwesomeIcon icon={faPlus} className="dashboard-header-icon icon-right"
                onClick={
                    () => {
                        dispatch(toggleCreateProject());
                    }
                }

                onMouseEnter={ttEnter}
                onMouseLeave={ttLeave} />
            {showTooltip && <div className="tooltip-project" onMouseEnter={ttEnter} onMouseLeave={ttLeave}>New Project</div>}
        </div>
    )

}
export default Header
