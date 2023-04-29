
import { fabric } from 'fabric';
import { useEffect, useState, useRef } from 'react';
import './templateMaker.css';
import { useSelector } from 'react-redux';
import knifeIcon from './knife.png';
import dottedSquare from './dottedSquare.png';
import trash from './trashIcon.png';
import preview from './preview.png';
function TemplateMaker() {
    const [canvas, setCanvas] = useState(null);
    const [borderRect, setBorderRect] = useState(null);
    const [mainRect, setMainRect] = useState(null);
    const [toolRect, setToolRect] = useState(null);
    const [rulerRect, setRulerRect] = useState(null);
    const [resizeTimeout, setResizeTimeout] = useState(0);
    const [rulerLines, setRulerLines] = useState([]);
    const [verticalRulerRect, setVerticalRuler] = useState(null);
    const [slicerEnabled, setSlicerEnabled] = useState(false);
    const [divEnabled, setDivEnabled] = useState(false);
    const [userVerticalLines, setUserVerticalLines] = useState([]);
    const [userHorizontalLines, setUserHorizontalLines] = useState([]);
    const modal = useSelector(state => state.modals.sidebar);
    const container = useRef(null);
    let resizeTT = null;

    const generateRandomPastelColor = () => {
        let r = (Math.round(Math.random() * 127) + 127).toString(16);
        let g = (Math.round(Math.random() * 127) + 127).toString(16);
        let b = (Math.round(Math.random() * 127) + 127).toString(16);
        return '#' + r + g + b + 'BE';
    }

    const canvasInit = () => {
        // get current canvas state
        let newCanvas;
        if (!canvas) {
            newCanvas = new fabric.Canvas('canvas');

        } else {
            newCanvas = canvas;
            // newCanvas.remove(borderRect);
            // newCanvas.remove(mainRect);
            // newCanvas.remove(toolRect);
            // newCanvas.remove(rulerRect);
            // newCanvas.remove(verticalRulerRect);
            // for (let i = 0; i < rulerLines.length; i++) {
            //     newCanvas.remove(rulerLines[i]);
            // }
            newCanvas.clear();


        }
        const width = container.current.clientWidth - 25;
        const height = container.current.clientHeight - 25;
        newCanvas.setHeight(height);
        newCanvas.setWidth(width);
        let rect = new fabric.Rect({
            width: width - 5,
            height: height - 5,
            left: 0,
            top: 0,
            stroke: '#1C233310',
            strokeWidth: 5,
            fill: 'transparent',
            selectable: false,
            evented: false
        });
        let mainWindow = new fabric.Rect({
            width: width * 0.75,
            height: width * 0.75 * (9 / 16),
            left: width * 0.20,
            top: height * 0.025 + 5,
            stroke: '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            selectable: false,
            evented: true,
            subTargetCheck: true,
            verticalLines: [],
            horizontalLines: [],
            divList: [],
        });


        // Redraw user lines
        //
        //
        //
        for (let i = 0; i < userVerticalLines.length; i++) {
            // draw a line at the x coordinate


            let vertX = (userVerticalLines[i]) * mainWindow.width + mainWindow.left;

            let line = new fabric.Line([vertX, mainWindow.top, vertX, mainWindow.height + mainWindow.top], {
                stroke: '#000000AA',
                strokeWidth: 2,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(line);
            mainWindow.verticalLines = [...mainWindow.verticalLines, userVerticalLines[i]];
        }
        for (let i = 0; i < userHorizontalLines.length; i++) {
            let horizY = (userHorizontalLines[i]) * mainWindow.height + mainWindow.top;
            let line = new fabric.Line([mainWindow.left, horizY, mainWindow.width + mainWindow.left, horizY], {
                stroke: '#000000AA',
                strokeWidth: 2,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(line);
            mainWindow.horizontalLines = [...mainWindow.horizontalLines, userHorizontalLines[i]];
        }
        let r = new fabric.Rect({
            width: 120,
            height: 340,
            left: width * 0.025,
            top: height * 0.025,
            stroke: '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            selectable: true,
            evented: false,

        });
        //slicer button
        let b1 = new fabric.Rect({
            width: r.width - 20,
            height: 100,
            left: r.left + 10,
            top: r.top + 10,
            stroke: slicerEnabled ? '#FFFFFF99' : '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            selectable: false,
            evented: true,
            hoverCursor: 'pointer',
            enabled: slicerEnabled,
        })
        let b2 = new fabric.Rect({
            width: r.width - 20,
            height: 100,
            left: r.left + 10,
            top: r.top + 120,
            stroke: divEnabled ? '#FFFFFF99' : '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            selectable: false,
            evented: true,
            hoverCursor: 'pointer',
            enabled: divEnabled,
        })
        let b3 = new fabric.Rect({
            width: r.width - 20,
            height: 100,
            left: r.left + 10,
            top: r.top + 230,
            stroke: '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            selectable: false,
            evented: true,
            hoverCursor: 'pointer',
            enabled: false,
        })
        let b4 = new fabric.Rect({
            width: r.width - 20,
            height: 100,
            left: r.left + 10,
            top: mainWindow.top + mainWindow.height - 100,
            stroke: '#1C233399',
            strokeWidth: 2,
            fill: '#1C233333',
            // rounded corners
            rx: 10,
            ry: 10,
            selectable: false,
            evented: true,
            hoverCursor: 'pointer',
            enabled: false,
        })

        b3.on('mousedown', () => {
            if (b3.target) {
                mainWindow.divList = mainWindow.divList.filter((e) => e.id !== b3.target.id);
                newCanvas.remove(b3.target);
                b3.target = null;
                b3.set('fill', '#1C233333');
                newCanvas.renderAll();
            }
        });

        let toolBarGroup = new fabric.Group([
            r, b1, b2, b3, b4
        ], {
            subTargetCheck: true,
            selectable: false,
            hoverCursor: 'default',
        }
        );
        let knife = new fabric.Image.fromURL(knifeIcon, function (img) {
            img.set({
                left: toolBarGroup.left + 20,
                top: toolBarGroup.top + 20,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(img);
        });
        let div = new fabric.Image.fromURL(dottedSquare, function (img) {
            img.set({
                left: toolBarGroup.left + 20,
                top: toolBarGroup.top + 130,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(img);
        });
        let trashIcon = new fabric.Image.fromURL(trash, function (img) {
            img.set({
                left: toolBarGroup.left + 20,
                top: toolBarGroup.top + 240,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(img);
        });

        let previewIcon = new fabric.Image.fromURL(preview, function (img) {
            img.set({
                left: toolBarGroup.left + 20,
                top: mainWindow.top + mainWindow.height - 90,
                selectable: false,
                evented: false,
                hoverCursor: 'default',
            });
            newCanvas.add(img);
        });


        b4.on('mousedown', () => {
            // convert horizontal and vertical lines to percentages
            let horizontalLines = [...mainWindow.horizontalLines]
            let verticalLines = [...mainWindow.verticalLines]

            // sort the lines from smallest to largest
            horizontalLines.sort((a, b) => a - b);
            verticalLines.sort((a, b) => a - b);

            // get the width and height of the main window in percentages
            // generate css grid template columns and rows using fr
            let templateColumns = '';
            let templateRows = '';
            let lastColumn = 0;
            let lastRow = 0;
            for (let i = 0; i < verticalLines.length; i++) {
                verticalLines[i] = verticalLines[i] - lastColumn;
                lastColumn += verticalLines[i];
                templateColumns += verticalLines[i] * 100 + 'fr ';

            }
            for (let i = 0; i < horizontalLines.length; i++) {
                horizontalLines[i] = horizontalLines[i] - lastRow;
                lastRow += horizontalLines[i];
                templateRows += horizontalLines[i] * 100 + 'fr ';
            }
            templateColumns += (1 - lastColumn) * 100 + 'fr';
            templateRows += (1 - lastRow) * 100 + 'fr';

            // generate the CSS grid template
            let gridTemplate = templateRows + '/' + templateColumns;

            // open a new window with the preview of the CSS
            let previewWindow = window.open('', 'preview', `width=${1600 / 2.2},height=${900 / 2.2}`);
            previewWindow.document.write(`
            <html>
            <head>
            <style>
            body{
                margin: 0;
                padding: 0;
            }
            .container {
                display: grid;
                grid-template: ${gridTemplate};
                width: 100vw;
                height: 100vh;
            }
            .container > div {
                background-color: #eee;
                border: 1px solid #000;
            }

            </style>
            </head>
            <body>
            <div class="container">
            `);
            // generate the divs for the preview
            for (let i = 0; i < mainWindow.divList.length; i++) {
                horizontalLines = [...mainWindow.horizontalLines]
                verticalLines = [...mainWindow.verticalLines]
                let div = mainWindow.divList[i];
                // convert the div's dimensions to row and column spans
                let left = div.left - mainWindow.left;
                left = left / mainWindow.width;
                //parse the left value to a 2 decimal float
                left = parseFloat(left.toFixed(4));
                let top = div.top - mainWindow.top;
                top = top / mainWindow.height;
                top = parseFloat(top.toFixed(4));
                let width = div.width;
                width = width / mainWindow.width;
                let height = div.height;
                height = height / mainWindow.height;
                width = parseFloat(width.toFixed(4));
                height = parseFloat(height.toFixed(4));
                let columnStart = 1;
                let columnEnd = 1;
                let rowStart = 1;
                let rowEnd = 1;
                verticalLines = verticalLines.map((e) => parseFloat(e.toFixed(4)));
                horizontalLines = horizontalLines.map((e) => parseFloat(e.toFixed(4)));

                for (let j = 0; j < verticalLines.length; j++) {
                    if (left + width >= 1) {
                        columnEnd = verticalLines.length + 2;
                    }

                    if (verticalLines[j] <= left) {
                        columnStart++;
                    }
                    if (verticalLines[j] <= left + width) {
                        columnEnd++;
                    }
                }
                for (let j = 0; j < horizontalLines.length; j++) {
                    console.log(horizontalLines, top, top + height);
                    if (top + height >= 1) {
                        rowEnd = horizontalLines.length + 2;

                    }
                    if (horizontalLines[j] <= top) {
                        rowStart++;
                    }
                    if (horizontalLines[j] <= top + height) {
                        rowEnd++;
                    }
                }
                let span = columnEnd - columnStart;
                if (span <= 0) {
                    span = 1;
                }
                let spanRow = rowEnd - rowStart;
                if (spanRow <= 0) {
                    spanRow = 1;
                }

                previewWindow.document.write(`
                <div style="grid-column: ${columnStart} / span ${span}; grid-row: ${rowStart} / span ${spanRow}; background-color: ${div.color};"></div>
                `);

            }
            previewWindow.document.write(`
            </div>
            </body>
            </html>
            `);
            previewWindow.document.close();


        });

        toolBarGroup.lockRotation = true;
        toolBarGroup.setControlsVisibility({
            mtr: false,
            ml: false,
            mr: false,
            mt: false,
            mb: false,
        });
        b1.on('mousedown', () => {
            b1.enabled = !b1.enabled;
            b1.enabled && (b2.enabled = false)
            b1.enabled && (setDivEnabled(false));
            if (!b2.enabled) {
                b2.set('stroke', '#1C233333');
            }

            setSlicerEnabled(b1.enabled);
            if (b1.enabled) {
                b1.set('stroke', '#FFFFFF99');
            } else {
                b1.set('stroke', '#1C233333');
            }
            newCanvas.renderAll();

        });

        b1.on('mouseover', function (e) {
            b1.set('fill', '#1C2333');

            newCanvas.renderAll();
        });
        b1.on('mouseout', function (e) {
            b1.set('fill', '#1C233333');
            newCanvas.renderAll();
        });

        b2.on('mousedown', () => {
            b2.enabled = !b2.enabled;
            b2.enabled && (b1.enabled = false)
            b2.enabled && (setSlicerEnabled(false));
            if (!b1.enabled) {
                b1.set('stroke', '#1C233333');
            }
            setDivEnabled(b2.enabled);
            if (b2.enabled) {
                b2.set('stroke', '#FFFFFF99');
            } else {
                b2.set('stroke', '#1C233333');
            }
            newCanvas.renderAll();

        });

        b2.on('mouseover', function (e) {
            b2.set('fill', '#1C2333');

            newCanvas.renderAll();
        });
        b2.on('mouseout', function (e) {
            b2.set('fill', '#1C233333');
            newCanvas.renderAll();
        });

        let rulerColor = '#232c40';
        let ruler = new fabric.Rect({
            width: width * 0.75,
            height: 15,
            left: mainWindow.left,
            top: mainWindow.top - 20,
            stroke: '#00000010',
            strokeWidth: 2,
            fill: rulerColor,
            selectable: false,
            evented: true,
            hoverCursor: 'crosshair',
            strokeDashArray: [8, 8]
        })
        let verticalRuler = new fabric.Rect({
            width: 15,
            height: mainWindow.height,
            left: mainWindow.width + mainWindow.left + 5,
            top: mainWindow.top,
            stroke: '#00000010',
            strokeWidth: 2,
            fill: rulerColor,
            hoverCursor: 'crosshair',
            selectable: false,
            evented: true,
            strokeDashArray: [8, 8]
        })
        ruler.on('mouseover', function (e) {
            if (b1.enabled) {
                ruler.set('fill', '#FFF3');
            } else {
                ruler.set('fill', '#232c40');
            }

            newCanvas.renderAll();
        });


        ruler.on('mouseout', function (e) {
            ruler.set('fill', rulerColor);
            newCanvas.renderAll();
        });
        ruler.on('mousedown', function (e) {
            if (b1.enabled) {
                let line = new fabric.Line([e.pointer.x, mainWindow.top, e.pointer.x, mainWindow.height + mainWindow.top], {
                    stroke: '#000000AA',
                    strokeWidth: 2,
                    selectable: false,
                    evented: false,

                });
                let pos = line.left - mainWindow.left;
                pos = pos / mainWindow.width;
                setUserVerticalLines((e) => [...e, pos]);
                mainWindow.verticalLines = [...mainWindow.verticalLines, pos];
                newCanvas.add(line);
            }
        });
        verticalRuler.on('mouseover', function (e) {
            if (b1.enabled) {
                verticalRuler.set('fill', '#FFF3');
            } else {
                verticalRuler.set('fill', '#232c40');
            }

            newCanvas.renderAll();
        });
        verticalRuler.on('mouseout', function (e) {
            verticalRuler.set('fill', rulerColor);
            newCanvas.renderAll();
        });
        verticalRuler.on('mousedown', function (e) {
            if (b1.enabled) {
                let line = new fabric.Line([mainWindow.left, e.pointer.y, mainWindow.width + mainWindow.left, e.pointer.y], {
                    stroke: '#000000AA',
                    strokeWidth: 2,
                    selectable: false,
                    evented: false,

                });
                let pos = line.top - mainWindow.top;
                pos = pos / mainWindow.height;
                setUserHorizontalLines((e) => [...e, pos]);
                mainWindow.horizontalLines = [...mainWindow.horizontalLines, pos];
                newCanvas.add(line);
            }
        });


        newCanvas.add(verticalRuler);
        newCanvas.add(ruler);
        // across the length of the ruler, draw 10 lines
        for (let i = 1; i < 20; i++) {
            let line = new fabric.Line([ruler.left + (ruler.width / 20) * i, ruler.top + 2, ruler.left + (ruler.width / 20) * i, ruler.top + 8], {
                stroke: '#000000AA',
                strokeWidth: 2,
                selectable: false,
                evented: false,

            });
            setRulerLines((e) => [...e, line]);
            newCanvas.add(line);
        }
        for (let i = 1; i < 20; i++) {
            let line = new fabric.Line([verticalRuler.left + 10, verticalRuler.top + (verticalRuler.height / 20) * i, verticalRuler.left + verticalRuler.width, verticalRuler.top + (verticalRuler.height / 20) * i], {
                stroke: '#000000AA',
                strokeWidth: 2,
                selectable: false,
                evented: false,

            });
            setRulerLines((e) => [...e, line]);
            newCanvas.add(line);
        }
        let selectedBox = new fabric.Rect({
            width: 0,
            height: 0,
            left: mainWindow.left + (mainWindow.width / 2) - (mainWindow.width / 20),
            top: mainWindow.top + (mainWindow.height / 2) - (mainWindow.height / 20),
            stroke: '#000000AA',
            strokeWidth: 2,
            fill: '#EAEAEA14',
            selectable: true,
            evented: true,

            hoverCursor: 'default',

        });
        newCanvas.on('mouse:down', function (e) {
            console.log(e);
            if (e.target) {
                console.log(e.target);
            }
        });


        mainWindow.on('mousemove', function (e) {
            let x = e.e.layerX;
            let y = e.e.layerY;
            // if the browser is chrome, use offsetX and offsetY
            if (e.e.offsetX) {
                x = e.e.offsetX;
                y = e.e.offsetY;
            }
            if (b2.enabled) {
                let xIn = x - mainWindow.left;
                let yIn = y - mainWindow.top;
                // convert xIn and yIn to percentages
                xIn = xIn / mainWindow.width;
                yIn = yIn / mainWindow.height;
                let closestVert = 0;
                let nextVert = 1;
                for (let i = 0; i < mainWindow.verticalLines.length; i++) {
                    // sort the vertical lines from smallest to largest
                    mainWindow.verticalLines.sort((a, b) => a - b);

                    if (mainWindow.verticalLines[i] < xIn) {
                        if (mainWindow.verticalLines[i] >= closestVert)
                            closestVert = mainWindow.verticalLines[i];
                    } else
                        if (mainWindow.verticalLines[i] > xIn) {
                            if (mainWindow.verticalLines[i] <= nextVert)
                                nextVert = mainWindow.verticalLines[i];
                        }
                }

                let closestHor = 0;
                let nextHor = 1;
                for (let i = 0; i < mainWindow.horizontalLines.length; i++) {
                    if (mainWindow.horizontalLines[i] < yIn) {
                        if (mainWindow.horizontalLines[i] >= closestHor)
                            closestHor = mainWindow.horizontalLines[i];
                    }
                    if (mainWindow.horizontalLines[i] > yIn) {
                        if (mainWindow.horizontalLines[i] <= nextHor)
                            nextHor = mainWindow.horizontalLines[i];
                    }

                }

                // convert back to pixels
                closestVert = closestVert * mainWindow.width + mainWindow.left;
                nextVert = nextVert * mainWindow.width + mainWindow.left;
                closestHor = closestHor * mainWindow.height + mainWindow.top;
                nextHor = nextHor * mainWindow.height + mainWindow.top;
                // set selected box to the closest vertical and horizontal lines
                selectedBox.set({
                    left: closestVert,
                    top: closestHor,
                    width: nextVert - closestVert,
                    height: nextHor - closestHor,
                    evented: true,
                });

                if (b2.startDimensions) {
                    let newLeft = Math.min(b2.startDimensions.left, selectedBox.left);
                    let newTop = Math.min(b2.startDimensions.top, selectedBox.top);
                    let newWidth = Math.max(b2.startDimensions.left + b2.startDimensions.width, selectedBox.left + selectedBox.width) - newLeft;
                    let newHeight = Math.max(b2.startDimensions.top + b2.startDimensions.height, selectedBox.top + selectedBox.height) - newTop;
                    selectedBox.set({
                        left: newLeft,
                        top: newTop,
                        width: newWidth,
                        height: newHeight,


                    });
                }


                selectedBox.bringToFront();
                newCanvas.renderAll();
            }
        });
        mainWindow.on('mousedown', function (e) {
            if (b2.enabled) {
                b2.startDimensions = {
                    left: selectedBox.left,
                    top: selectedBox.top,
                    width: selectedBox.width,
                    height: selectedBox.height,

                }
            }
        });

        mainWindow.on('mouseup', function (e) {
            let x = e.e.layerX;
            let y = e.e.layerY;
            // if the browser is chrome, use offsetX and offsetY
            if (e.e.offsetX) {
                x = e.e.offsetX;
                y = e.e.offsetY;
            }
            if (b2.enabled) {
                let xIn = x - mainWindow.left;
                let yIn = y - mainWindow.top;
                // convert xIn and yIn to percentages
                xIn = xIn / mainWindow.width;
                yIn = yIn / mainWindow.height;
                let closestVert = 0;
                let nextVert = 1;
                for (let i = 0; i < mainWindow.verticalLines.length; i++) {
                    // sort the vertical lines from smallest to largest
                    mainWindow.verticalLines.sort((a, b) => a - b);

                    if (mainWindow.verticalLines[i] < xIn) {
                        if (mainWindow.verticalLines[i] >= closestVert)
                            closestVert = mainWindow.verticalLines[i];
                    } else
                        if (mainWindow.verticalLines[i] > xIn) {
                            if (mainWindow.verticalLines[i] <= nextVert)
                                nextVert = mainWindow.verticalLines[i];
                        }
                }

                let closestHor = 0;
                let nextHor = 1;
                for (let i = 0; i < mainWindow.horizontalLines.length; i++) {
                    if (mainWindow.horizontalLines[i] < yIn) {
                        if (mainWindow.horizontalLines[i] >= closestHor)
                            closestHor = mainWindow.horizontalLines[i];
                    }
                    if (mainWindow.horizontalLines[i] > yIn) {
                        if (mainWindow.horizontalLines[i] <= nextHor)
                            nextHor = mainWindow.horizontalLines[i];
                    }

                }

                // convert back to pixels
                closestVert = closestVert * mainWindow.width + mainWindow.left;
                nextVert = nextVert * mainWindow.width + mainWindow.left;
                closestHor = closestHor * mainWindow.height + mainWindow.top;
                nextHor = nextHor * mainWindow.height + mainWindow.top;

                let newRect = new fabric.Rect({
                    width: nextVert - closestVert,
                    height: nextHor - closestHor,
                    left: closestVert,
                    top: closestHor,

                    fill: '#EAEAEA14',
                    selectable: true,
                    evented: true,
                    hideControls: true,
                    hoverCursor: 'default',
                    // hide controls
                    lockRotation: true,

                });
                newRect.setControlsVisibility({
                    mtr: false,
                    ml: false,
                    mr: false,
                    mt: false,
                    mb: false,
                    bl: false,
                    br: false,
                    tl: false,
                    tr: false,
                });
                console.log(b2.startDimensions);
                console.log(newRect);
                // draw a box that encompasses the b2.startDimensions and the newRect
                let newLeft = Math.min(b2.startDimensions.left, newRect.left);
                let newTop = Math.min(b2.startDimensions.top, newRect.top);
                let newWidth = Math.max(b2.startDimensions.left + b2.startDimensions.width, newRect.left + newRect.width) - newLeft;
                let newHeight = Math.max(b2.startDimensions.top + b2.startDimensions.height, newRect.top + newRect.height) - newTop;
                newRect.set({
                    left: newLeft,
                    top: newTop,
                    width: newWidth,
                    height: newHeight,
                    stroke: '#000',
                    strokeWidth: 1,
                    fill: generateRandomPastelColor(),
                    id: Math.random().toString(36).substring(7),
                });
                b2.startDimensions = null;

                b2.enabled = false;
                setDivEnabled(false);
                b2.set('stroke', '#1C233333');
                selectedBox.set({
                    width: 0,
                    height: 0,
                    evented: false,
                });
                newRect.on('mousedown', function (e) {
                    b3.set('fill', '#FFFFFF22');
                    b3.target = e.target;
                    newCanvas.renderAll();

                });
                let thisDiv = {
                    id: newRect.id,
                    left: newRect.left,
                    top: newRect.top,
                    width: newRect.width,
                    height: newRect.height,
                    color: newRect.fill,
                }
                mainWindow.divList = [...mainWindow.divList, thisDiv];

                newCanvas.add(newRect);
                selectedBox.bringToFront();
                newCanvas.renderAll();
            }
        });


        newCanvas.on('object:modified', function (e) {
            let x = e.e.layerX;
            let y = e.e.layerY;
            // if the browser is chrome, use offsetX and offsetY
            if (e.e.offsetX) {
                x = e.e.offsetX;
                y = e.e.offsetY;
            }


            let xIn = x - mainWindow.left;
            let yIn = y - mainWindow.top;
            // convert xIn and yIn to percentages
            xIn = xIn / mainWindow.width;
            yIn = yIn / mainWindow.height;
            let closestVert = 0;
            let nextVert = 1;
            for (let i = 0; i < mainWindow.verticalLines.length; i++) {
                // sort the vertical lines from smallest to largest
                mainWindow.verticalLines.sort((a, b) => a - b);

                if (mainWindow.verticalLines[i] < xIn) {
                    if (mainWindow.verticalLines[i] >= closestVert)
                        closestVert = mainWindow.verticalLines[i];
                } else
                    if (mainWindow.verticalLines[i] > xIn) {
                        if (mainWindow.verticalLines[i] <= nextVert)
                            nextVert = mainWindow.verticalLines[i];
                    }
            }

            let closestHor = 0;
            let nextHor = 1;
            for (let i = 0; i < mainWindow.horizontalLines.length; i++) {
                if (mainWindow.horizontalLines[i] < yIn) {
                    if (mainWindow.horizontalLines[i] >= closestHor)
                        closestHor = mainWindow.horizontalLines[i];
                }
                if (mainWindow.horizontalLines[i] > yIn) {
                    if (mainWindow.horizontalLines[i] <= nextHor)
                        nextHor = mainWindow.horizontalLines[i];
                }

            }

            // convert back to pixels
            closestVert = closestVert * mainWindow.width + mainWindow.left;
            nextVert = nextVert * mainWindow.width + mainWindow.left;
            closestHor = closestHor * mainWindow.height + mainWindow.top;
            nextHor = nextHor * mainWindow.height + mainWindow.top;
            e.target.set({
                left: closestVert,
                top: closestHor,
                width: nextVert - closestVert,
                height: nextHor - closestHor,


            });
            let thisDivData = mainWindow.divList.find((f) => f.id === e.target?.id);
            console.log(mainWindow.divList.find((f) => f.id === e.target?.id));
            console.log(e.target.id);
            thisDivData.left = e.target.left;
            thisDivData.top = e.target.top;
            thisDivData.width = e.target.width;
            thisDivData.height = e.target.height;
            mainWindow.divList = mainWindow.divList.map((f) => {
                if (f.id === e.target.id) {
                    return thisDivData;
                } else {
                    return f;
                }
            });
        });

        newCanvas.add(toolBarGroup);
        newCanvas.add(rect);
        setVerticalRuler(verticalRuler);
        setRulerRect(ruler);
        setToolRect(toolBarGroup);
        setMainRect(mainWindow);
        setBorderRect(rect);
        // group selected box and main window
        newCanvas.add(mainWindow);
        newCanvas.add(selectedBox);



        selectedBox.bringToFront();
        newCanvas.selection = false;
        newCanvas.renderAll();
        setCanvas(newCanvas);
    }





    useEffect(() => {


        canvasInit();


    }, [modal, resizeTimeout]);

    useEffect(() => {
        // All this use effect does it call canvasInit when the window is resized ONCE after
        // everything is done resizing. The 0 timeout is so that it is called after the window
        // is done resizing.



        function timeoutHandler() {
            clearTimeout(resizeTT);
            resizeTT = setTimeout(resizedw, 0);
        }
        window.addEventListener('resize', timeoutHandler);

        function resizedw() {

            setResizeTimeout((e) => e + 1);



        }

        return () => {
            window.removeEventListener('resize', timeoutHandler);
            clearTimeout(resizeTT);
        }

    }, []);
    return (
        <div ref={container} className='fabric-canvas'>
            {/* <button onClick={onAddCircle}>Add circle</button>
            <button onClick={onAddRectangle}>Add Rectangle</button> */}
            {/* <FabricJSCanvas className="sample-canvas" onReady={onReady} /> */}
            <canvas id="canvas" className='fabric-canvas' />
        </div>
    )
}
export default TemplateMaker;
