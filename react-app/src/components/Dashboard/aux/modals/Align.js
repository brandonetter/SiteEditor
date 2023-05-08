import './Align.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faArrowsToDot } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
function Align() {
    const modals = useSelector((state) => state.modals);
    const alignFunc = useSelector((state) => state.modals.alignFunction);
    return (
        <div className='align-modal'>
            <div className='align-modal-container'>
                <FontAwesomeIcon icon={faArrowUp} className='align-up-left' onClick={
                    () =>
                        alignFunc('up-left')
                }
                />
                <FontAwesomeIcon icon={faArrowUp} className='align-up' onClick={
                    () =>
                        alignFunc('up')
                }
                />
                <FontAwesomeIcon icon={faArrowUp} className='align-up-right' onClick={
                    () =>
                        alignFunc('up-right')
                }
                />
                <FontAwesomeIcon icon={faArrowLeft} className='align-left' onClick={
                    () =>
                        alignFunc('left')
                }
                />
                <FontAwesomeIcon icon={faArrowsToDot} className='align-center' onClick={
                    () =>
                        alignFunc('center')
                }
                />
                <FontAwesomeIcon icon={faArrowRight} className='align-right' onClick={
                    () =>

                        alignFunc('right')
                }
                />
                <FontAwesomeIcon icon={faArrowUp} className='align-down-left' onClick={
                    () =>
                        alignFunc('down-left')
                }
                />
                <FontAwesomeIcon icon={faArrowDown} className='align-down' onClick={
                    () =>
                        alignFunc('down')
                }
                />
                <FontAwesomeIcon icon={faArrowUp} className='align-down-right' onClick={
                    () =>

                        alignFunc('down-right')
                }
                />
                <div className='align-remove' onClick={
                    () =>

                        alignFunc('remove')
                }>Remove Alignment</div>


            </div>

        </div>
    )
}
export default Align;
