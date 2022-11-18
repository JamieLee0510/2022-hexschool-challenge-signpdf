import { useAppSelector } from '@base/app/hooks'
import { mockPdf } from '@base/utils/mock/pdfData'
import { fabric } from 'fabric'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'

import useRenderPdf from './useRenderPdf'

const canvasSize = { width: 400, hieght: 500 }

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
    const pdfFile = useAppSelector((state) => state.pdf.pdfFile)
    const [canvas, setCanvas] = useState<fabric.Canvas | null>(null)
    const [ctx, setCtx] = useState<CanvasRenderingContext2D | null>(null)

    const [prev, next] = useRenderPdf(canvas!, ctx!)

    useEffect(() => {
        const c = new fabric.Canvas(canvasRef.current)
        setCanvas(c)
    }, [canvasRef])

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
            <canvas ref={canvasRef} width={canvasSize.width} height={canvasSize.hieght} />

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
