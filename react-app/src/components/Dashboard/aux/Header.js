import './Header.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faPlus } from '@fortawesome/free-solid-svg-icons';
import { useSelector, useDispatch } from 'react-redux';
import { toggleSidebar } from '../../../store/modals';
import { useState, useEffect } from 'react';
function Header() {
    const dispatch = useDispatch();
    const [showTooltip, setShowTooltip] = useState(false);
    const [intervalID, setIntervalID] = useState(null);
    const modals = useSelector((state) => state.modals);
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
            console.log("clear");
            clearInterval(intervalID);
        }
        console.log("enter");
    }

    const ttLeave = () => {
        const id = setInterval(() => {
            setShowTooltip(false);
        }
            , 300);
        setIntervalID(id);

    }

    return (
        <div className="dashboard-header">
            <FontAwesomeIcon icon={faBars} className="dashboard-header-icon" onClick={showHideSidebar} />
            <FontAwesomeIcon icon={faPlus} className="dashboard-header-icon icon-right"
                onMouseEnter={ttEnter}
                onMouseLeave={ttLeave} />
            {showTooltip && <div className="tooltip-project" onMouseEnter={ttEnter} onMouseLeave={ttLeave}>New Project</div>}
        </div>
    )

}
export default Header
