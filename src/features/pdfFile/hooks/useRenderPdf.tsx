import CanvasContext from '@base/app/contexts/CanvasContext'
import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { FormatSize } from '@base/utils/types'
import { fabric } from 'fabric'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import React, { useCallback, useContext, useEffect, useState } from 'react'

import useCanvasSize from './useCanvasSize'

export const canvasOriginalHeight = 800
export const canvasOriginalWidth = 530

export const scaleAndPositionImage = (
    canvas: fabric.Canvas,
    bgImg: fabric.Image,
    size: FormatSize,
) => {
    const canvasWidth = size.width
    const canvasHeight = size.height
    canvas!.setWidth(canvasWidth)
    canvas!.setHeight(canvasHeight)

    // 原本 canvas 的長寬比
    const canvasAspect = canvasWidth / canvasHeight
    const [imgWidth, imgHeight] = [bgImg.width!, bgImg!.height!]

    // image 的長寬比
    const imgAspect = imgWidth / imgHeight
    let left
    let top
    let scaleFactor

    if (canvasAspect >= imgAspect) {
        scaleFactor = canvasWidth / bgImg.width!
        left = 0
        top = -(imgHeight * scaleFactor - canvasHeight) / 2
    } else {
        scaleFactor = canvasHeight / imgHeight
        top = 0
        left = -(imgWidth * scaleFactor - canvasWidth) / 2
    }

    // 等比例縮放，但有裁切
    canvas.setBackgroundImage(bgImg, canvas.renderAll.bind(canvas), {
        top,
        left,
        originX: 'left',
        originY: 'top',
        scaleX: scaleFactor,
        scaleY: scaleFactor,

        // scaleX: canvasWidth / imgWidth,
        // scaleY: canvasHeight / imgHeight,
    })
}

const useRenderPdf = (renderCallback: (args: string) => void) => {
    const mainCanvas = useContext(CanvasContext)
    const pdfData = useAppSelector((state) => state.pdf.value)
    const scaleSize = useAppSelector((state) => ({
        height: state.pdf.value.size.height * state.pdf.scale,
        width: state.pdf.value.size.width * state.pdf.scale,
    }))
    const [page, setPage] = useState(1)

    const renderPdf = useCallback(
        (canvas: fabric.Canvas | null) => {
            if (canvas !== null) {
                fabric.Image.fromURL(pdfData.data[page - 1], (img) => {
                    scaleAndPositionImage(canvas, img, scaleSize)
                })
            }
        },
        [page, pdfData.data, scaleSize],
    )

    useEffect(() => {
        renderPdf(mainCanvas)
        // renderCallback(pdfData.data[page - 1])
    }, [mainCanvas, renderPdf])

    const forwardPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (page <= pdfData.data.length - 1) {
            setPage((pre) => pre + 1)
        }
    }
    const backwardPage = (e: React.MouseEvent<HTMLButtonElement>) => {
        e.preventDefault()
        if (page > 1) {
            setPage((pre) => pre - 1)
        }
    }

    return [backwardPage, forwardPage, page, pdfData.data.length]
}
export default useRenderPdf
