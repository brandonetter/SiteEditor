import './User.css';
import { useDispatch, useSelector } from 'react-redux'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faUserAltSlash } from '@fortawesome/free-solid-svg-icons'
import { logout } from '../../../../store/session'
import { toggleBigLoader } from '../../../../store/modals'
import { Redirect } from 'react-router-dom'
import { useState } from 'react';
function User() {
    const dispatch = useDispatch();
    const [redirect, setRedirect] = useState(false);
    const user = useSelector((state) => state.session.user);
    return (
        <div className='user-modal'>
            {redirect && <Redirect to='/' />}
            <div className="user-modal-content">
                <div className='user-modal-header'>
                    {user.username}<br />
                    <div className='email'>{user.email}</div>
                </div>
                <div className='user-modal-buttons'>
                    <div className='sidebar-button user-modal-button'
                        onClick={
                            () => {
                                dispatch(toggleBigLoader());
                                setTimeout(() => {
                                    setRedirect(true);
                                    dispatch(logout());
                                    setTimeout(() => {
                                        dispatch(toggleBigLoader());
                                    }
                                        , 500);
                                }, 50);
                            }
                        }>
                        <FontAwesomeIcon icon={faUserAltSlash} className="sidebar-button-icon" />

                        Logout
                    </div>
                </div>
            </div>
        </div>
    )

}
export default User
