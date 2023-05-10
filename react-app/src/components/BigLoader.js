import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
function BigLoader() {
    return (
        <div className="big-loader">
            <div className="big-loader-content">
                <div className="big-loader-spinner">
                    <FontAwesomeIcon icon={faSpinner} className="big-loader-icon" />
                </div>
            </div>
        </div>
    )
}
export default BigLoader
