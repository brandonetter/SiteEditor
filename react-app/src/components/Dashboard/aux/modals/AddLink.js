import './AddImage.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddLink } from '../../../../store/modals'
import { useState, useEffect } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
function AddLink() {
    const [url, setUrl] = useState('')
    const [text, setText] = useState('')
    const [fileList, setFileList] = useState([])
    const [showFiles, setShowFiles] = useState(false)
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modals);
    const files = useSelector((state) => state.files);
    const addLinkFunction = useSelector((state) => state.modals.addLinkFunction);

    useEffect(() => {
        console.log(files)
        setFileList(files.files)
    }, [files])
    useEffect(() => {
        if (showFiles) {
            setUrl(fileList[0].name)
        } else {
            setUrl('')
        }
    }, [showFiles])

    return (
        <div className='add-image-modal'>
            <div className='add-image-content'>
                <div className='add-image-header'>
                    <h1>Add Link</h1>
                </div>
                <div className='add-image-body'>
                    <div className='add-link-toggle'>
                        <div className='add-link-toggle-button' onClick={() => setShowFiles(!showFiles)}> <FontAwesomeIcon icon={faRotate}

                        />
                        </div>
                        {!showFiles && (
                            <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Link URL' />
                        )}
                        {showFiles && (
                            <select value={url} onChange={(e) => setUrl(e.target.value)} >
                                {fileList && fileList.map((file) => {
                                    return (
                                        <option value={file.name} key={file.id}>{file.name}</option>
                                    )
                                })}

                            </select>
                        )}
                    </div>
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Link Text' />
                </div>
                <div className='add-image-footer'>
                    <div onClick={
                        () => dispatch(toggleAddLink())
                    }>Cancel</div>
                    <div onClick={
                        () => addLinkFunction(url, text, showFiles)
                    }>Add</div>
                </div>
            </div>
        </div>
    )
}
export default AddLink
