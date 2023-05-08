import './AddImage.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddLink } from '../../../../store/modals'
import { useState } from 'react'
function AddLink() {
    const [url, setUrl] = useState('')
    const [text, setText] = useState('')
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modals);
    const addLinkFunction = useSelector((state) => state.modals.addLinkFunction);
    return (
        <div className='add-image-modal'>
            <div className='add-image-content'>
                <div className='add-image-header'>
                    <h1>Add Link</h1>
                </div>
                <div className='add-image-body'>
                    <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Link URL' />
                    <input type='text' value={text} onChange={(e) => setText(e.target.value)} placeholder='Link Text' />
                </div>
                <div className='add-image-footer'>
                    <div onClick={
                        () => dispatch(toggleAddLink())
                    }>Cancel</div>
                    <div onClick={
                        () => addLinkFunction(url, text)
                    }>Add</div>
                </div>
            </div>
        </div>
    )
}
export default AddLink
