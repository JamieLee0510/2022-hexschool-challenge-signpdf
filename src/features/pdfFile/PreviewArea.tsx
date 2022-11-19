import { useAppSelector } from '@base/app/hooks'
import { mockPdf } from '@base/utils/mock/pdfData'
import { fabric } from 'fabric'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import useCanvasSize from './hooks/useCanvasSize'
import useRenderPdf from './hooks/useRenderPdf'

const Container = styled.div`
    width: 100%;
    height: 88vh;
    background-color: grey;
    overflow: scroll;
    display: flex;
    justify-content: center;
    padding-top: 10px;
    padding-bottom: 10px;
    margin-bottom: 10px;
`

export default function PreviewArea() {
    const canvasRef = useRef<HTMLCanvasElement>(null)

    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)
    const size = useCanvasSize()
    const [prev, next] = useRenderPdf(canvas!, ctx!)

    useEffect(() => {
        const c = new fabric.Canvas(canvasRef.current)
        if (size.height <= 1000 && size.width <= 1000) {
            c.setHeight(size.height)
            c.setWidth(size.width)
            setCanvas(c)
        }
    }, [canvasRef, size.height, size.width])

    const test = () => {
        const dataURL = canvas!.toDataURL()
        const link = document.createElement('a')
        link.download = 'my-image.png'
        link.href = dataURL
        link.target = '_blank'
        document.body.appendChild(link)
        link.click()
        link.parentNode!.removeChild(link)
    }

    return (
        <Container>
            {/* <div style={{ width: '100%', textAlign: 'center' }}> */}
            <canvas ref={canvasRef} />
            {/* </div> */}

            <div style={{ position: 'absolute', bottom: '10%' }}>
                <button onClick={test} type='button'>
                    download
                </button>
                <button type='button' onClick={prev}>
                    prev
                </button>
                <button type='button' onClick={next}>
                    next
                </button>
            </div>
        </Container>
    )
}
