import './Align.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowRight, faArrowLeft, faArrowDown, faArrowsToDot } from '@fortawesome/free-solid-svg-icons'
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect } from "react";
import { Sketch } from "@uiw/react-color";
import { toggleAlign, toggleColor } from '../../../../store/modals';
function Color() {
    const dispatch = useDispatch();
    const modals = useSelector((state) => state.modals);
    const [hex, setHex] = useState('#EAEAEA');
    const prevColor = useSelector((state) => state.modals.prevColor);

    function rgbToHex(rgb) {
        let r = rgb[0];
        let g = rgb[1];
        let b = rgb[2];
        return "#" + (1 << 24 | r << 16 | g << 8 | b).toString(16).slice(1);

    }
    useEffect(() => {
        if (prevColor) {
            // if prevColor is rgb, convert to hex
            if (prevColor[0] === 'r') {
                let color = prevColor.replace('rgb(', '').replace(')', '').split(',');

                setHex(rgbToHex(color));
            } else if (prevColor[0] === '#') {
                setHex(prevColor);
            } else {
                setHex('#EAEAEA');
            }

        }
    }, [prevColor])

    console.log(prevColor);
    const alignFunc = useSelector((state) => state.modals.setColorFunction);
    return (
        <div className='align-modal'>
            <div className='align-modal-container-color'>
                <Sketch
                    color={hex}
                    onChange={(color) => {
                        setHex(color.hex);
                    }}
                />
                <div className='color-button'
                    onClick={() => {
                        dispatch(toggleColor());
                        alignFunc(hex);
                    }}
                >SET COLOR</div>
            </div>

        </div>
    )
}
export default Color;
