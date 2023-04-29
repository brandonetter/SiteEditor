import React, {
    createRef,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import SplitPaneContext from "./SplitPaneContext";

const SplitPane = ({ children, ...props }) => {
    const [clientHeight, setClientHeight] = useState(null);
    const [clientWidth, setClientWidth] = useState(145);
    const yDividerPos = useRef(null);
    const xDividerPos = useRef(null);

    const onMouseHoldDown = (e) => {
        yDividerPos.current = e.clientY;
        xDividerPos.current = e.clientX;
    };

    const onMouseHoldUp = () => {
        yDividerPos.current = null;
        xDividerPos.current = null;
    };

    const onResize = (e) => {
        const height = window.innerHeight;
        const width = window.innerWidth;
        if (clientHeight > height - 200) setClientHeight(height - 200);
        if (clientWidth < 145) setClientWidth(145);
        if (clientWidth > width / 6) setClientWidth(width / 6);
        // setClientHeight(clientHeight + y - yDividerPos.current);
        // setClientWidth(clientWidth + x - xDividerPos.current);
    };


    const onMouseHoldMove = (e) => {
        if (!yDividerPos.current && !xDividerPos.current) {
            return;
        }
        let y = e.clientY;
        let x = e.clientX;

        // get the height of browser window
        const height = window.innerHeight;
        const width = window.innerWidth;

        if (e.clientY < 200) y = 200;
        if (e.clientY > height - 200) y = height - 200;
        if (e.clientX < 145) x = 145;
        if (e.clientX > width / 6) x = width / 6;
        setClientHeight(clientHeight + y - yDividerPos.current);
        setClientWidth(clientWidth + x - xDividerPos.current);

        yDividerPos.current = y;
        xDividerPos.current = x;

    };

    useEffect(() => {
        document.addEventListener("mouseup", onMouseHoldUp);
        document.addEventListener("mousemove", onMouseHoldMove);
        window.addEventListener("resize", onResize);

        return () => {
            window.removeEventListener("resize", onResize);
            document.removeEventListener("mouseup", onMouseHoldUp);
            document.removeEventListener("mousemove", onMouseHoldMove);
        };
    });

    return (
        <div {...props}>
            <SplitPaneContext.Provider
                value={{
                    clientHeight,
                    setClientHeight,
                    clientWidth,
                    setClientWidth,
                    onMouseHoldDown,
                }}
            >
                {children}
            </SplitPaneContext.Provider>
        </div>
    );
};

export const Divider = (props) => {
    const { onMouseHoldDown } = useContext(SplitPaneContext);

    return <div {...props} onMouseDown={onMouseHoldDown} />;
};

export const SplitPaneTop = (props) => {
    const topRef = createRef();
    const { clientHeight, setClientHeight } = useContext(SplitPaneContext);

    useEffect(() => {
        if (!clientHeight) {
            setClientHeight(topRef.current.clientHeight);
            return;
        }

        topRef.current.style.minHeight = clientHeight + "px";
        topRef.current.style.maxHeight = clientHeight + "px";
    }, [clientHeight]);

    return (
        <div {...props} className="split-pane-top" ref={topRef}>
            SplitPaneTop
        </div>

    );
};

export const SplitPaneBottom = (props) => {

    return (
        <div {...props} className="split-pane-bottom">
            SplitPaneBottom
        </div>
    );
};

export const SplitPaneLeft = (props) => {
    const topRef = createRef();
    const { clientWidth, setClientWidth } = useContext(SplitPaneContext);

    useEffect(() => {
        if (!clientWidth) {
            setClientWidth(topRef.current.clientWidth / 2);
            return;
        }

        topRef.current.style.minWidth = clientWidth + "px";
        topRef.current.style.maxWidth = clientWidth + "px";
    }, [clientWidth]);

    return <div {...props} className="split-pane-left" ref={topRef} />;
};

export const SplitPaneRight = (props) => {

    return (
        <div {...props} className="split-pane-right">
            <div className="quote">
                SplitPaneRight
            </div>
        </div>
    );
};

export default SplitPane;
