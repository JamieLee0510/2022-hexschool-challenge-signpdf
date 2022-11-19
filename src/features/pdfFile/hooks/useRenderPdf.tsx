import { useAppDispatch, useAppSelector } from '@base/app/hooks'
import { FormatSize } from '@base/utils/types'
import { fabric } from 'fabric'
import * as pdfjs from 'pdfjs-dist/build/pdf'
import React, { useCallback, useEffect, useState } from 'react'

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

const useRenderPdf = (canvas: fabric.Canvas | null, ctx: CanvasRenderingContext2D | null) => {
    const pdfData = useAppSelector((state) => state.pdf.value)
    const scaleSize = useAppSelector((state) => ({
        height: state.pdf.value.size.height * state.pdf.scale,
        width: state.pdf.value.size.width * state.pdf.scale,
    }))
    const [page, setPage] = useState(1)

    const renderPdf = useCallback(() => {
        if (canvas !== null) {
            fabric.Image.fromURL(pdfData.data[page - 1], (img) => {
                scaleAndPositionImage(canvas, img, scaleSize)
            })
        }
    }, [canvas, page, pdfData.data, scaleSize])

    useEffect(() => {
        renderPdf()
    }, [ctx, page, renderPdf])

    const forwardPage = () => {
        if (page <= pdfData.data.length) {
            setPage((pre) => pre + 1)
        }
    }
    const backwardPage = () => {
        if (page > 1) {
            setPage((pre) => pre - 1)
        }
    }

    return [backwardPage, forwardPage]
}
export default useRenderPdf
