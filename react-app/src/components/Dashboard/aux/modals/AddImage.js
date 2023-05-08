import './AddImage.css'
import { useSelector, useDispatch } from 'react-redux'
import { toggleAddImage } from '../../../../store/modals'
import { useState } from 'react'
function AddImage() {
    const [url, setUrl] = useState('')
    const [height, setHeight] = useState('')
    const [float, setFloat] = useState('')
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modals);
    const addImageFunction = useSelector((state) => state.modals.addImageFunction);
    return (
        <div className='add-image-modal'>
            <div className='add-image-content'>
                <div className='add-image-header'>
                    <h1>Add Image</h1>
                </div>
                <div className='add-image-body'>
                    <input type='text' value={url} onChange={(e) => setUrl(e.target.value)} placeholder='Image URL' />
                    <input type='number' value={height} onChange={(e) => setHeight(e.target.value)} placeholder='Snap To Height?' step='10' />
                    <select value={float} onChange={(e) => setFloat(e.target.value)}>
                        <option value=''>None</option>
                        <option value='left'>Left</option>
                        <option value='right'>Right</option>
                    </select>
                </div>
                <div className='add-image-footer'>
                    <div onClick={
                        () => dispatch(toggleAddImage())
                    }>Cancel</div>
                    <div onClick={
                        () => addImageFunction(url, height, float)
                    }>Add</div>
                </div>
            </div>
        </div>
    )
}
export default AddImage
